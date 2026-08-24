from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import SQLAlchemyError

from API.services.repository import SqlServerRepository, repository

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health")
def health() -> dict[str, str]:
    if isinstance(repository, SqlServerRepository):
        try:
            repository.verify_connection()
        except SQLAlchemyError as error:
            raise HTTPException(status_code=503, detail="SQL Server is unavailable.") from error
    return {"status": "ok", "service": "AI Medical Diagnosis decision-support API"}
