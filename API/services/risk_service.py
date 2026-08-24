from __future__ import annotations


def assess_risk(prediction: str, probability: float | None, negative_labels: set[str]) -> str:
    if prediction in negative_labels:
        return "Low"
    if probability is None:
        return "Moderate"
    if probability >= 0.8:
        return "High"
    return "Moderate"
