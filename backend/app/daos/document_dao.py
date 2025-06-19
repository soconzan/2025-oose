# backend/app/daos/document_dao.py

from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.document_model import Document
from app.schemas.document_schema import DocumentCreate, DocumentUpdate


class DocumentDAO:
    # __init__ 메소드를 제거하고 각 메소드에서 db 세션을 받도록 수정

    def create_document(self, db: Session, *, doc_in: DocumentCreate) -> Document:
        # doc_in.dict() -> doc_in.model_dump()로 변경
        db_obj = Document(**doc_in.model_dump())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_document(self, db: Session, document_id: int) -> Optional[Document]:
        # PK가 Integer 타입으로 변경되었으므로 document_id 타입도 int로 변경
        return db.query(Document).filter(Document.id == document_id).first()

    def get_documents(self, db: Session, skip: int = 0, limit: int = 100) -> List[Document]:
        return db.query(Document).offset(skip).limit(limit).all()

    # --- 아래 Update, Delete 메소드 추가 ---

    def update_document(
            self, db: Session, *, db_obj: Document, obj_in: DocumentUpdate
    ) -> Document:
        # Pydantic 스키마에서 받은 데이터만 업데이트
        update_data = obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete_document(self, db: Session, *, db_obj: Document) -> Document:
        db.delete(db_obj)
        db.commit()
        return db_obj


# 다른 DAO 파일처럼 싱글톤 인스턴스 생성
document_dao = DocumentDAO()