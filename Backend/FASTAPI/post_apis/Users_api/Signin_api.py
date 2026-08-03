from fastapi import FastAPI,HTTPException,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_,and_
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt,JWTError
from datetime import datetime,timedelta,timezone
from DATABASE.Tables.users_table import User
from FASTAPI.my_seceret_key import SECRET_KEY,ALGORITHM,TOKEN_EXPIRY_MIN
from DATABASE.database import get_db

app = FastAPI()


origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


password_context = CryptContext(schemes=["bcrypt"])

Oauth2_schemes = OAuth2PasswordBearer(tokenUrl="signin")

def Hash_pass(password:str):
    return password_context.hash(password)

def verify_pass(plain_password,hashed_password):
    return password_context.verify(plain_password,hashed_password)

def create_token(data:dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRY_MIN)

    to_encode.update({
        "exp" : expire
    })

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return token

@app.post("/signin")
def signin(form_data : OAuth2PasswordRequestForm = Depends(),db:Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user or not verify_pass(form_data.password,user.password_hash):
        raise HTTPException(
            status_code=400,
            detail="Invalid username or password "
        )
    ACCESS_TOKEN = create_token({"sub":form_data.username})
    return{
        "access_token" : ACCESS_TOKEN,
        "token_type" : "bearer"
    }


def verify_token(token:str = Depends(Oauth2_schemes)):
    try :
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None :
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )
        return username
    except jwt.JWTError:
            raise HTTPException(
                status_code= 401,
                detail="Invalid token"
            )

# Protected Route
@app.get("/protected")
def protected_route(username: str = Depends(verify_token)):
    return{
        "message" : f"Hello {username}, you have access to this protected route",
        "user" : username,
        "password" : "this is protected "
    }
        
