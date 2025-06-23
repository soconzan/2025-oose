from typing import List, Optional
from ..daos.employee_dao import EmployeeDAO
from ..schemas.employee_schema import EmployeeCreate
from ..models.employee_model import Employee

class EmployeeService:
    def __init__(self, employee_dao: EmployeeDAO):
        self.employee_dao = employee_dao

    # 직원 등록
    def register_employee(self, employee_data: EmployeeCreate) -> Employee:
        new_employee = Employee(**employee_data.model_dump())
        created_employee = self.employee_dao.create_employee(new_employee)
        return created_employee
    
    # 직원 목록 조회
    def get_employee_list(self, skip:int = 0, limit: int = 100) -> List[Employee]:
        employees = self.employee_dao.get_employees(skip= skip, limit= limit)
        return employees
    
    # 상세 조회 (employeeNum)
    def get_employee_by_num(self, emp_num: int) -> Optional[Employee]:
        emp = self.employee_dao.get_employee_by_num(emp_num)
        return emp

    # 상세 조회 (employeeId)
    def get_employee_by_id(self, employee_id: str) -> Optional[Employee]:
        emp = self.employee_dao.get_employee_by_id(employee_id)
        return emp