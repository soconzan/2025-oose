from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...core.dependencies import get_db_session # DB 세션 의존성 주입
from ...schemas.employee_schema import EmployeeCreate, EmployeeResponse
from ...daos.employee_dao import EmployeeDAO
from ...services.employee_service import EmployeeService

router = APIRouter(prefix="/employees", tags=["employees"])

def get_employee_service(db: Session = Depends(get_db_session)) -> EmployeeService:
    employee_dao = EmployeeDAO(db)
    return EmployeeService(employee_dao)

@router.post("/", response_model=EmployeeResponse, status_code=201)
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


@router.get("/", response_model=List[EmployeeResponse])
def read_employees(skip: int = 0, limit: int = 100,
                   employee_service: EmployeeService = Depends(get_employee_service)):
    """
    직원 목록 조회
    """
    return employee_service.get_employee_list(skip=skip, limit=limit)


@router.get("/{emp_id}", response_model=EmployeeResponse)
def read_employee(emp_num: int,
                  employee_service: EmployeeService = Depends(get_employee_service)):
    """
    직원 상세 조회
    """
    emp = employee_service.get_employee(emp_num)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee not found : {emp_num}")
    return emp