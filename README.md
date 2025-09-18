# Notes Manager App (MERN)

## Setup

### Backend
1. cd backend
2. cp .env.example .env and fill values
3. npm install
4. npm run dev
   - Runs backend on PORT (default 5000)

### Frontend
1. cd frontend
2. npm install
3. create .env REACT_APP_API_URL=http://localhost:5000/api
4. npm start

## Features
- Register & Login (JWT)
- Create, Read, Update, Delete notes
- Admin can view all notes & users (optional)

## Admin 
- To use the admin feature, go to the MongoDB database, set the user role to admin, and then login.
