from fastapi.testclient import TestClient
from uuid import uuid4

from API.app import app

client = TestClient(app)


def test_register_and_login() -> None:
    payload = {"name": "Test User", "email": f"test.{uuid4().hex}@example.com", "password": "secure-password"}
    registered = client.post("/api/auth/register", json=payload)
    assert registered.status_code == 200
    assert registered.json()["access_token"]
    logged_in = client.post("/api/auth/login", json={"email": payload["email"], "password": payload["password"]})
    assert logged_in.status_code == 200


def test_login_rejects_bad_credentials() -> None:
    assert client.post("/api/auth/login", json={"email": "missing@example.com", "password": "not-it"}).status_code == 401
