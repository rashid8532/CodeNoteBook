from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_,and_
from FASTAPI.post_apis.Users_api.auth.Signin_api import get_current_user
from DATABASE.Tables.projects_table import Project
from DATABASE.Tables.users_table import User
from DATABASE.Tables.file_table import File
from DATABASE.database import get_db
from FASTAPI.post_apis.pydanticModels.create_file_model import CreateFile

router = APIRouter()

@router.post("/create_file")
def create_file(file : CreateFile,
    current_user : User = Depends(get_current_user),
    db : Session = Depends(get_db),
):
    filtered_file = db.query(Project).filter(
        and_(
            Project.id == file.project_id,
            Project.user_id == current_user.id,
        )
    ).first()

    if not filtered_file:
        raise HTTPException(
            status_code= 404,
            detail="project not found"
        )

    file_exist = db.query(File).filter(
        File.project_id == file.project_id,
        File.file_name == file.file_name
        ).first()

    if file_exist:
        raise HTTPException(
            status_code=500,
            detail="file already exist"
        )
    new_file = File(
        project_id = file.project_id,
        file_name = file.file_name
    )

    try:
        db.add(new_file)
        db.commit()
        db.refresh(new_file)
        return("file_successfully created ")
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=404,
            detail="something went wrong file is not saved "
        )