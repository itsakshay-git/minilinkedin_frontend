# Frontend - LinkedIn Clone (React)

This is the frontend for a LinkedIn-like social platform built using React, React Router, and Axios. It connects to a Node.js + Express + MongoDB backend to support user authentication, posting, profiles, and feed functionality.

## live link
https://musical-croquembouche-a7696c.netlify.app/

## 🚀 Features

- User authentication (login/register)
- Create and view posts
- View profile and suggested users
- Responsive layout similar to LinkedIn
- Persistent user session with token handling
- Profile picture support with default avatar fallback

## 📁 Folder Structure

```
src/
├── assets/ # Static assets like images
├── components/ # Reusable components (Navbar, PostCard, etc.)
├── hooks/ # Custom React hooks
├── pages/ # Main page components (Home, Login, Profile, etc.)
├── api/axios.js # Axios instance with baseURL and auth token
└── App.jsx # Main App component with routes
```

## 🛠️ Tech Stack

- React
- React Router DOM
- Tailwind CSS
- Axios

## 📦 Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd frontend

   ```

2. Install dependencies:

```
npm install
Update Axios baseURL in src/api/axios.js:
```

```
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if backend is hosted elsewhere
});
Start the frontend:
npm start
```

3. Environment Variables
   You can optionally add a .env file if needed:

```
REACT_APP_API_URL=http://localhost:5000/api
```
