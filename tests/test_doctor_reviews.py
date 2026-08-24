from uuid import uuid4

import pandas as pd
from fastapi.testclient import TestClient

from API.app import app
from API.services.repository import MemoryRepository, repository

client = TestClient(app)


def _token(email: str) -> str:
    response = client.post(
        "/api/auth/register",
        json={"name": "Doctor Review Tester", "email": email, "password": "secure-password"},
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def test_doctor_review_requires_authentication_and_updates_history() -> None:
    patient_email = f"patient.{uuid4().hex}@example.com"
    patient_token = _token(patient_email)
    doctor_email = f"doctor.{uuid4().hex}@example.com"
    doctor_token = _token(doctor_email)
    assert isinstance(repository, MemoryRepository)
    repository.set_user_role(doctor_email, "Doctor")
    values = pd.read_csv("Datasets/Diabetes_prediction.csv").drop(columns="Diagnosis").iloc[0].to_dict()
    predicted = client.post(
        "/api/predict/diabetes",
        json={"values": values, "include_explanation": False},
        headers={"Authorization": f"Bearer {patient_token}"},
    )
    assert predicted.status_code == 200
    prediction_id = predicted.json()["prediction_id"]
    review_payload = {"prediction_id": prediction_id, "status": "Approved", "notes": "Reviewed for test."}
    assert client.post("/api/doctor-reviews", json=review_payload).status_code == 401
    denied = client.post(
        "/api/doctor-reviews",
        json=review_payload,
        headers={"Authorization": f"Bearer {patient_token}"},
    )
    assert denied.status_code == 403
    reviewed = client.post(
        "/api/doctor-reviews",
        json=review_payload,
        headers={"Authorization": f"Bearer {doctor_token}"},
    )
    assert reviewed.status_code == 200
    history = client.get("/api/history", headers={"Authorization": f"Bearer {patient_token}"})
    assert history.status_code == 200
    assert next(item for item in history.json() if item["id"] == prediction_id)["review_status"] == "Approved"
