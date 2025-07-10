# User Registration System

A modern user registration system with a Django REST Framework backend and React + TypeScript frontend using Redux.

---

## Features

### Backend (Django REST Framework)
- Custom User model (username, unique email, first/last name, created/updated timestamps)
- RESTful API for user registration
- Password validation and confirmation
- Proper error handling and status codes
- CORS enabled for frontend communication
- Dockerized for easy deployment

### Fronend (React + TypeScript)
- Responsive, modern UI
- Real-time form validation and error feedback
- Redux Toolkit for state management
- Axios for API communication
- TypeScript for type safety
- Dockerized for production

---

## Prerequisites

- Python 3.8+
- Node.js 16+
- Docker and Docker Compose

## Installation & Setup

### Option 1: Local Development

#### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r reuqirements.txt
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Option 2: Docker
```bash
docker-compose up --build
```

## API Endpoints

### Singup
- **URL**: `POST /api/signup`
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "username": "John_doe",
    "email": "john@test.com",
    "password": "securepassword123",
    "confirm_password": "securepassword123",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@test.com",
      "first_name": "John",
      "last_name": "Doe",
      "created)_at": "2025-07-09T12:34:23Z"
    }
  }
  ```
