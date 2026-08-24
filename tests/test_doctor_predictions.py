from uuid import uuid4

from fastapi.testclient import TestClient

from API.app import app
from API.services.repository import MemoryRepository, repository

client = TestClient(app)


def _register(name: str) -> tuple[str, str]:
    email = f"{name.lower()}.{uuid4().hex}@example.com"
    response = client.post(
        "/api/auth/register",
        json={"name": name, "email": email, "password": "secure-password"},
    )
    assert response.status_code == 200
    return email, response.json()["access_token"]


def test_doctor_predictions_require_doctor_role() -> None:
    patient_email, patient_token = _register("Patient")
    doctor_email, doctor_token = _register("Doctor")
    assert isinstance(repository, MemoryRepository)
    repository.set_user_role(doctor_email, "Doctor")
    repository.add_prediction(
        patient_email,
        {
            "disease": "diabetes",
            "prediction": "1",
            "probability": 0.5043,
            "risk_level": "Moderate",
            "explanation": [],
            "disclaimer": "Test only.",
        },
        {},
    )
    patient_response = client.get(
        "/api/doctor/predictions",
        headers={"Authorization": f"Bearer {patient_token}"},
    )
    assert patient_response.status_code == 403
    doctor_response = client.get(
        "/api/doctor/predictions",
        headers={"Authorization": f"Bearer {doctor_token}"},
    )
    assert doctor_response.status_code == 200
    assert doctor_response.json()[0]["disease"] == "diabetes"
