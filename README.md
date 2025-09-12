# Live Polling Backend

Backend service for creating polls, casting votes, and receiving real-time updates via Socket.IO.

---

## Setup

### Requirements
- Node.js >= 18
- Docker

### Install & Run
```bash
git clone <repo-url>
cd live-polling

# configure .env
Place the ".env.development" file at project root.

# setup
npm install
npm run prisma:generate

# run
docker compose -f docker-compose-dev.yaml up --build

---

# API Documentation

This document provides an overview of the available API endpoints, their purposes, and usage details.
```

## **Health Check**

### `GET /api/health/`

* **Description:**
  Simple health check endpoint to verify if the API is running.

* **Response (200 OK):**

```json
{
  "status": "success",
  "metadata": {
    "message": "API is working."
  },
  "data": {
    "uptime": "123s",
    "timestamp": "2025-09-12T14:00:00.000Z"
  }
}
```

---

## **Authentication**

Got it ✅ — here’s the cleaned-up `.md` file with only **request & response details** for each endpoint (no middlewares, controllers, or implementation details).

---

# API Documentation

This document describes the available API endpoints, their request formats, and example responses.

---

## **Base URL**

```
/api
```

---

## **Health Check**

### `GET /api/health/`

* **Description:** Check if the API is running.

#### Request

```http
GET /api/health/
```

#### Response (200 OK)

```json
{
  "status": "success",
  "metadata": {
    "message": "API is working."
  },
  "data": {
    "uptime": "123s",
    "timestamp": "2025-09-12T14:00:00.000Z"
  }
}
```

---

## **Authentication**

### `POST /api/v1/auth/signup`

* **Description:** Register a new user.

#### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Response (201 Created)

```json
{
    "metadata": {
        "message": "User creation successful."
    },
    "data": {
        "authToken": "<auth_token>"
    }
}
```

---

### `POST /api/v1/auth/signin`

* **Description:** Authenticate a user and return tokens.

#### Request

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Response (200 OK)

```json
{
    "metadata": {
        "message": "User sign-in successful."
    },
    "data": {
        "authToken": "<auth_token>"
    }
}
```

---

### `POST /api/v1/auth/token/refresh`

* **Description:** Refresh authentication tokens.

#### Request (with Authorization header)

```http
POST /api/v1/auth/token/refresh
Authorization: Bearer <refresh-token>
```

#### Response (200 OK)

```json
{
    "metadata": {
      "message": "Refresh token creation successful."
    },
    "data": {
      "authToken": "<auth_token>"
    }
}
```

---

## **Polls**

### `POST /api/v1/polls/`

* **Description:** Create a new poll.

#### Request

```json
{
  "text": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Go", "Rust"]
}
```

#### Response (201 Created)

---

### `GET /api/v1/polls/`

* **Description:** Get all polls for the authenticated user.

#### Request

```http
GET /api/v1/polls/
Authorization: Bearer <access-token>
```

#### Response (200 OK)

```json
{
  "status": "success",
  "data": [
    {
      "pollId": "abc123",
      "question": "What is your favorite programming language?",
      "options": [
        { "optionId": "opt1", "text": "JavaScript", "votes": 10 },
        { "optionId": "opt2", "text": "Python", "votes": 15 },
        { "optionId": "opt3", "text": "Go", "votes": 5 },
        { "optionId": "opt4", "text": "Rust", "votes": 2 }
      ]
    }
  ],
  "metadata": {
    "message": "Polls fetched successfully."
  }
}
```

---

### `POST /api/v1/polls/:pollId/options/:optionId/votes`

* **Description:** Cast a vote for a specific poll option.

#### Request

```http
POST /api/v1/polls/abc123/options/opt2/votes
Authorization: Bearer <access-token>
```

#### Response (200 OK)

---
