from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from typing import Optional

from ...core.dependencies import get_db_session # DB 세션 의존성 주입
from ...schemas.employee_schema import EmployeeCreate, EmployeeResponse
from ...daos.employee_dao import EmployeeDAO
from ...services.employee_service import EmployeeService

router = APIRouter(tags=["employees"])

def get_employee_service(db: Session = Depends(get_db_session)) -> EmployeeService:
    employee_dao = EmployeeDAO(db)
    return EmployeeService(employee_dao)

@router.post("/employees", response_model=EmployeeResponse, status_code=201)
def register_employee(emp_in: EmployeeCreate,
                      emp_service : EmployeeService = Depends(get_employee_service)):
    """
    직원 등록
    """
    try:
        new_employee = emp_service.register_employee(emp_in)
        return new_employee
    except ValueError as e:
        raise HTTPException(
            status_code = 400,
            detail = str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code = 500,
            detail = str(e)
        )
    # dto = EmployeeService.register(db, emp_in)
    # return dto


@router.get("/employees/{id}", response_model=EmployeeResponse)
def read_employee(id: str,
                  employee_service: EmployeeService = Depends(get_employee_service)):
    """
    직원 상세 조회
    """
    emp = employee_service.get_employee(id)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee not found : {id}")
    return emp

@router.get("/employees", response_model=List[EmployeeResponse])
def read_employees(skip: int = 0, limit: int = 100, keyword: Optional[str] = None,
                   employee_service: EmployeeService = Depends(get_employee_service)):
    """
    직원 목록 조회 (검색 포함)
    """
    if keyword:
        return employee_service.search_employees(keyword=keyword, skip=skip, limit=limit)
    return employee_service.get_employee_list(skip=skip, limit=limit)