from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...schemas.workroom_schema import WorkroomCreate, WorkroomUpdate, WorkroomOut
from ...services import workroom_service

router = APIRouter(
    prefix="/workrooms",
    tags=["Workrooms"]
)

@router.post("/", response_model=WorkroomOut)
def create_workroom(work: WorkroomCreate, db: Session = Depends(get_db)):
    return workroom_service.register_work(db, work)

@router.get("/", response_model=list[WorkroomOut])
def get_all_workrooms(db: Session = Depends(get_db)):
    return workroom_service.get_works(db)

@router.get("/{workroom_id}", response_model=WorkroomOut)
def get_workroom(workroom_id: int, db: Session = Depends(get_db)):
    work = workroom_service.get_work(db, workroom_id)
    if not work:
        raise HTTPException(status_code=404, detail="Workroom not found")
    return work

@router.put("/{workroom_id}", response_model=WorkroomOut)
def update_workroom(workroom_id: int, work: WorkroomUpdate, db: Session = Depends(get_db)):
    updated = workroom_service.update_work(db, workroom_id, work)
    if not updated:
        raise HTTPException(status_code=404, detail="Workroom not found")
    return updated

@router.delete("/{workroom_id}")
def delete_workroom(workroom_id: int, db: Session = Depends(get_db)):
    deleted = workroom_service.delete_work(db, workroom_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Workroom not found")
    return {"result": "success"}

@router.put("/{workroom_id}/assignee")
def set_unit_worker(workroom_id: int, assignee: str, db: Session = Depends(get_db)):
    return workroom_service.set_unit_worker(db, workroom_id, assignee)

@router.put("/{workroom_id}/period")
def set_period(workroom_id: int, start_date: str, end_date: str, db: Session = Depends(get_db)):
    return workroom_service.set_period(db, workroom_id, start_date, end_date)

@router.put("/{workroom_id}/public")
def set_public(workroom_id: int, is_public: bool, db: Session = Depends(get_db)):
    return workroom_service.set_public(db, workroom_id, is_public)
