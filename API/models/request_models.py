from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class PredictionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    values: dict[str, Any]
    include_explanation: bool = True


class DoctorReviewRequest(BaseModel):
    prediction_id: int = Field(gt=0)
    status: Literal["Reviewed", "Approved", "Rejected"]
    notes: str = Field(min_length=1, max_length=2000)
