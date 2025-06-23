from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ...services import department_service
from ...schemas import department_schema
from ...core.dependencies import get_db

router = APIRouter()

@router.get("", response_model=List[department_schema.Department])
def read_departments(db: Session = Depends(get_db)):
    """
    모든 부서 목록을 조회하는 API
    """
    departments = department_service.get_departments(db=db)
    return departments 