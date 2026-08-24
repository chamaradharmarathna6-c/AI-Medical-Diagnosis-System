from fastapi.testclient import TestClient

from API.app import app


def test_doctors_are_loaded_from_workbook() -> None:
    response = TestClient(app).get("/api/doctors?disease=Diabetes")
    assert response.status_code == 200
    assert len(response.json()) == 10
