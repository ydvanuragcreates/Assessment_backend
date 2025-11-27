# Task Management API

A production-ready RESTful API for managing tasks and employees with JWT authentication.

## Features

- Employee registration and authentication (JWT)
- CRUD operations for tasks
- Filter tasks by status, employee, or priority
- One-to-Many relationship (Employee → Tasks)
- Input validation and error handling
- Request logging
- Clean architecture with separation of concerns

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas (cloud)
2. Start MongoDB service:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

3. The database will be created automatically when you start the server

## Running the Application

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Screenshots

### Get All Tasks
![Get All Tasks](./screenshots/get-all-tasks.png)

### Filter Tasks by Status
![Filter Tasks](./screenshots/filter-tasks.png)

### Bearer Token Authentication
![Bearer Auth](./screenshots/bearer-auth.png)

## API Endpoints

### Health Check
- `GET /health` - Check if server is running

### Employee Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/employees/register` | Public | Register new employee |
| POST | `/api/employees/login` | Public | Login employee |
| GET | `/api/employees` | Public | Get all employees |
| GET | `/api/employees/:id` | Public | Get single employee with tasks |

### Task Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/tasks` | Public | Get all tasks (with filters) |
| GET | `/api/tasks/:id` | Public | Get single task |
| POST | `/api/tasks` | Private | Create new task |
| PUT | `/api/tasks/:id` | Private | Update task |
| DELETE | `/api/tasks/:id` | Private | Delete task |

### Query Parameters for GET /api/tasks

- `status` - Filter by status (Pending, In Progress, Completed, Cancelled)
- `employee` - Filter by employee ID
- `priority` - Filter by priority (Low, Medium, High, Critical)

Example: `/api/tasks?status=Pending&priority=High`

## Request Examples

### 1. Register Employee

```bash
POST /api/employees/register
Content-Type: application/json

{
  "name": "Anurag Yadav",
  "email": "anurag@example.com",
  "role": "Developer",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Employee registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Anurag Yadav",
    "email": "anurag@example.com",
    "role": "Developer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login Employee

```bash
POST /api/employees/login
Content-Type: application/json

{
  "email": "anurag@example.com",
  "password": "password123"
}
```

### 3. Create Task (Requires Authentication)

```bash
POST /api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Implement user authentication",
  "description": "Add JWT-based authentication to the API",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2025-12-31",
  "employee": "507f1f77bcf86cd799439011"
}
```

### 4. Get All Tasks

```bash
GET /api/tasks
```

### 5. Filter Tasks by Status

```bash
GET /api/tasks?status=Pending
```

### 6. Update Task (Requires Authentication)

```bash
PUT /api/tasks/507f1f77bcf86cd799439012
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "status": "Completed"
}
```

## Database Schema

### Employee Collection

```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, unique, valid email),
  role: String (required, enum: Admin|Manager|Developer|Designer|QA),
  password: String (required, hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection

```javascript
{
  _id: ObjectId,
  title: String (required, 3-200 chars),
  description: String (required, max 1000 chars),
  status: String (enum: Pending|In Progress|Completed|Cancelled, default: Pending),
  priority: String (enum: Low|Medium|High|Critical, default: Medium),
  dueDate: Date (optional, must be future date),
  employee: ObjectId (required, ref: Employee),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is returned when you register or login. It expires after 30 days.

## Project Structure

```
task-management-api/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Employee.js          # Employee schema
│   │   └── Task.js              # Task schema
│   ├── controllers/
│   │   ├── employeeController.js # Employee business logic
│   │   └── taskController.js     # Task business logic
│   ├── routes/
│   │   ├── employeeRoutes.js    # Employee endpoints
│   │   └── taskRoutes.js        # Task endpoints
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Global error handler
│   │   └── logger.js            # Request logging
│   ├── validators/
│   │   ├── employeeValidator.js # Employee input validation
│   │   └── taskValidator.js     # Task input validation
│   └── server.js                # Application entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Key Features Implemented

### 1. Clean API Design
- RESTful conventions
- Consistent response format
- Proper HTTP methods and status codes
- Clear endpoint naming

### 2. Code Quality
- Modular architecture (MVC pattern)
- Separation of concerns
- DRY principles
- Comprehensive error handling
- Input validation on all routes

### 3. Database Normalization
- Proper One-to-Many relationship
- Indexed fields for performance
- Virtual population for related data
- Data integrity constraints

### 4. Documentation
- Complete API documentation
- Setup instructions
- Request/response examples
- Schema definitions

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Protected routes for modifications
- Environment variable configuration

## Development Notes

- Viewing tasks is public (no authentication required)
- Creating, updating, and deleting tasks requires authentication
- Employee passwords are hashed before storage
- Duplicate email addresses are prevented
- All dates are validated
- Request logging is enabled for debugging
