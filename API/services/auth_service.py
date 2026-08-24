from API.services.repository import repository
from API.utils.security import (
    create_access_token,
    hash_password,
    verify_password,
)


def register(
    name: str,
    email: str,
    password: str,
) -> dict[str, str]:

    user = repository.create_user(
        name,
        email.lower(),
        hash_password(password),
    )

    return {
        "access_token": create_access_token(user["email"]),
        "token_type": "bearer",
    }


def login(
    email: str,
    password: str,
) -> dict[str, str]:

    user = repository.get_user(
        email.lower()
    )

    if (
        not user
        or not verify_password(
            password,
            user["password_hash"],
        )
    ):
        raise ValueError(
            "Invalid email or password."
        )

    return {
        "access_token": create_access_token(
            user["email"]
        ),
        "token_type": "bearer",
    }


def doctor_login(
    email: str,
    password: str,
) -> dict[str, str]:

    email = email.lower()

    user = repository.get_user(email)

    
    if not user:
        raise ValueError(
            "Invalid doctor email or password."
        )

    
    if not verify_password(
        password,
        user["password_hash"],
    ):
        raise ValueError(
            "Invalid doctor email or password."
        )

    
    if user["role"] != "Doctor":
        raise ValueError(
            "This account is not registered as a doctor."
        )

   
    return {
        "access_token": create_access_token(
            user["email"]
        ),
        "token_type": "bearer",
        "role": "Doctor",
        "name": user["name"],
        "email": user["email"],
    }