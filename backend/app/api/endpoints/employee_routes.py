from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_all_employees():
    return {"message": "Hello from employee!"}