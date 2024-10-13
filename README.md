
# Assignment Submission Portal

## Overview

This is a backend system built using Node.js, Express.js, and MongoDB to allow users to upload assignments and allow admins to review and either accept or reject those assignments. The system supports user and admin roles with specific endpoints for managing user registration, authentication, and assignment workflow.

---

## Features

- **User and Admin Roles**: 
  - Users can register, log in, and upload assignments.
  - Admins can register, log in, view tagged assignments, and accept/reject them.
  
- **Authentication**: 
  - User and admin login sessions are protected using JWT (JSON Web Tokens).
  
- **Assignment Workflow**: 
  - Users can upload assignments by selecting an admin to whom the assignment is tagged.
  - Admins can view all assignments tagged to them and either accept or reject the submissions.

---

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing users and assignments.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **bcrypt.js**: Library to hash passwords.
- **jsonwebtoken**: JWT for handling authentication.
- **dotenv**: To manage environment variables.

---

## Project Structure

```bash
assignment-submission-portal
│
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   └── userController.js      # User-related logic (register, login, upload assignment)
│   └── adminController.js     # Admin-related logic (register, login, view/accept/reject assignments)
├── models/
│   └── userModel.js           # User schema (for both users and admins)
│   └── assignmentModel.js     # Assignment schema
├── routes/
│   └── userRoutes.js          # Routes for users (register, login, upload, fetch admins)
│   └── adminRoutes.js         # Routes for admins (register, login, manage assignments)
├── middleware/
│   └── auth.js                # Middleware to protect routes with JWT
├── .env                       # Environment variables (ignored in version control)
├── app.js                     # Main application entry point
└── package.json               # Node.js project metadata and scripts
```

---

## API Endpoints

### **User Endpoints**:

1. **Register** - `POST /api/users/register`
   - Registers a new user with `username` and `password`.
   - Example Request:
     ```json
     {
       "username": "Aditi",
       "password": "mypassword"
     }
     ```
   
2. **Login** - `POST /api/users/login`
   - Logs in a user with `username` and `password`.
   - Returns a JWT token for authentication.
   - Example Request:
     ```json
     {
       "username": "Aditi",
       "password": "mypassword"
     }
     ```

3. **Upload Assignment** - `POST /api/users/upload`
   - Uploads a new assignment, tagging an admin.
   - Requires a valid JWT token in the Authorization header.
   - Example Request:
     ```json
     {
       "task": "Hello World",
       "adminId": "606d1f5b622e0b001545a785"
     }
     ```

4. **Fetch Admins** - `GET /api/users/admins`
   - Fetches the list of all admins (so users can choose which admin to tag in the assignment).
   - Requires a valid JWT token in the Authorization header.

---

### **Admin Endpoints**:

1. **Register** - `POST /api/admins/register`
   - Registers a new admin with `username` and `password`.
   - Example Request:
     ```json
     {
       "username": "Satvik",
       "password": "mypassword"
     }
     ```

2. **Login** - `POST /api/admins/login`
   - Logs in an admin with `username` and `password`.
   - Returns a JWT token for authentication.
   - Example Request:
     ```json
     {
       "username": "Satvik",
       "password": "mypassword"
     }
     ```

3. **View Assignments** - `GET /api/admins/assignments`
   - Retrieves assignments tagged to the logged-in admin.
   - Requires a valid JWT token in the Authorization header.

4. **Accept Assignment** - `POST /api/admins/assignments/:id/accept`
   - Accepts an assignment by its ID.
   - Requires a valid JWT token in the Authorization header.

5. **Reject Assignment** - `POST /api/admins/assignments/:id/reject`
   - Rejects an assignment by its ID.
   - Requires a valid JWT token in the Authorization header.

---

## Environment Variables

You need to create a `.env` file in the root directory of your project with the following content:

```bash
MONGO_URI=mongodb://localhost:27017/assignment-portal
JWT_SECRET=your_jwt_secret_key
```

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for signing JWT tokens.

---

## Installation & Running Locally

### **Step 1: Clone the repository**
```bash
git clone https://github.com/your-username/assignment-submission-portal.git
cd assignment-submission-portal
```

### **Step 2: Install dependencies**
```bash
npm install
```

### **Step 3: Set up the environment variables**
Create a `.env` file in the root directory and add the following:

```bash
MONGO_URI=mongodb://localhost:27017/assignment-portal
JWT_SECRET=your_jwt_secret_key
```

### **Step 4: Run the server**
```bash
npm start
```

### **Step 5: Access the API**
The server will run on `http://localhost:5000`. You can now make requests to the available endpoints using Postman or cURL.

---

## Usage Example

### Register a User:
```bash
POST /api/users/register
{
  "username": "Aditi",
  "password": "mypassword"
}
```

### User Login:
```bash
POST /api/users/login
{
  "username": "Aditi",
  "password": "mypassword"
}
```

### Upload an Assignment:
```bash
POST /api/users/upload
Authorization: Bearer <your-jwt-token>
{
  "task": "Hello World",
  "adminId": "606d1f5b622e0b001545a785"
}
```

---

## Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server with `nodemon` for development (if `nodemon` is installed).

---

## Contributing

Feel free to open issues or submit pull requests for improvements or fixes.
```

---
