# CronApp ⌛

A simple Express-based API built with TypeScript that provides basic CRUD operations for managing cron jobs. This API allows you to create, read, update, and delete tasks that are scheduled to run at specified intervals. Each task can be scheduled with different time intervals and will log all request details.

## Features 🤖

- **Create Tasks**: Schedule tasks with different intervals.
- **Read Tasks**: List all tasks or get details of a specific task.
- **Update Tasks**: Modify existing tasks and get updated information.
- **Delete Tasks**: Remove tasks from the schedule.
- **Logging**: Logs all request details including headers, body, and query parameters.

## Future features ⏭

- **Data base connection.**
- **Error handling and retrying.**
- **Authentication, users and roles.**

___
## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/lucasdellasala/cronapp.git
   cd cronapp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`.

___
## API Endpoints

### Create a Task

- **POST** `/api/tasks`
- **Request Body**:

  ```json
  {
    "url": "https://example.com/api",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "key": "value"
    },
    "schedule": "*/5 * * * *"
  }
  ```

- **Response**:

  ```json
  {
    "id": "uuid",
    "url": "https://example.com/api",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "key": "value"
    },
    "schedule": "*/5 * * * *"
  }
  ```

### List All Tasks

- **GET** `/api/tasks`
- **Response**:

  ```json
  [
    {
      "id": "uuid",
      "url": "https://example.com/api",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "key": "value"
      },
      "schedule": "*/5 * * * *"
    }
  ]
  ```

### Get Task Details

- **GET** `/api/tasks/:id`
- **Response**:

  ```json
  {
    "id": "uuid",
    "url": "https://example.com/api",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "key": "value"
    },
    "schedule": "*/5 * * * *"
  }
  ```

### Update a Task

- **PUT** `/api/tasks/:id`
- **Request Body**:

  ```json
  {
    "url": "https://example.com/api",
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "key": "new_value"
    },
    "schedule": "*/10 * * * *"
  }
  ```

- **Response**:

  ```json
  {
    "id": "uuid",
    "url": "https://example.com/api",
    "method": "PUT",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "key": "new_value"
    },
    "schedule": "*/10 * * * *"
  }
  ```

### Delete a Task

- **DELETE** `/api/tasks/:id`
- **Response**:

  ```json
  "Task deleted"
  ```

___
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
