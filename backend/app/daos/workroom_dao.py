from sqlalchemy.orm import Session
from ..models.workroom_model import Workroom
from ..schemas.workroom_schema import WorkroomCreate, WorkroomUpdate

class WorkroomDAO:
    """
    업무방(Workroom) 데이터베이스 접근 객체(DAO)
    - 업무방 생성, 조회, 수정, 삭제 등 CRUD 메서드 제공
    """
    def __init__(self, db: Session):
        """
        DAO 생성자
        :param db: SQLAlchemy 세션 객체 (의존성 주입)
        """
        self.db = db

    def create_workroom(self, workroom: Workroom) -> Workroom:
        """
        새로운 업무방(Workroom)을 데이터베이스에 추가
        :param workroom: Workroom 모델 인스턴스
        :return: 생성된 Workroom 객체
        """
        self.db.add(workroom)
        self.db.commit()
        self.db.refresh(workroom)  # DB에서 갱신된 필드(id 등) 반영
        return workroom

    def get_workroom(self, workroom_id: int) -> Workroom:
        """
        특정 ID의 업무방 조회
        :param workroom_id: 조회할 Workroom의 ID
        :return: Workroom 객체 또는 None
        """
        return self.db.query(Workroom).filter(Workroom.id == workroom_id).first()

    def get_workrooms(self):
        """
        모든 업무방 리스트 조회
        :return: Workroom 객체 리스트
        """
        return self.db.query(Workroom).all()

    def update_workroom(self, workroom_id: int, workroom_data: WorkroomUpdate) -> Workroom:
        """
        기존 업무방의 정보를 수정
        :param workroom_id: 수정할 Workroom의 ID
        :param workroom_data: 변경할 데이터 (WorkroomUpdate DTO)
        :return: 수정된 Workroom 객체 또는 None
        """
        db_workroom = self.get_workroom(workroom_id)
        if db_workroom is None:
            return None
        for key, value in workroom_data.dict(exclude_unset=True).items():
            setattr(db_workroom, key, value)  # 동적으로 필드값 수정
        self.db.commit()
        self.db.refresh(db_workroom)
        return db_workroom

    def delete_workroom(self, workroom_id: int):
        """
        특정 업무방을 데이터베이스에서 삭제
        :param workroom_id: 삭제할 Workroom의 ID
        :return: 삭제된 Workroom 객체 또는 None
        """
        db_workroom = self.get_workroom(workroom_id)
        if db_workroom:
            self.db.delete(db_workroom)
            self.db.commit()
        return db_workroom
