from __future__ import annotations

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from API.config.settings import JWT_ALGORITHM, JWT_SECRET_KEY
from API.services.repository import repository


bearer_scheme = HTTPBearer()


def current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> str:
    token = credentials.credentials

    try:
        subject = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHM],
        ).get("sub")
    except JWTError as error:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token.",
        ) from error

    if not subject:
        raise HTTPException(
            status_code=401,
            detail="Invalid token subject.",
        )

    return str(subject)


def current_doctor(
    email: str = Depends(current_user),
) -> dict[str, object]:
    
    user = repository.get_user(email)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Authenticated user was not found.",
        )

    if user.get("role") not in {"Doctor", "Admin"}:
        raise HTTPException(
            status_code=403,
            detail="Doctor or Admin role is required.",
        )

    return user