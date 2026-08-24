from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Datasets"
PROCESSED = ROOT / "datasets" / "processed"
MODELS = ROOT / "AI" / "models"
RESULTS = ROOT / "reports" / "model_results"
GRAPHS = ROOT / "reports" / "graphs"


def _prepare_diabetes(frame: pd.DataFrame) -> pd.DataFrame:
    frame = frame.copy()
    frame.loc[frame["Age"] < 0, "Age"] = np.nan
    frame.loc[frame["Insulin"] < 0, "Insulin"] = np.nan
    return frame


def _prepare_liver(frame: pd.DataFrame) -> pd.DataFrame:
    return frame.drop_duplicates().copy()


DATASETS: dict[str, dict[str, Any]] = {
    "diabetes": {
        "path": SOURCE / "Diabetes_prediction.csv",
        "target": "Diagnosis",
        "prepare": _prepare_diabetes,
        "drop": [],
        "multiclass": False,
    },
    "heart": {
        "path": SOURCE / "heart.csv",
        "target": "Heart Disease",
        "prepare": lambda frame: frame.copy(),
        "drop": ["id"],
        "multiclass": False,
    },
    "kidney": {
        "path": SOURCE / "kidney_disease_dataset.csv",
        "target": "Target",
        "prepare": lambda frame: frame.copy(),
        "drop": [],
        "multiclass": True,
    },
    "liver": {
        "path": SOURCE / "Indian Liver Patient Dataset (ILPD).csv",
        "target": "is_patient",
        "prepare": _prepare_liver,
        "drop": [],
        "multiclass": False,
    },
}


def _preprocessor(features: pd.DataFrame) -> ColumnTransformer:
    numeric = features.select_dtypes(include=["number"]).columns.tolist()
    categorical = [column for column in features.columns if column not in numeric]
    return ColumnTransformer(
        transformers=[
            ("numeric", Pipeline([("imputer", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), numeric),
            (
                "categorical",
                Pipeline(
                    [
                        ("imputer", SimpleImputer(strategy="most_frequent")),
                        ("encode", OneHotEncoder(handle_unknown="ignore")),
                    ]
                ),
                categorical,
            ),
        ],
        remainder="drop",
    )


def _metrics(y_true: pd.Series, y_pred: np.ndarray) -> dict[str, float]:
    average = "macro"
    return {
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 4),
        "precision": round(float(precision_score(y_true, y_pred, average=average, zero_division=0)), 4),
        "recall": round(float(recall_score(y_true, y_pred, average=average, zero_division=0)), 4),
        "f1": round(float(f1_score(y_true, y_pred, average=average, zero_division=0)), 4),
    }


def train_dataset(name: str) -> dict[str, Any]:
    config = DATASETS[name]
    raw = pd.read_csv(config["path"])
    cleaned = config["prepare"](raw)
    PROCESSED.mkdir(parents=True, exist_ok=True)
    cleaned.to_csv(PROCESSED / f"{name}_clean.csv", index=False)

    target = config["target"]
    features = cleaned.drop(columns=[target, *config["drop"]])
    labels = cleaned[target]
    x_train, x_test, y_train, y_test = train_test_split(
        features, labels, test_size=0.2, random_state=42, stratify=labels
    )
    candidates: dict[str, Pipeline] = {
        "logistic_regression": Pipeline(
            [
                ("preprocessor", _preprocessor(features)),
                ("classifier", LogisticRegression(max_iter=1500, class_weight="balanced")),
            ]
        ),
        "random_forest": Pipeline(
            [
                ("preprocessor", _preprocessor(features)),
                (
                    "classifier",
                    RandomForestClassifier(
                        n_estimators=150 if name != "heart" else 100,
                        max_depth=18 if name == "heart" else None,
                        min_samples_leaf=2,
                        n_jobs=-1,
                        random_state=42,
                        class_weight="balanced",
                    ),
                ),
            ]
        ),
    }
    
    train_for_forest = (x_train, y_train)
    if name == "heart":
        sample_x, _, sample_y, _ = train_test_split(
            x_train, y_train, train_size=100_000, random_state=42, stratify=y_train
        )
        train_for_forest = (sample_x, sample_y)

    evaluations: dict[str, dict[str, float]] = {}
    fitted: dict[str, Pipeline] = {}
    for candidate_name, pipeline in candidates.items():
        if candidate_name == "random_forest":
            pipeline.fit(*train_for_forest)
        else:
            pipeline.fit(x_train, y_train)
        predictions = pipeline.predict(x_test)
        evaluations[candidate_name] = _metrics(y_test, predictions)
        fitted[candidate_name] = pipeline

    best_name = max(evaluations, key=lambda item: evaluations[item]["f1"])
    best_pipeline = fitted[best_name]
    destination = MODELS / name
    destination.mkdir(parents=True, exist_ok=True)
    model_path = destination / f"{name}_pipeline.pkl"
    joblib.dump(
        {
            "pipeline": best_pipeline,
            "feature_names": features.columns.tolist(),
            "target": target,
            "disease": name,
            "classes": [str(item) for item in best_pipeline.classes_],
            "explanation_background": x_train.sample(n=min(100, len(x_train)), random_state=42),
        },
        model_path,
    )
    
    reloaded = joblib.load(model_path)
    reloaded_prediction = reloaded["pipeline"].predict(x_test.iloc[:1])[0]

    GRAPHS.mkdir(parents=True, exist_ok=True)
    figure, axis = plt.subplots(figsize=(7, 5))
    ConfusionMatrixDisplay.from_predictions(y_test, best_pipeline.predict(x_test), ax=axis, colorbar=False)
    axis.set_title(f"{name.title()} - {best_name} confusion matrix")
    figure.tight_layout()
    figure.savefig(GRAPHS / f"{name}_confusion_matrix.png", dpi=160)
    plt.close(figure)
    return {
        "dataset": name,
        "raw_rows": len(raw),
        "processed_rows": len(cleaned),
        "feature_count": len(features.columns),
        "best_model": best_name,
        "evaluations": evaluations,
        "artifact": str(model_path.relative_to(ROOT)).replace("\\", "/"),
        "artifact_reload_prediction": str(reloaded_prediction),
    }


def main() -> None:
    RESULTS.mkdir(parents=True, exist_ok=True)
    all_results = {name: train_dataset(name) for name in DATASETS}
    (RESULTS / "model_results.json").write_text(json.dumps(all_results, indent=2), encoding="utf-8")
    print(json.dumps(all_results, indent=2))


if __name__ == "__main__":
    main()
