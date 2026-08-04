from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from FASTAPI.post_apis.Users_api.auth.Signin_api import router as signin_router
from FASTAPI.post_apis.Users_api.auth.Signup_api import router as signup_router
from FASTAPI.post_apis.Projects_api.new_project import router as new_project_router

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

app.include_router(signin_router)
app.include_router(signup_router)
app.include_router(new_project_router)