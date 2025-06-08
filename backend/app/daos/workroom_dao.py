from sqlalchemy.orm import Session
from ..models.workroom_model import Workroom
from ..schemas.workroom_schema import WorkroomCreate, WorkroomUpdate

class WorkroomDAO:
    def __init__(self, db: Session):
        self.db = db

    def create_workroom(self, workroom: Workroom) -> Workroom:
        self.db.add(workroom)
        self.db.commit()
        self.db.refresh(workroom)
        return workroom

    def get_workroom(self, workroom_id: int) -> Workroom:
        return self.db.query(Workroom).filter(Workroom.id == workroom_id).first()

    def get_workrooms(self):
        return self.db.query(Workroom).all()

    def update_workroom(self, workroom_id: int, workroom_data: WorkroomUpdate) -> Workroom:
        db_workroom = self.get_workroom(workroom_id)
        if db_workroom is None:
            return None
        for key, value in workroom_data.dict(exclude_unset=True).items():
            setattr(db_workroom, key, value)
        self.db.commit()
        self.db.refresh(db_workroom)
        return db_workroom

    def delete_workroom(self, workroom_id: int):
        db_workroom = self.get_workroom(workroom_id)
        if db_workroom:
            self.db.delete(db_workroom)
            self.db.commit()
        return db_workroom
