from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.daos.document_dao import document_dao
from app.schemas.document_schema import DocumentCreate, DocumentUpdate
from app.models.document_model import Document


class DocumentService:
    def create_new_document(self, db: Session, *, doc_in: DocumentCreate) -> Document:
        """
        새로운 문서를 생성합니다.
        (여기서 추가적인 비즈니스 로직을 수행할 수 있습니다. 예: 작성자 ID 유효성 검사)
        """
        # DAO를 호출하여 받은 데이터를 DB에 생성합니다.
        created_doc = document_dao.create_document(db=db, doc_in=doc_in)
        return created_doc

    def get_document_by_id(self, db: Session, *, doc_id: int) -> Optional[Document]:
        """
        ID로 특정 문서를 조회합니다. 문서가 없으면 404 에러를 발생시킵니다.
        """
        document = document_dao.get_document(db, document_id=doc_id)
        if not document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="해당 ID의 문서를 찾을 수 없습니다.",
            )
        return document

    def get_all_documents(self, db: Session, skip: int = 0, limit: int = 100) -> List[Document]:
        """
        모든 문서 목록을 조회합니다.
        """
        return document_dao.get_documents(db, skip=skip, limit=limit)

    def update_existing_document(
            self, db: Session, *, doc_id: int, obj_in: DocumentUpdate
    ) -> Document:
        """
        기존 문서를 수정합니다.
        """
        # 먼저 문서가 존재하는지 확인합니다. (없으면 get_document_by_id에서 404 에러 발생)
        db_obj = self.get_document_by_id(db, doc_id=doc_id)

        updated_doc = document_dao.update_document(db=db, db_obj=db_obj, obj_in=obj_in)
        return updated_doc

    def delete_document_by_id(self, db: Session, *, doc_id: int) -> Document:
        """
        ID로 특정 문서를 삭제합니다.
        """
        # 먼저 문서가 존재하는지 확인합니다.
        db_obj = self.get_document_by_id(db, doc_id=doc_id)

        deleted_doc = document_dao.delete_document(db=db, db_obj=db_obj)
        return deleted_doc


# 다른 서비스 파일처럼 싱글톤 인스턴스 생성
document_service = DocumentService()