# backend/app/daos/document_dao.py

from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.document_model import Document
from app.schemas.document_schema import DocumentCreate, DocumentUpdate

class DocumentDAO:
    def __init__(self, db: Session):
        self.db = db

    # 1. 문서 등록 (Create)
    def create_document(self, doc_in: DocumentCreate) -> Document:
        """
        새 Document 객체를 받아 DB에 저장하고,
        저장된 Document 인스턴스를 리턴한다.
        """
        document = Document(**doc_in.dict())
        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)
        return document

    # 2. 단일 문서 조회 (Read)
    def get_document(self, document_id: str) -> Optional[Document]:
        """
        문서 ID로 단일 문서를 조회.
        없으면 None 리턴.
        """
        return (
            self.db
            .query(Document)
            .filter(Document.documentID == document_id)
            .first()
        )

    # 3. 문서 목록 조회 (Read All / List)
    def get_documents(
        self,
        skip: int = 0,
        limit: int = 100
    ) -> List[Document]:
        """
        페이징을 위해 skip, limit을 받음.
        """
        return (
            self.db
            .query(Document)
            .offset(skip)
            .limit(limit)
            .all()
        )

    # (선택) 문서 제목으로 검색
    def find_by_title(
        self,
        title_substr: str,
        skip: int = 0,
        limit: int = 100
    ) -> List[Document]:
        """
        제목에 특정 문자열이 포함된 문서 목록 조회.
        """
        return (
            self.db
            .query(Document)
            .filter(Document.title.ilike(f"%{title_substr}%"))
            .offset(skip)
            .limit(limit)
            .all()
        )
