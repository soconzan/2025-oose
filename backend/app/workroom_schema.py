from pydantic import BaseModel
from typing import List, Optional

class WorkroomBase(BaseModel):
    name: str
    description: Optional[str] = None

class WorkroomCreate(WorkroomBase):
    pass

class WorkroomUpdate(WorkroomBase):
    pass

class Workroom(WorkroomBase):
    id: int

    class Config:
        orm_mode = True
