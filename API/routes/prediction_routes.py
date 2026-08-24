from fastapi import APIRouter, Depends, HTTPException

from API.models.request_models import PredictionRequest
from API.models.response_models import PredictionResponse
from API.services.prediction_service import predict
from API.services.repository import repository
from API.utils.validators import current_user

router = APIRouter(prefix="/api/predict", tags=["Predictions"])


def _predict(disease: str, payload: PredictionRequest, email: str) -> PredictionResponse:
    try:
        result = predict(disease, payload.values, payload.include_explanation)
    except (ValueError, FileNotFoundError) as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    record = repository.add_prediction(email, result, payload.values)
    return PredictionResponse(
        prediction_id=record["id"],
        created_at=record["created_at"],
        review_status=record["review_status"],
        **result,
    )


@router.post("/diabetes", response_model=PredictionResponse)
def diabetes(payload: PredictionRequest, email: str = Depends(current_user)) -> PredictionResponse:
    return _predict("diabetes", payload, email)


@router.post("/heart", response_model=PredictionResponse)
def heart(payload: PredictionRequest, email: str = Depends(current_user)) -> PredictionResponse:
    return _predict("heart", payload, email)


@router.post("/kidney", response_model=PredictionResponse)
def kidney(payload: PredictionRequest, email: str = Depends(current_user)) -> PredictionResponse:
    return _predict("kidney", payload, email)


@router.post("/liver", response_model=PredictionResponse)
def liver(payload: PredictionRequest, email: str = Depends(current_user)) -> PredictionResponse:
    return _predict("liver", payload, email)
