from fastapi.testclient import TestClient

from API.app import app

client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_docs_are_available() -> None:
    assert client.get("/docs").status_code == 200
