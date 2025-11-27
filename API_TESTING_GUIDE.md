# Quick API Testing Guide

## The Issue
You're getting "Route not found" because you're accessing `http://localhost:3000/` (root)
But the API endpoints are under `/api/` prefix.

## Correct URLs to Test

### 1. Health Check (Test if server is running)
```
GET http://localhost:3000/health
```

### 2. Register an Employee
```
POST http://localhost:3000/api/employees/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer",
  "password": "password123"
}
```

### 3. Login
```
POST http://localhost:3000/api/employees/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 4. Get All Employees
```
GET http://localhost:3000/api/employees
```

### 5. Get All Tasks
```
GET http://localhost:3000/api/tasks
```

## Quick Test in Browser

Open your browser and go to:
```
http://localhost:3000/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-28T..."
}
```

## Using curl (Command Line)

```bash
curl http://localhost:3000/health

curl -X POST http://localhost:3000/api/employees/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"role\":\"Developer\",\"password\":\"password123\"}"
```

## Available Routes

- `/health` - Health check
- `/api/employees/register` - Register employee
- `/api/employees/login` - Login
- `/api/employees` - Get all employees
- `/api/employees/:id` - Get single employee
- `/api/tasks` - Get all tasks (with filters)
- `/api/tasks/:id` - Get single task
- `/api/tasks` (POST) - Create task (requires auth)
- `/api/tasks/:id` (PUT) - Update task (requires auth)
- `/api/tasks/:id` (DELETE) - Delete task (requires auth)
