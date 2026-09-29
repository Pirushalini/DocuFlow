from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_role
from app.models.category import Category
from app.models.user import User

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post("/")
def create_category(
    name: str,
    description: str | None = None,
    current_user: User = Depends(
        require_role("ADMIN")
    ),
    db: Session = Depends(get_db),
):
    existing_category = db.scalar(
        select(Category).where(
            Category.name == name
        )
    )

    if existing_category is not None:
        raise HTTPException(
            status_code=400,
            detail="Category already exists",
        )

    category = Category(
        name=name,
        description=description,
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return {
        "message": "Category created successfully",
        "category": category,
    }

@router.get("/")
def get_categories(
    current_user: User = Depends(
        require_role("ADMIN")
    ),
    db: Session = Depends(get_db),
):
    categories = db.scalars(
        select(Category).order_by(Category.name.asc())
    ).all()

    return {
        "count": len(categories),
        "categories": categories,
    }

@router.put("/{category_id}")
def update_category(
    category_id: int,
    name: str,
    description: str | None = None,
    current_user: User = Depends(
        require_role("ADMIN")
    ),
    db: Session = Depends(get_db),
):
    category = db.scalar(
        select(Category).where(
            Category.id == category_id
        )
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    existing_category = db.scalar(
        select(Category).where(
            Category.name == name,
            Category.id != category_id,
        )
    )

    if existing_category is not None:
        raise HTTPException(
            status_code=400,
            detail="Category name already exists",
        )

    category.name = name
    category.description = description

    db.commit()
    db.refresh(category)

    return {
        "message": "Category updated successfully",
        "category": category,
    }

@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    current_user: User = Depends(
        require_role("ADMIN")
    ),
    db: Session = Depends(get_db),
):
    category = db.scalar(
        select(Category).where(
            Category.id == category_id
        )
    )

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    documents_using_category = db.scalar(
        select(Category)
        .join(Category.documents)
        .where(Category.id == category_id)
    )

    if documents_using_category is not None:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete category because documents are using it",
        )

    db.delete(category)
    db.commit()

    return {
        "message": "Category deleted successfully",
        "category_id": category_id,
    }