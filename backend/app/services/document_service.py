from pathlib import Path

from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.document_version import DocumentVersion
from app.models.user import User


STORAGE_DIR = Path("storage/documents")
STORAGE_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def create_document(
    db: Session,
    title: str,
    file_name: str,
    file_type: str,
    file_size: int,
    file_path: str,
    current_user: User,
) -> Document:
    document = Document(
        title=title,
        file_name=file_name,
        file_type=file_type,
        file_size=file_size,
        file_path=file_path,
        uploaded_by=current_user.id,
        status="UPLOADED",
        version=1,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document

def create_document_version(
    db: Session,
    document: Document,
    current_user: User,
) -> DocumentVersion:

    version = DocumentVersion(
        document_id=document.id,
        version_number=document.version,
        file_name=document.file_name,
        file_path=document.file_path,
        file_size=document.file_size,
        checksum=document.checksum,
        uploaded_by=current_user.id,
    )

    db.add(version)
    db.commit()
    db.refresh(version)

    return version