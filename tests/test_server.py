import os
from types import SimpleNamespace

import server


def client():
    server.app.config.update(TESTING=True)
    return server.app.test_client()


def test_health_does_not_expose_secret(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-secret-value")
    response = client().get("/api/health")
    assert response.status_code == 200
    assert response.get_json() == {"ok": True, "ai_configured": True}
    assert b"test-secret-value" not in response.data
    assert response.headers["Cache-Control"] == "no-store"


def test_health_reports_unconfigured(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client().get("/api/health")
    assert response.get_json() == {"ok": True, "ai_configured": False}


def test_chat_rejects_non_json():
    response = client().post("/api/chat", data="hello", content_type="text/plain")
    assert response.status_code == 415


def test_chat_rejects_invalid_payloads(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-key")
    c = client()
    assert c.post("/api/chat", json=[]).status_code == 400
    assert c.post("/api/chat", json={"message": 42}).status_code == 400
    assert c.post("/api/chat", json={"message": "   "}).status_code == 400
    assert c.post("/api/chat", json={"message": "x" * 5001}).status_code == 413


def test_chat_requires_server_secret(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    response = client().post("/api/chat", json={"message": "سلام"})
    assert response.status_code == 503
    assert "error" in response.get_json()


def test_chat_success_uses_server_side_client(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-key")
    monkeypatch.setenv("OPENAI_MODEL", "test-model")
    captured = {}

    class FakeResponses:
        def create(self, **kwargs):
            captured.update(kwargs)
            return SimpleNamespace(output_text="پاسخ آزمایشی")

    class FakeOpenAI:
        def __init__(self, **kwargs):
            captured["client"] = kwargs
            self.responses = FakeResponses()

    monkeypatch.setattr(server, "OpenAI", FakeOpenAI)
    response = client().post("/api/chat", json={"message": "سلام", "language": "ps"})
    assert response.status_code == 200
    assert response.get_json() == {"answer": "پاسخ آزمایشی"}
    assert captured["client"]["api_key"] == "test-key"
    assert captured["model"] == "test-model"
    assert "Pashto" in captured["instructions"]


def test_translate_validates_languages_and_text(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-key")
    c = client()
    assert c.post("/api/translate", json={"text": "سلام"}).status_code == 400
    assert c.post("/api/translate", json={
        "text": "سلام", "source_language": "fa", "target_language": "fa"
    }).status_code == 400
    assert c.post("/api/translate", json={
        "text": "سلام", "source_language": "xx", "target_language": "en"
    }).status_code == 400
    assert c.post("/api/translate", json={
        "text": "x" * 5001, "source_language": "fa", "target_language": "en"
    }).status_code == 413


def test_translate_success(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-key")

    class FakeResponses:
        def create(self, **kwargs):
            assert "Dari" in kwargs["instructions"]
            assert "English" in kwargs["instructions"]
            return SimpleNamespace(output_text="Hello")

    class FakeOpenAI:
        def __init__(self, **kwargs):
            self.responses = FakeResponses()

    monkeypatch.setattr(server, "OpenAI", FakeOpenAI)
    response = client().post("/api/translate", json={
        "text": "سلام", "source_language": "fa", "target_language": "en"
    })
    assert response.status_code == 200
    assert response.get_json() == {"translation": "Hello"}


def test_private_project_files_are_not_public():
    c = client()
    for path in ("/server.py", "/requirements.txt", "/.gitignore", "/README.md"):
        assert c.get(path).status_code == 404


def test_security_headers_are_present():
    response = client().get("/api/health")
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"


def test_initial_schema_requires_verified_contact_for_active_accounts():
    from pathlib import Path

    schema = (
        Path(__file__).resolve().parents[1]
        / "migrations"
        / "001_initial_schema.sql"
    ).read_text(encoding="utf-8")
    assert "email_verified_at TIMESTAMPTZ" in schema
    assert "phone_verified_at TIMESTAMPTZ" in schema
    assert "status <> 'active'" in schema
    assert "OR email_verified_at IS NOT NULL" in schema
    assert "OR phone_verified_at IS NOT NULL" in schema


def test_initial_schema_stores_only_hashed_session_and_invitation_tokens():
    from pathlib import Path

    schema = (
        Path(__file__).resolve().parents[1]
        / "migrations"
        / "001_initial_schema.sql"
    ).read_text(encoding="utf-8")
    assert "token_hash CHAR(64) NOT NULL UNIQUE" in schema
    assert "CREATE TABLE sessions" in schema
    assert "CREATE TABLE bootstrap_invites" in schema


def test_chat_rate_limit_returns_json_429(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    c = client()
    remote = {"REMOTE_ADDR": "198.51.100.42"}
    for _ in range(10):
        response = c.post(
            "/api/chat",
            json={"message": "سلام"},
            environ_overrides=remote,
        )
        assert response.status_code == 503
    limited = c.post(
        "/api/chat",
        json={"message": "سلام"},
        environ_overrides=remote,
    )
    assert limited.status_code == 429
    assert limited.get_json() == {
        "error": "Too many requests. Please try again later."
    }
