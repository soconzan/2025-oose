from sqlalchemy.orm import Session
from app.daos.workroom_dao import WorkroomDAO
from app.models.workroom_model import Workroom
from app.schemas.workroom_schema import WorkroomCreate, WorkroomUpdate

def register_work(db: Session, work_data: WorkroomCreate):
    dao = WorkroomDAO(db)
    work = Workroom(**work_data.model_dump()) 
    return dao.create_workroom(work)

def get_work(db: Session, work_id: int):
    dao = WorkroomDAO(db)
    return dao.get_workroom(work_id)

def get_works(db: Session):
    dao = WorkroomDAO(db)
    return dao.get_workrooms()

def update_work(db: Session, work_id: int, work_data: WorkroomUpdate):
    dao = WorkroomDAO(db)
    return dao.update_workroom(work_id, work_data)

def delete_work(db: Session, work_id: int):
    dao = WorkroomDAO(db)
    return dao.delete_workroom(work_id)

def set_unit_worker(db: Session, work_id: int, assignee: str):
    dao = WorkroomDAO(db)
    return dao.set_unit_worker(work_id, assignee)

def set_period(db: Session, work_id: int, startDate, endDate):
    dao = WorkroomDAO(db)
    return dao.set_period(work_id, startDate, endDate)

def set_public(db: Session, work_id: int, isPublic: bool):
    dao = WorkroomDAO(db)
    return dao.set_public(work_id, isPublic)
