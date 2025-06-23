import secrets
from typing import List, Optional
from sqlalchemy.orm import Session
from ..models.employee_model import Employee


class EmployeeDAO:
    def __init__(self, db: Session):
        self.db = db

    def create_employee(self, emp: Employee) -> Employee:
        raw_password = secrets.token_urlsafe(12)
        emp.password = raw_password
        emp.__dict__["_raw_password"] = raw_password

        self.db.add(emp)
        self.db.commit()
        self.db.refresh(emp)
        return emp
    
    def get_employees(self, skip: int = 0, limit: int = 100) -> List[Employee]:
        return self.db.query(Employee).offset(skip).limit(limit).all()

    def get_employee(self, emp_num: int) -> Optional[Employee]:
        return self.db.query(Employee).filter(Employee.employeeNum == emp_num).first()
    
    def search_employees(self, keyword: str, skip: int = 0, limit: int = 100) -> List[Employee]:
        query = self.db.query(Employee).filter(
            (Employee.name.like(f"%{keyword}%")) |
            (Employee.employeeNum.like(f"%{keyword}%"))
        )
        return query.offset(skip).limit(limit).all()
    
    def get_by_employee_num(self, emp_num: int) -> Optional[Employee]:
        return self.db.query(Employee).filter(Employee.employeeNum == emp_num).first()