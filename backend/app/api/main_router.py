from fastapi import APIRouter
from app.api.endpoints import employee_routes
from app.api.endpoints import workroom_routes

api_router = APIRouter()

api_router.include_router(workroom_routes.router, prefix="/workrooms", tags=["Workrooms"])
api_router.include_router(employee_routes.router, tags=["Employees"])

