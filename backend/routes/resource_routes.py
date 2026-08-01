from fastapi import APIRouter

router = APIRouter()


@router.get("/resources")
def resources():

    return {
        "message":"Resources Coming Soon"
    }