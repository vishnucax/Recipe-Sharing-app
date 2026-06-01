# Recipe Sharing Platform

A full-stack Recipe Sharing Platform built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

This project was developed as part of a Full Stack Machine Evaluation. Users can register, log in securely, create recipes, view recipes, and update their own recipes. The application also integrates with TheMealDB API to display recipe images based on recipe titles.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

### Recipe Management
- Create New Recipe
- View All Recipes
- View Single Recipe
- Update Existing Recipe
- Only Recipe Owner Can Edit

### External API Integration
- Fetch Recipe Images from TheMealDB API
- Default Image Fallback
- Error Handling for API Failures

### Frontend
- React.js
- React Hooks (useState, useEffect)
- React Router DOM
- Axios
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing

---

## Tech Stack

### Frontend
- React.js
- Bootstrap 5
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt

### External API
- TheMealDB API

---

## Project Structure

```text
recipe-sharing-app/

├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json

└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/vishnucax/Recipe-Sharing-app.git
cd Recipe-Sharing-app
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

Open a new terminal and navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm start
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

---

### Recipes

#### Create Recipe

```http
POST /api/recipes
```

Requires JWT Token

#### Get All Recipes

```http
GET /api/recipes
```

#### Get Single Recipe

```http
GET /api/recipes/:id
```

#### Update Recipe

```http
PUT /api/recipes/:id
```

Only the recipe owner can update the recipe.

---

## Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed using bcrypt before storing in MongoDB.
3. User logs in.
4. Server generates a JWT token.
5. Token is sent to the frontend.
6. Frontend stores token in localStorage.
7. Token is included in protected API requests.
8. Backend verifies the token before allowing access.



---

## Author

**Vishnu K**

MCA Student

