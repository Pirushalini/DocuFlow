from pathlib import Path
from fastapi import APIRouter, Depends, File, Form, UploadFile
from fastapi import HTTPException
from fastapi.responses import FileResponse
from fastapi import (APIRouter, Depends, File, Form, UploadFile, HTTPException, Query)
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.core.dependencies import get_current_user, require_role
from app.database.database import get_db
from app.models.document import Document
from app.models.document_version import DocumentVersion
from app.models.user import User
from app.services.document_service import create_document, create_document_version
from app.models.workflow_action import WorkflowAction
from datetime import datetime
from typing import Optional
from app.models import document


router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.get("/me")
def get_my_documents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(Document)
        .filter(Document.uploaded_by == current_user.id)
        .all()
    )

    return documents


@router.post("/upload")
def upload_document(
    title: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    from pathlib import Path
    import uuid

    storage_dir = Path("storage/documents")
    storage_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    original_file_name = file.filename or "uploaded_file"
    file_extension = Path(original_file_name).suffix

    stored_file_name = f"{uuid.uuid4()}{file_extension}"
    stored_file_path = storage_dir / stored_file_name

    file_content = file.file.read()

    with open(stored_file_path, "wb") as buffer:
        buffer.write(file_content)

    document = create_document(
        db=db,
        title=title,
        file_name=original_file_name,
        file_type=file.content_type or "application/octet-stream",
        file_size=len(file_content),
        file_path=str(stored_file_path),
        current_user=current_user,
    )

    create_document_version(
        db=db,
        document=document,
        current_user=current_user,
    )

    return {
        "message": "Document uploaded successfully",
        "document_id": document.id,
        "title": document.title,
        "file_name": document.file_name,
        "file_path": document.file_path,
        "uploaded_by": document.uploaded_by,
    }

@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = db.scalar(
        select(Document).where(
            Document.id == document_id
        )
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    if document.uploaded_by != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access this document",
        )

    file_path = Path(document.file_path)

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Document file not found",
        )

    return FileResponse(
        path=file_path,
        media_type=document.file_type,
        filename=document.file_name,
    )

@router.get("/review")
def get_documents_for_review(
    current_user: User = Depends(
        require_role("MANAGER")
    ),
    db: Session = Depends(get_db),
):
    documents = db.scalars(
        select(Document)
        .where(Document.status == "UPLOADED")
        .order_by(Document.created_at.desc())
    ).all()

    return documents

@router.post("/{document_id}/approve")
def approve_document(
    document_id: int,
    current_user: User = Depends(
        require_role("MANAGER")
    ),
    db: Session = Depends(get_db),
):
    document = db.scalar(
        select(Document).where(
            Document.id == document_id
        )
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    if document.status != "UPLOADED":
        raise HTTPException(
            status_code=400,
            detail="Only uploaded documents can be approved",
        )

    document.status = "APPROVED"
    document.reviewed_by = current_user.id
    document.reviewed_at = datetime.utcnow()
    document.rejection_reason = None

    workflow_action = WorkflowAction(
    document_id=document.id,
    performed_by=current_user.id,
    action="APPROVE",
    from_status="UPLOADED",
    to_status="APPROVED",
    comment=None,
)

    db.add(workflow_action)

    db.commit()
    db.refresh(document)

    return {
        "message": "Document approved successfully",
        "document_id": document.id,
        "status": document.status,
        "reviewed_by": document.reviewed_by,
        "reviewed_at": document.reviewed_at,
    }

@router.post("/{document_id}/reject")
def reject_document(
    document_id: int,
    rejection_reason: str = Form(...),
    current_user: User = Depends(
        require_role("MANAGER")
    ),
    db: Session = Depends(get_db),
):
    document = db.scalar(
        select(Document).where(
            Document.id == document_id
        )
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    if document.status != "UPLOADED":
        raise HTTPException(
            status_code=400,
            detail="Only uploaded documents can be rejected",
        )

    if not rejection_reason.strip():
        raise HTTPException(
            status_code=400,
            detail="Rejection reason is required",
        )

    document.status = "REJECTED"
    document.reviewed_by = current_user.id
    document.reviewed_at = datetime.utcnow()
    document.rejection_reason = rejection_reason.strip()

    workflow_action = WorkflowAction(
        document_id=document.id,
        performed_by=current_user.id,
        action="REJECT",
        from_status="UPLOADED",
        to_status="REJECTED",
        comment=rejection_reason.strip(),
    )      

    db.add(workflow_action)

    db.commit()
    db.refresh(document)

    return {
        "message": "Document rejected successfully",
        "document_id": document.id,
        "status": document.status,
        "rejection_reason": document.rejection_reason,
        "reviewed_by": document.reviewed_by,
        "reviewed_at": document.reviewed_at,
    }

@router.get("/{document_id}/workflow-history")
def get_workflow_history(
    document_id: int,
    current_user: User = Depends(
        require_role("MANAGER")
    ),
    db: Session = Depends(get_db),
):
    document = db.scalar(
        select(Document).where(
            Document.id == document_id
        )
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    workflow_history = db.scalars(
        select(WorkflowAction)
        .where(
            WorkflowAction.document_id == document_id
        )
        .order_by(
            WorkflowAction.created_at.desc()
        )
    ).all()

    return workflow_history

@router.get("/{document_id}/versions")
def get_document_versions(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = db.scalar(
        select(Document).where(
            Document.id == document_id
        )
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )
    
    if document.uploaded_by != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access this document",
        )

    versions = db.scalars(
        select(DocumentVersion)
        .where(
            DocumentVersion.document_id == document_id
        )
        .order_by(
            DocumentVersion.version_number.desc()
        )
    ).all()

    return versions


@router.get("/{document_id}/versions/{version_number}/download")
def download_document_version(
    document_id: int,
    version_number: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    document = db.scalar(
        select(Document).where(
            Document.id == document_id
        )
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )


    if document.uploaded_by != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access this document",
        )

    version = db.scalar(
        select(DocumentVersion).where(
            DocumentVersion.document_id == document_id,
            DocumentVersion.version_number == version_number,
        )
    )

    if version is None:
        raise HTTPException(
            status_code=404,
            detail="Document version not found",
        )

    file_path = Path(version.file_path)

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Document version file not found",
        )

    return FileResponse(
        path=file_path,
        media_type=document.file_type,
        filename=version.file_name,
    )

@router.get("/search")
def search_documents(
    keyword: Optional[str] = None,
    category_id: Optional[int] = None,
    status: Optional[str] = None,
    from_date: Optional[datetime] = None,
    to_date: Optional[datetime] = None,
    uploaded_by: Optional[int] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    sort_by: str = "created_at",
    sort_order: str = "desc",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    query = select(Document)

    if current_user.role.name == "EMPLOYEE":
        query = query.where(
            Document.uploaded_by == current_user.id
        )

    if keyword:
        search_term = f"%{keyword}%"

        query = query.where(
            Document.title.ilike(search_term)
            | Document.file_name.ilike(search_term)
        )

    if category_id is not None:
        query = query.where(
            Document.category_id == category_id
        )

    if status is not None:
        query = query.where(
            Document.status == status
        )

    if from_date is not None:
        query = query.where(
            Document.created_at >= from_date
        )

    if to_date is not None:
        query = query.where(
            Document.created_at <= to_date
        )

    if uploaded_by is not None:
        query = query.where(
            Document.uploaded_by == uploaded_by
        )

    if sort_by == "title":
        sort_column = Document.title
    elif sort_by == "file_name":
        sort_column = Document.file_name
    else:
        sort_column = Document.created_at

    if sort_order.lower() == "asc":
        query = query.order_by(sort_column.asc())
    else:
        query = query.order_by(sort_column.desc())

    offset = (page - 1) * limit

    documents = db.scalars(
        query.offset(offset).limit(limit)
    ).all()

    return {
        "count":len(documents),
        "results": documents,
        "limit": limit,
        "page": page,
    }