from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd
import shap
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression


def explain_prediction(artifact: dict[str, Any], values: dict[str, Any], limit: int = 5) -> list[dict[str, Any]]:
    
    pipeline = artifact["pipeline"]
    preprocessor = pipeline.named_steps["preprocessor"]
    classifier = pipeline.named_steps["classifier"]
    input_frame = pd.DataFrame([values], columns=artifact["feature_names"])
    transformed = preprocessor.transform(input_frame)
    names = preprocessor.get_feature_names_out().tolist()
    if isinstance(classifier, RandomForestClassifier):
        explainer = shap.TreeExplainer(classifier)
        contributions = explainer.shap_values(transformed)
    elif isinstance(classifier, LogisticRegression):
        background = preprocessor.transform(artifact["explanation_background"])
        explainer = shap.LinearExplainer(classifier, background)
        contributions = explainer.shap_values(transformed)
    else:
        raise TypeError(f"Unsupported explanation model: {type(classifier).__name__}")
    if contributions.ndim == 3:
        probabilities = classifier.predict_proba(transformed)[0]
        scores = contributions[0, :, int(np.argmax(probabilities))]
    else:
        scores = contributions[0]
    ranked = np.argsort(np.abs(scores))[::-1][:limit]
    return [
        {
            "feature": str(names[index]),
            "contribution": round(float(scores[index]), 5),
            "direction": "increased model score" if scores[index] > 0 else "decreased model score",
            "statement": "This feature contributed to the model prediction.",
        }
        for index in ranked
    ]
