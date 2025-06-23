from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...core.dependencies import get_db_session

router = APIRouter(prefix="/test", tags=["test"])

@router.get("/db")
def test_db_connection(db: Session = Depends(get_db_session)):
    try:
        # 데이터베이스 연결 테스트
        result = db.execute("SELECT 1").fetchone()
        return {"status": "success", "result": result[0]}
    except Exception as e:
        return {"status": "error", "message": str(e)}
