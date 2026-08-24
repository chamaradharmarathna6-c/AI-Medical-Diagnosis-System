from fastapi import APIRouter, Depends, HTTPException, Query

from API.models.request_models import DoctorReviewRequest
from API.services.repository import SqlServerRepository, repository
from API.services.support_data_service import doctors, recommendations
from API.utils.validators import current_doctor, current_user

router = APIRouter(prefix="/api", tags=["Decision support"])


@router.get("/doctors")
def list_doctors(
    disease: str | None = Query(default=None),
) -> list[dict[str, object]]:
    if isinstance(repository, SqlServerRepository):
        return repository.doctors(disease)

    return doctors(disease)


@router.get("/recommendations")
def list_recommendations(
    disease: str | None = Query(default=None),
    risk_level: str | None = Query(default=None),
) -> list[dict[str, object]]:
    if isinstance(repository, SqlServerRepository):
        return repository.recommendations(disease, risk_level)

    return recommendations(disease, risk_level)


@router.get("/history")
def prediction_history(
    email: str = Depends(current_user),
) -> list[dict[str, object]]:
    return repository.history(email)


@router.get("/doctor/predictions")
def doctor_predictions(
    _doctor: dict[str, object] = Depends(current_doctor),
) -> list[dict[str, object]]:
    del _doctor
    return repository.all_predictions()


@router.post("/doctor-reviews")
def create_review(
    payload: DoctorReviewRequest,
    reviewer: dict[str, object] = Depends(current_doctor),
) -> dict[str, object]:
    try:
        return repository.review(
            payload.prediction_id,
            str(reviewer["email"]),
            payload.status,
            payload.notes,
        )
    except LookupError as error:
        raise HTTPException(
            status_code=404,
            detail=str(error),
        ) from error