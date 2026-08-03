from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from FASTAPI.post_apis.pydanticModels.Signup_model import UserCreate
from DATABASE.database import get_db
from DATABASE.Tables.users_table import User


app = FastAPI()

# Allowed origen (Front end url)
origins =["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins, # Allowed frontend
    allow_credentials= True,
    allow_methods= ["*"], 
    allow_headers= ["*"]
)

password_context = CryptContext(schemes=["bcrypt"])

Oauth2_scheme = OAuth2PasswordBearer(tokenUrl="signup")

@app.post("/signup")
def signup(user:UserCreate,db:Session = Depends(get_db)):
    email_exist = db.query(User).filter(User.email == user.email).first()
    name_exist = db.query(User).filter(User.username == user.username).first()
    if email_exist :
        raise HTTPException(
            status_code= 400,
            detail= "Email already registered"
        )
    elif name_exist :
        raise HTTPException(
            status_code= 400,
            detail= "username already registered"
            )
    new_user = User(
        first_name = user.first_name,
        last_name = user.last_name,
        username = user.username,
        email = user.email,
        password_hash = password_context.hash(user.password)
    )

    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return "user registerd successfully"
    except Exception:
        db.rollback()
        raise
