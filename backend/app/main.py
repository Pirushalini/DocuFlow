from fastapi import FastAPI
from sqlalchemy import text
from pydantic import BaseModel
from app.services.email_services import send_notification_email

from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.database import get_db
from app.models.notification import NotificationType
from app.services.notification_services import create_notification


from app.database.database import engine
from app.api import documents
from app.api import categories
from app.api.auth import router as auth_router
from app.api.documents import router as documents_router

app = FastAPI(
    title="DocuFlow API",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(documents_router)
app.include_router(categories.router)
class EmailTestRequest(BaseModel):
    email: str


@app.get("/")
def root():
    return {
        "message": "Welcome to DocuFlow API"
    }


@app.get("/health/database")
def database_health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "database": "connected"
    }

@app.post("/test/email")
async def test_email(request: EmailTestRequest):
    await send_notification_email(
        recipient_email=request.email,
        title="DocuFlow Test Notification",
        message="This is a test email from DocuFlow.",
    )

    return {
        "message": "Email sent successfully"
    }

@app.post("/test/notification/{user_id}")
async def test_notification(
    user_id: int,
    db: Session = Depends(get_db),
):
    notification = await create_notification(
        db=db,
        user_id=user_id,
        notification_type=NotificationType.SYSTEM,
        title="DocuFlow Test Notification",
        message="This notification was created by DocuFlow.",
    )

    return {
        "message": "Notification created",
        "notification_id": notification.id,
        "email_sent": notification.email_sent,
    }