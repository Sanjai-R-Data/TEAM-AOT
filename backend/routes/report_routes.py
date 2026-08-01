from fastapi import APIRouter

from backend.services.report_service import (
    sync_reports,
    get_all_reports
)

router = APIRouter()


@router.post("/sync-data")
def sync_data():

    return sync_reports()


@router.get("/reports")
def reports():

    return get_all_reports()