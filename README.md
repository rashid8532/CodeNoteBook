# Code Notebook

A full-stack online code editor built with **React**, **FastAPI**, and **PostgreSQL**.

This project is being developed as an internship project and aims to provide a modern coding environment where users can create projects, manage files and folders, write code in multiple programming languages, execute code, and securely store their work.

---

# Tech Stack

## Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Monaco Editor
- React Icons

## Backend
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- JWT Authentication
- OAuth2
- Passlib (Password Hashing)
- Python-JOSE

## Database
- PostgreSQL

## Tools
- Git
- GitHub
- Postman
- pgAdmin
- VS Code

---

# Features

## Authentication

- User Registration
- User Login
- JWT Access Token
- Refresh Token
- Password Hashing
- Logout
- Protected Routes

---

## Project Management

- Create Project
- Rename Project
- Delete Project
- List User Projects

---

## Folder Management

- Create Folder
- Rename Folder
- Delete Folder
- Nested Folders

---

## File Management

- Create File
- Rename File
- Delete File
- Open File
- Save File
- Store Files in Database

---

## Code Editor

- Monaco Editor
- Syntax Highlighting
- Multiple Language Support
- Auto Save
- Dark Theme
- Light Theme
- Font Size Settings

---

## Code Execution

- Run Code
- Display Output
- Display Errors

---

## User Settings

- Theme
- Font Size
- Tab Size
- Word Wrap
- Auto Save

---

# Supported Languages

- Python (.py)
- JavaScript (.js)
- Java (.java)
- C (.c)
- C++ (.cpp)
- Go (.go)
- PHP (.php)

---

# Database Tables

- Users
- Projects
- Folders
- Files
- Languages
- Refresh Tokens
- Editor Settings

---

# Project Structure

```
CodeNotebook/

│
├── backend/
│
├── frontend/
│
├── docs/
│
├── README.md
│
└── .gitignore
```

---

# Frontend Structure

```
frontend/

src/

├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── services/
├── styles/
├── utils/
│
├── App.jsx
└── main.jsx
```

---

# Backend Structure

```
backend/

app/

├── auth/
├── core/
├── crud/
├── database/
├── models/
├── routers/
├── schemas/
├── services/
├── utils/
│
├── config.py
├── dependencies.py
└── main.py
```

---

# Backend Dependencies

```bash
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install psycopg2-binary
pip install python-jose[cryptography]
pip install passlib[bcrypt]
pip install python-multipart
pip install alembic
pip install python-dotenv
pip install pydantic-settings
```

Or

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose[cryptography] passlib[bcrypt] python-multipart alembic python-dotenv pydantic-settings
```

---

# Frontend Dependencies

Create the project

```bash
npm create vite@latest frontend
```

Install packages

```bash
npm install
npm install react-router-dom
npm install axios
npm install react-icons
npm install @monaco-editor/react
npm install tailwindcss @tailwindcss/vite
```

---

# API Modules

## Authentication

```
POST   /register
POST   /login
POST   /refresh
POST   /logout
```

## Projects

```
GET    /projects
POST   /projects
PUT    /projects/{id}
DELETE /projects/{id}
```

## Folders

```
POST   /folders
GET    /folders/{id}
PUT    /folders/{id}
DELETE /folders/{id}
```

## Files

```
POST   /files
GET    /files/{id}
PUT    /files/{id}
DELETE /files/{id}
```

## Code Runner

```
POST   /run
```

## Editor Settings

```
GET    /settings
PUT    /settings
```

---

# Database Schema

```
Users
    │
    ├──────── Projects
    │              │
    │              └──────── Folders
    │                          │
    │                          └──────── Files
    │                                       │
    │                                       └──────── Languages
    │
    ├──────── Refresh Tokens
    │
    └──────── Editor Settings
```

---

# Development Roadmap

## Phase 1
- Project Planning
- Requirement Analysis
- UI Design
- ER Diagram
- Database Design

## Phase 2
- FastAPI Setup
- PostgreSQL Setup
- SQLAlchemy Models
- Authentication
- JWT
- CRUD APIs

## Phase 3
- React Setup
- Routing
- UI Components
- Dashboard
- Monaco Editor

## Phase 4
- Connect Frontend with Backend
- Axios Integration
- Authentication Flow

## Phase 5
- Code Execution
- Auto Save
- Theme Settings
- Testing

## Phase 6
- Deployment
- Bug Fixes
- Documentation

---

# Future Improvements

- Google Login
- GitHub Login
- Version History
- File Sharing
- Real-time Collaboration
- Git Integration
- AI Code Suggestions
- Docker Support
- Deploy Projects
- Keyboard Shortcuts

---

# Author

**Rashid Anwar Usmani**

Internship Project - Code Notebook
