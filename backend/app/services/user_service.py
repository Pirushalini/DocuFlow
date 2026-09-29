from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.role import Role
from app.models.user import User
from app.schemas.auth import UserRegister
from app.core.security import hash_password


def register_user(
    db: Session,
    user_data: UserRegister,
) -> User:

    # Check if email already exists
    existing_user = db.scalar(
        select(User).where(User.email == user_data.email)
    )

    if existing_user is not None:
        raise ValueError("Email already registered")

    # Check if role exists
    role = db.scalar(
        select(Role).where(Role.id == user_data.role_id)
    )

    if role is None:
        raise ValueError("Role not found")

    # Hash password
    password_hash = hash_password(user_data.password)

    # Create user
    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=password_hash,
        role_id=user_data.role_id,
        is_active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user