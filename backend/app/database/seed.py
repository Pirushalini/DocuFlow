from sqlalchemy import select

from app.database.database import SessionLocal
from app.models.role import Role


DEFAULT_ROLES = [
    {
        "name": "ADMIN",
        "description": "Full system access",
    },
    {
        "name": "MANAGER",
        "description": "Document review and approval access",
    },
    {
        "name": "EMPLOYEE",
        "description": "Document upload and personal document access",
    },
]


def seed_roles():
    db = SessionLocal()

    try:
        for role_data in DEFAULT_ROLES:
            existing_role = db.scalar(
                select(Role).where(
                    Role.name == role_data["name"]
                )
            )

            if existing_role is None:
                db.add(Role(**role_data))

        db.commit()

    finally:
        db.close()


if __name__ == "__main__":
    seed_roles()
    print("Default roles seeded successfully.")