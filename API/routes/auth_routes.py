from fastapi import APIRouter, HTTPException

from API.models.request_models import (
    LoginRequest,
    RegisterRequest,
)

from API.services.auth_service import (
    login,
    register,
    doctor_login,
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register_user(
    payload: RegisterRequest,
) -> dict[str, str]:

    try:

        return register(
            payload.name,
            str(payload.email),
            payload.password,
        )

    except ValueError as error:

        raise HTTPException(
            status_code=409,
            detail=str(error),
        ) from error


@router.post("/login")
def login_user(
    payload: LoginRequest,
) -> dict[str, str]:

    try:

        return login(
            str(payload.email),
            payload.password,
        )

    except ValueError as error:

        raise HTTPException(
            status_code=401,
            detail=str(error),
        ) from error


@router.post("/doctor-login")
def doctor_login_user(
    payload: LoginRequest,
) -> dict[str, str]:

    try:

        return doctor_login(
            str(payload.email),
            payload.password,
        )

    except ValueError as error:

        raise HTTPException(
            status_code=401,
            detail=str(error),
        ) from error