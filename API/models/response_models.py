from __future__ import annotations

from typing import Any

from pydantic import BaseModel


class PredictionResponse(BaseModel):
    prediction_id: int
    created_at: str
    disease: str
    prediction: str
    probability: float | None
    risk_level: str
    explanation: list[dict[str, Any]]
    disclaimer: str
    review_status: str
