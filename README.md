# 📝 React Notes App

A full-stack Notes application built with the **MERN stack** (MongoDB, Express, React, Node.js). It features full **CRUD operations**, **JWT authentication**, and a clean UI for managing personal notes using interactive visual cards.

---

## 🚀 Tech Stack

- **Frontend**: [React](https://react.dev/), [Chakra UI](https://chakra-ui.com/), Redux, Axios
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
- **Authentication**: [bcrypt](https://www.npmjs.com/package/bcrypt), [JWT](https://jwt.io/)
- **Deployment**: Backend on [Cyclic](https://www.cyclic.sh/), Frontend on [Vercel](https://vercel.com/)

---

## 🔐 Features

- JWT-based user authentication
- Password encryption with bcrypt
- Protected routes for note operations
- Notes displayed as visual cards with update/delete actions
- Responsive UI with Chakra UI components
- Redux state management for user and note actions

---

## 🧠 Backend Overview

### 🔧 General
- Built with Express and Mongoose
- Express routers handle user and note operations
- MongoDB connection managed via Mongoose

### 🔐 Authentication
- HTTP `POST` used for sign-up and login
- Passwords are hashed using bcrypt before storing
- Email uniqueness check on registration
- JWT tokens issued on login with 1-day expiration
- Token required in headers for all note operations

### 📄 Database Models

- **User Model**
  - `username`, `email`, `password` (hashed)
- **Note Model**
  - `title`, `body`, `userId`

### 📝 API Endpoints

| Operation       | Method | Endpoint           | Auth | Description                        |
|----------------|--------|--------------------|------|------------------------------------|
| Create Note     | POST   | `/api/notes`       | ✅   | Creates a new note                 |
| Get Notes       | GET    | `/api/notes`       | ✅   | Retrieves all notes for a user     |
| Update Note     | PATCH  | `/api/notes/:id`   | ✅   | Updates a note by ID               |
| Delete Note     | DELETE | `/api/notes/:id`   | ✅   | Deletes a note by ID               |

---

## 💻 Frontend Overview

### 📄 Pages

- **Home**: Links to Log In and Sign Up
- **Sign Up**: User registration form
- **Login**: User login form
- **Notes**: Private page to create/manage notes

### 🧩 Components

- Navigation Bar
- Note Cards (with Update/Delete)
- Modal Dialogs for Create/Update
- Buttons, Menus, Avatars

### 🔁 State Management

- **Redux** with `redux-thunk` for async actions
- `User Redux`:
  - States: Initial, Loading, Success, Error, Logout
- `Note Redux`:
  - States: Get, Create, Update, Delete (each with loading/success/error)
- `useSelector()` and `useDispatch()` used for accessing and updating state

### 🛡️ Private Routing

- Notes page is protected using private routes
- Access granted only if user is authenticated (checked via Redux state)

---

## 🧪 Functional Highlights

- **useState()** to manage form inputs
- **useEffect()** to fetch notes on mount
- **useDisclosure()** to manage modals
- **Axios** for HTTP requests to backend
- All user actions update Redux state and UI accordingly

---

## 🌐 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com/)
- **Backend API**: Deployed on [Cyclic](https://www.cyclic.sh/)

---
## 📌 Acknowledgements

This project is adapted from [Arun Opal’s React Notes App](https://github.com/arunopal/react-notes-app), originally developed as an open-source notes application using React.
Significant modifications and enhancements have been made to suit personalized requirements, including structural changes, UI improvements, and added features.
Credit goes to the original author for the foundational work and architecture.

---

## 📸 Screenshots

Loading...

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📬 Contact

For any questions or feedback, feel free to reach out!

