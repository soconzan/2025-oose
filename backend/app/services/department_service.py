from sqlalchemy.orm import Session
from ..daos import department_dao

def get_departments(db: Session):
    """
    모든 부서 목록을 가져오는 서비스 함수
    """
    return department_dao.get_all_departments(db=db) 