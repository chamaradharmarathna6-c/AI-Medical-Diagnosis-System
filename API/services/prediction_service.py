from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd

from AI.explainability.shap_explainer import explain_prediction
from API.ml.model_loader import load_model
from API.services.risk_service import assess_risk

DISCLAIMERS = (
    "AI-generated preliminary assessment — not a confirmed medical diagnosis. "
    "This academic decision-support prediction requires professional verification. "
    "Consult a qualified healthcare professional."
)
NEGATIVE_LABELS = {
    "diabetes": {"0"},
    "heart": {"Absence"},
    "kidney": {"No_Disease"},
    "liver": {"2"},
}


def predict(disease: str, values: dict[str, Any], include_explanation: bool = True) -> dict[str, Any]:
    artifact = load_model(disease)
    expected = artifact["feature_names"]
    supplied, expected_set = set(values), set(expected)
    missing, unexpected = expected_set - supplied, supplied - expected_set
    if missing or unexpected:
        parts = []
        if missing:
            parts.append(f"missing fields: {', '.join(sorted(missing))}")
        if unexpected:
            parts.append(f"unexpected fields: {', '.join(sorted(unexpected))}")
        raise ValueError("; ".join(parts))
    if disease == "diabetes":
        if float(values["Age"]) < 0 or float(values["Insulin"]) < 0:
            raise ValueError("Age and Insulin must not be negative.")
    frame = pd.DataFrame([values], columns=expected)
    pipeline = artifact["pipeline"]
    label = str(pipeline.predict(frame)[0])
    probability: float | None = None
    if hasattr(pipeline, "predict_proba"):
        probability = float(np.max(pipeline.predict_proba(frame)[0]))
    explanation = explain_prediction(artifact, values) if include_explanation else []
    return {
        "disease": disease,
        "prediction": label,
        "probability": round(probability, 4) if probability is not None else None,
        "risk_level": assess_risk(label, probability, NEGATIVE_LABELS[disease]),
        "explanation": explanation,
        "disclaimer": DISCLAIMERS,
    }
