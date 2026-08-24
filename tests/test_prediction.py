import pandas as pd
import pytest
from uuid import uuid4
from fastapi.testclient import TestClient

from API.app import app

client = TestClient(app)


def token() -> str:
    email = f"prediction.{uuid4().hex}@example.com"
    response = client.post(
        "/api/auth/register",
        json={"name": "Prediction Tester", "email": email, "password": "secure-password"},
    )
    return response.json()["access_token"]


@pytest.mark.parametrize(
    ("disease", "source", "target", "drop"),
    [
        ("diabetes", "Datasets/Diabetes_prediction.csv", "Diagnosis", None),
        ("heart", "Datasets/heart.csv", "Heart Disease", "id"),
        ("kidney", "Datasets/kidney_disease_dataset.csv", "Target", None),
        ("liver", "Datasets/Indian Liver Patient Dataset (ILPD).csv", "is_patient", None),
    ],
)
def test_prediction_uses_local_artifact(disease: str, source: str, target: str, drop: str | None) -> None:
    values = pd.read_csv(source).drop(columns=target).iloc[0].to_dict()
    if drop:
        values.pop(drop)
    response = client.post(
        f"/api/predict/{disease}",
        json={"values": values, "include_explanation": False},
        headers={"Authorization": f"Bearer {token()}"},
    )
    assert response.status_code == 200
    assert response.json()["disease"] == disease
    assert response.json()["review_status"] == "Pending"
    assert response.json()["created_at"]


def test_prediction_requires_all_features() -> None:
    response = client.post("/api/predict/diabetes", json={"values": {}}, headers={"Authorization": f"Bearer {token()}"})
    assert response.status_code == 422
