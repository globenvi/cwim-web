# Тесты для проверки работы маршрутов
import pytest
from app import create_app

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })
    return app

def test_index(app):
    # Проверка тестового маршрута "/test/"
    client = app.test_client()
    response = client.get("/test/")
    assert response.status_code == 200
    assert b"Hello, Flask!" in response.data
