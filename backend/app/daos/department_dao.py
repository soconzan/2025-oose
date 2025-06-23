from sqlalchemy.orm import Session
from ..models import department_model

def get_all_departments(db: Session):
    """
    모든 부서 목록을 조회합니다.
    """
    return db.query(department_model.Department).all() 