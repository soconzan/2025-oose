from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_db
from app.services.document_service import document_service
from app.schemas.document_schema import DocumentResponse, DocumentCreate, DocumentUpdate

router = APIRouter()

@router.post(
    "/",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="새 문서 등록"
)
def create_document(
    *,
    db: Session = Depends(get_db),
    doc_in: DocumentCreate
):
    """
    새 문서를 생성하는 API

    - **title**: 문서 제목 (필수)
    - **category**: 문서 분류 (필수)
    - **content**: 문서 내용 (필수)
    - **file_url**: 첨부 파일 URL (선택)
    - **author_id**: 작성자 ID (필수)
    """
    return document_service.create_new_document(db=db, doc_in=doc_in)

@router.get(
    "/",
    response_model=List[DocumentResponse],
    summary="모든 문서 조회"
)
def read_documents(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    """
    시스템에 등록된 모든 문서 목록을 가져오는 API
    """
    return document_service.get_all_documents(db, skip=skip, limit=limit)

@router.get(
    "/{doc_id}",
    response_model=DocumentResponse,
    summary="특정 문서 조회"
)
def read_document(
    *,
    db: Session = Depends(get_db),
    doc_id: int
):
    """
    문서 ID를 사용하여 특정 문서를 조회하는 API
    """
    return document_service.get_document_by_id(db, doc_id=doc_id)

@router.put(
    "/{doc_id}",
    response_model=DocumentResponse,
    summary="특정 문서 수정"
)
def update_document(
    *,
    db: Session = Depends(get_db),
    doc_id: int,
    doc_in: DocumentUpdate
):
    """
    문서 ID를 사용하여 특정 문서를 수정하는 API
    """
    return document_service.update_existing_document(db=db, doc_id=doc_id, obj_in=doc_in)

@router.delete(
    "/{doc_id}",
    response_model=DocumentResponse,
    summary="특정 문서 삭제"
)
def delete_document(
    *,
    db: Session = Depends(get_db),
    doc_id: int
):
    """
    문서 ID를 사용하여 특정 문서를 삭제하는 API
    """
    return document_service.delete_document_by_id(db=db, doc_id=doc_id)