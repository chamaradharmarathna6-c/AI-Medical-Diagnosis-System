from __future__ import annotations

import json
from datetime import datetime, timezone
from typing import Any, Protocol

from sqlalchemy import text
from sqlalchemy.engine import Engine
from sqlalchemy.exc import IntegrityError

from API.config.database import create_sql_server_engine
from API.config.settings import ALLOW_IN_MEMORY_STORE, DATABASE_URL


class Repository(Protocol):
    def create_user(
        self,
        name: str,
        email: str,
        password_hash: str,
    ) -> dict[str, Any]:
        ...

    def get_user(
        self,
        email: str,
    ) -> dict[str, Any] | None:
        ...

    def set_user_role(
        self,
        email: str,
        role: str,
    ) -> None:
        ...

    def add_prediction(
        self,
        email: str,
        payload: dict[str, Any],
        input_values: dict[str, Any],
    ) -> dict[str, Any]:
        ...

    def history(
        self,
        email: str,
    ) -> list[dict[str, Any]]:
        ...

    def all_predictions(
        self,
    ) -> list[dict[str, Any]]:
        ...

    def review(
        self,
        prediction_id: int,
        reviewer_email: str,
        status: str,
        notes: str,
    ) -> dict[str, Any]:
        ...

    def doctors(
        self,
        disease: str | None = None,
    ) -> list[dict[str, Any]]:
        ...

    def recommendations(
        self,
        disease: str | None = None,
        risk_level: str | None = None,
    ) -> list[dict[str, Any]]:
        ...


class MemoryRepository:

    def __init__(self) -> None:
        self.users: dict[str, dict[str, Any]] = {}
        self.predictions: list[dict[str, Any]] = []

    def create_user(
        self,
        name: str,
        email: str,
        password_hash: str,
    ) -> dict[str, Any]:
        key = email.lower()

        if key in self.users:
            raise ValueError(
                "An account with this email already exists."
            )

        user = {
            "id": len(self.users) + 1,
            "name": name,
            "email": key,
            "password_hash": password_hash,
            "role": "Patient",
        }

        self.users[key] = user
        return user

    def get_user(
        self,
        email: str,
    ) -> dict[str, Any] | None:
        return self.users.get(email.lower())

    def set_user_role(
        self,
        email: str,
        role: str,
    ) -> None:
        user = self.get_user(email)

        if user is None:
            raise LookupError("User not found.")

        if role not in {"Patient", "Doctor", "Admin"}:
            raise ValueError(
                "Role must be Patient, Doctor, or Admin."
            )

        user["role"] = role

    def add_prediction(
        self,
        email: str,
        payload: dict[str, Any],
        input_values: dict[str, Any],
    ) -> dict[str, Any]:
        record = {
            "id": len(self.predictions) + 1,
            "email": email,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "review_status": "Pending",
            "doctor_notes": None,
            "input_values": input_values,
            **payload,
        }

        self.predictions.append(record)
        return record

    def history(
        self,
        email: str,
    ) -> list[dict[str, Any]]:
        return [
            item
            for item in self.predictions
            if item["email"] == email
        ]

    def all_predictions(
        self,
    ) -> list[dict[str, Any]]:
        return sorted(
            self.predictions,
            key=lambda item: item["created_at"],
            reverse=True,
        )

    def review(
        self,
        prediction_id: int,
        reviewer_email: str,
        status: str,
        notes: str,
    ) -> dict[str, Any]:
        if not self.get_user(reviewer_email):
            raise LookupError(
                "Reviewer account not found."
            )

        for record in self.predictions:
            if record["id"] == prediction_id:
                record["review_status"] = status
                record["doctor_notes"] = notes
                record["reviewed_at"] = (
                    datetime.now(timezone.utc).isoformat()
                )
                record["reviewer_email"] = reviewer_email
                return record

        raise LookupError("Prediction not found.")

    def doctors(
        self,
        _disease: str | None = None,
    ) -> list[dict[str, Any]]:
        del _disease

        raise RuntimeError(
            "Supporting data is supplied by the workbook "
            "in isolated test mode."
        )

    def recommendations(
        self,
        _disease: str | None = None,
        _risk_level: str | None = None,
    ) -> list[dict[str, Any]]:
        del _disease, _risk_level

        raise RuntimeError(
            "Supporting data is supplied by the workbook "
            "in isolated test mode."
        )


class SqlServerRepository:

    def __init__(
        self,
        engine: Engine,
    ) -> None:
        self.engine = engine

    def verify_connection(self) -> None:
        with self.engine.connect() as connection:
            connection.execute(text("SELECT 1"))

    def create_user(
        self,
        name: str,
        email: str,
        password_hash: str,
    ) -> dict[str, Any]:
        try:
            with self.engine.begin() as connection:
                result = connection.execute(
                    text(
                        "INSERT INTO dbo.Users "
                        "(Name, Email, PasswordHash, Role) "
                        "OUTPUT INSERTED.UserId, "
                        "INSERTED.Name, "
                        "INSERTED.Email, "
                        "INSERTED.Role "
                        "VALUES "
                        "(:name, :email, :password_hash, N'Patient')"
                    ),
                    {
                        "name": name,
                        "email": email.lower(),
                        "password_hash": password_hash,
                    },
                ).mappings().one()

        except IntegrityError as error:
            raise ValueError(
                "An account with this email already exists."
            ) from error

        return {
            "id": result["UserId"],
            "name": result["Name"],
            "email": result["Email"],
            "role": result["Role"],
        }

    def get_user(
        self,
        email: str,
    ) -> dict[str, Any] | None:
        with self.engine.connect() as connection:
            result = connection.execute(
                text(
                    "SELECT UserId, Name, Email, PasswordHash, Role "
                    "FROM dbo.Users "
                    "WHERE Email = :email"
                ),
                {
                    "email": email.lower(),
                },
            ).mappings().first()

        if result is None:
            return None

        return {
            "id": result["UserId"],
            "name": result["Name"],
            "email": result["Email"],
            "password_hash": result["PasswordHash"],
            "role": result["Role"],
        }

    def set_user_role(
        self,
        email: str,
        role: str,
    ) -> None:
        if role not in {"Patient", "Doctor", "Admin"}:
            raise ValueError(
                "Role must be Patient, Doctor, or Admin."
            )

        with self.engine.begin() as connection:
            updated = connection.execute(
                text(
                    "UPDATE dbo.Users "
                    "SET Role = :role "
                    "WHERE Email = :email"
                ),
                {
                    "email": email.lower(),
                    "role": role,
                },
            ).rowcount

        if not updated:
            raise LookupError("User not found.")

    def add_prediction(
        self,
        email: str,
        payload: dict[str, Any],
        input_values: dict[str, Any],
    ) -> dict[str, Any]:
        user = self.get_user(email)

        if user is None:
            raise LookupError(
                "Authenticated user was not found."
            )

        with self.engine.begin() as connection:

            prediction = connection.execute(
                text(
                    "INSERT INTO dbo.Predictions "
                    "(UserId, Disease, PredictedLabel, Probability, "
                    "RiskLevel, ReviewStatus) "
                    "OUTPUT INSERTED.PredictionId, "
                    "INSERTED.ReviewStatus, "
                    "INSERTED.CreatedAt "
                    "VALUES "
                    "(:user_id, :disease, :label, "
                    ":probability, :risk_level, N'Pending')"
                ),
                {
                    "user_id": user["id"],
                    "disease": payload["disease"],
                    "label": payload["prediction"],
                    "probability": payload["probability"],
                    "risk_level": payload["risk_level"],
                },
            ).mappings().one()

            connection.execute(
                text(
                    "INSERT INTO dbo.PredictionDetails "
                    "(PredictionId, InputJson, ExplanationJson) "
                    "VALUES "
                    "(:prediction_id, :inputs, :explanation)"
                ),
                {
                    "prediction_id": prediction["PredictionId"],
                    "inputs": json.dumps(input_values),
                    "explanation": json.dumps(
                        payload.get("explanation", [])
                    ),
                },
            )

            connection.execute(
                text(
                    "INSERT INTO dbo.PredictionHistory "
                    "(PredictionId, Status) "
                    "VALUES (:prediction_id, N'Pending')"
                ),
                {
                    "prediction_id": prediction["PredictionId"],
                },
            )

        created_at = prediction["CreatedAt"]

        if hasattr(created_at, "isoformat"):
            created_at = created_at.isoformat()

        return {
            "id": prediction["PredictionId"],
            "review_status": prediction["ReviewStatus"],
            "created_at": created_at,
            **payload,
        }

    def history(
        self,
        email: str,
    ) -> list[dict[str, Any]]:
        with self.engine.connect() as connection:
            rows = connection.execute(
                text(
                    "SELECT "
                    "p.PredictionId, "
                    "p.Disease, "
                    "p.PredictedLabel, "
                    "p.Probability, "
                    "p.RiskLevel, "
                    "p.ReviewStatus, "
                    "p.CreatedAt "
                    "FROM dbo.Predictions p "
                    "JOIN dbo.Users u "
                    "ON u.UserId = p.UserId "
                    "WHERE u.Email = :email "
                    "ORDER BY p.CreatedAt DESC"
                ),
                {
                    "email": email.lower(),
                },
            ).mappings().all()

        history_records: list[dict[str, Any]] = []

        for row in rows:
            created_at = row["CreatedAt"]

            if hasattr(created_at, "isoformat"):
                created_at = created_at.isoformat()

            history_records.append(
                {
                    "id": row["PredictionId"],
                    "disease": row["Disease"],
                    "prediction": row["PredictedLabel"],
                    "probability": (
                        float(row["Probability"])
                        if row["Probability"] is not None
                        else None
                    ),
                    "risk_level": row["RiskLevel"],
                    "review_status": row["ReviewStatus"],
                    "created_at": created_at,
                }
            )

        return history_records

    def all_predictions(
        self,
    ) -> list[dict[str, Any]]:
        with self.engine.connect() as connection:
            rows = connection.execute(
                text(
                    "SELECT "
                    "PredictionId, "
                    "Disease, "
                    "PredictedLabel, "
                    "Probability, "
                    "RiskLevel, "
                    "ReviewStatus, "
                    "CreatedAt "
                    "FROM dbo.Predictions "
                    "ORDER BY CreatedAt DESC"
                )
            ).mappings().all()

        records: list[dict[str, Any]] = []

        for row in rows:
            created_at = row["CreatedAt"]

            if hasattr(created_at, "isoformat"):
                created_at = created_at.isoformat()

            records.append(
                {
                    "id": row["PredictionId"],
                    "disease": row["Disease"],
                    "prediction": row["PredictedLabel"],
                    "probability": (
                        float(row["Probability"])
                        if row["Probability"] is not None
                        else None
                    ),
                    "risk_level": row["RiskLevel"],
                    "review_status": row["ReviewStatus"],
                    "created_at": created_at,
                }
            )

        return records

    def review(
        self,
        prediction_id: int,
        reviewer_email: str,
        status: str,
        notes: str,
    ) -> dict[str, Any]:
        reviewer = self.get_user(reviewer_email)

        if reviewer is None:
            raise LookupError(
                "Reviewer account not found."
            )

        with self.engine.begin() as connection:

            exists = connection.execute(
                text(
                    "SELECT PredictionId "
                    "FROM dbo.Predictions "
                    "WHERE PredictionId = :prediction_id"
                ),
                {
                    "prediction_id": prediction_id,
                },
            ).scalar_one_or_none()

            if exists is None:
                raise LookupError(
                    "Prediction not found."
                )

            connection.execute(
                text(
                    "UPDATE dbo.Predictions "
                    "SET ReviewStatus = :status "
                    "WHERE PredictionId = :prediction_id"
                ),
                {
                    "prediction_id": prediction_id,
                    "status": status,
                },
            )

            connection.execute(
                text(
                    "INSERT INTO dbo.DoctorReviews "
                    "(PredictionId, ReviewerUserId, Status, Notes) "
                    "VALUES "
                    "(:prediction_id, :reviewer_user_id, "
                    ":status, :notes)"
                ),
                {
                    "prediction_id": prediction_id,
                    "reviewer_user_id": reviewer["id"],
                    "status": status,
                    "notes": notes,
                },
            )

            connection.execute(
                text(
                    "INSERT INTO dbo.PredictionHistory "
                    "(PredictionId, Status) "
                    "VALUES (:prediction_id, :status)"
                ),
                {
                    "prediction_id": prediction_id,
                    "status": status,
                },
            )

        return {
            "prediction_id": prediction_id,
            "status": status,
            "notes": notes,
            "reviewer_user_id": reviewer["id"],
        }

    def doctors(
        self,
        disease: str | None = None,
    ) -> list[dict[str, Any]]:
        statement = (
            "SELECT "
            "DoctorId, "
            "DoctorName, "
            "Specializes, "
            "Disease, "
            "Location "
            "FROM dbo.Doctors"
        )

        parameters: dict[str, Any] = {}

        if disease:
            statement += " WHERE Disease = :disease"
            parameters["disease"] = disease

        with self.engine.connect() as connection:
            rows = connection.execute(
                text(statement),
                parameters,
            ).mappings().all()

        return [dict(row) for row in rows]

    def recommendations(
        self,
        disease: str | None = None,
        risk_level: str | None = None,
    ) -> list[dict[str, Any]]:
        clauses: list[str] = []
        parameters: dict[str, Any] = {}

        if disease:
            clauses.append(
                "Disease = :disease"
            )
            parameters["disease"] = disease

        if risk_level:
            clauses.append(
                "RiskLevel = :risk_level"
            )
            parameters["risk_level"] = risk_level

        statement = "SELECT * FROM dbo.Recommendations"

        if clauses:
            statement += (
                " WHERE " + " AND ".join(clauses)
            )

        with self.engine.connect() as connection:
            rows = connection.execute(
                text(statement),
                parameters,
            ).mappings().all()

        return [dict(row) for row in rows]


def create_repository() -> Repository:
    if DATABASE_URL:
        return SqlServerRepository(
            create_sql_server_engine()
        )

    if ALLOW_IN_MEMORY_STORE:
        return MemoryRepository()

    raise RuntimeError(
        "DATABASE_URL is required outside isolated tests. "
        "Set ALLOW_IN_MEMORY_STORE=true only for test execution."
    )


repository = create_repository()