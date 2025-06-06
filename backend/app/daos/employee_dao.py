import secrets
from sqlalchemy.orm import Session
from app.models.employee import Employee


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

    def get_employee(self, emp_id: str) -> Employee | None:
        return self.db.query(Employee).filter(Employee.employeeId == emp_id).first()

    def get_employees(self, skip: int = 0, limit: int = 100) -> list[Employee]:
        return self.db.query(Employee).offset(skip).limit(limit).all()