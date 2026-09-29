from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (create_access_token, verify_access_token ,verify_password)
from app.core.dependencies import get_current_user, require_role
from app.database.database import get_db
from app.models.user import User
from app.schemas.auth import UserLogin, UserRegister, UserResponse
from app.services.user_service import register_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):
    try:
        user = register_user(
            db=db,
            user_data=user_data,
        )

        return user

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.scalar(
        select(User).where(User.email == form_data.username)
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        form_data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "role_id": user.role_id,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role_id": current_user.role_id,
    } 


@router.get("/admin-test")
def admin_test(
    current_user: User = Depends(
        require_role("ADMIN")
    ),
):
    return {
        "message": "Admin access granted",
        "user": current_user.name,
        "role": current_user.role.name,
    }

@router.get("/manager-test")
def manager_test(
    current_user: User = Depends(
        require_role("MANAGER")
    ),
):
    return {
        "message": "Manager access granted",
        "user": current_user.name,
        "role": current_user.role.name,
    }

@router.get("/employee-test")
def employee_test(
    current_user: User = Depends(
        require_role("EMPLOYEE")
    ),
):
    return {
        "message": "Employee access granted",
        "user": current_user.name,
        "role": current_user.role.name,
    }