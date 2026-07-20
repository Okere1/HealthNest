# API Guide

## Overview

This document describes the REST API exposed by the HealthNest backend.

All endpoints follow a standardized request and response format to provide consistency across the application.

---

# Base URL

Development

```text
http://localhost:5000/api/v1
```

Production

```text
https://your-domain.com/api/v1
```

---

# Content Type

Unless otherwise stated:

```http
Content-Type: application/json
```

---

# Authentication

Protected endpoints require an access token.

Example:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

# Standard Response Format

Every successful response follows this structure.

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T10:30:00Z"
}
```

---

# Standard Error Format

```json
{
  "success": false,
  "message": "Validation failed.",
  "data": null,
  "errors": [],
  "meta": null,
  "timestamp": "2026-07-20T10:30:00Z"
}
```

---

# HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Success               |
| 201    | Resource Created      |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Resource Not Found    |
| 409    | Conflict              |
| 500    | Internal Server Error |

---

# Health Module

## Health Check

Returns the current API status.

### Endpoint

```http
GET /health
```

### Authentication

Not Required

### Request Body

None

### Success Response

```json
{
  "success": true,
  "message": "Personal Health Companion API is running",
  "data": {
    "status": "OK",
    "version": "v1",
    "environment": "development"
  },
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T10:30:00Z"
}
```

---

# Users Module

## Register User

Creates a new user account.

### Endpoint

```http
POST /users/register
```

### Authentication

Not Required

### Request Body

```json
{
  "firstName": "Promise",
  "lastName": "Okere",
  "email": "promise@test.com",
  "password": "Password123!"
}
```

---

### Validation Rules

| Field     | Required | Notes                        |
| --------- | -------- | ---------------------------- |
| firstName | Yes      | String                       |
| lastName  | Yes      | String                       |
| email     | Yes      | Valid email address          |
| password  | Yes      | Must satisfy password policy |

---

### Success Response

```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "id": "6a5d4591942547e95ce5e617",
    "firstName": "Promise",
    "lastName": "Okere",
    "email": "promise@test.com",
    "status": "ACTIVE",
    "createdAt": "2026-07-20T10:30:00Z"
  },
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T10:30:00Z"
}
```

---

### Possible Errors

#### Validation Failed

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "message": "Email is required."
    }
  ]
}
```

---

#### Email Already Exists

```json
{
  "success": false,
  "message": "An account with this email already exists."
}
```

---

# Authentication Module

## Login

Authenticates a user.

### Endpoint

```http
POST /auth/login
```

### Authentication

Not Required

### Request Body

```json
{
  "email": "promise@test.com",
  "password": "Password123!"
}
```

---

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "6a5d4591942547e95ce5e617",
      "firstName": "Promise",
      "lastName": "Okere",
      "email": "promise@test.com",
      "status": "ACTIVE",
      "createdAt": "2026-07-20T10:30:00Z"
    },
    "tokens": {
      "accessToken": "<JWT_ACCESS_TOKEN>",
      "refreshToken": "<JWT_REFRESH_TOKEN>",
      "tokenType": "Bearer",
      "expiresIn": "1d"
    }
  },
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T10:30:00Z"
}
```

---

### Possible Errors

#### Invalid Credentials

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

#### Validation Failed

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "password",
      "message": "Password is required."
    }
  ]
}
```

---

# Authentication Module

## Get Current User

Returns the currently authenticated user.

### Endpoint

```http
GET /auth/me
```

### Authentication

Required

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

### Success Response

```json
{
  "success": true,
  "message": "Authenticated user retrieved successfully.",
  "data": {
    "id": "6a5d4591942547e95ce5e617",
    "firstName": "Promise",
    "lastName": "Okere",
    "email": "promise@test.com",
    "status": "ACTIVE",
    "createdAt": "2026-07-20T10:30:00Z"
  },
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T10:30:00Z"
}
```

---

### Unauthorized

```json
{
  "success": false,
  "message": "Authorization header is required."
}
```

---

### Invalid Token

```json
{
  "success": false,
  "message": "Invalid or expired access token."
}
```

---

# Common Headers

| Header        | Required              |
| ------------- | --------------------- |
| Content-Type  | Yes                   |
| Authorization | Protected routes only |

---

# API Versioning

All endpoints are versioned.

Current version:

```text
/api/v1
```

Future versions will follow:

```text
/api/v2
/api/v3
```

This allows the backend to introduce breaking changes without affecting existing clients.

---

# Error Handling

All errors follow the same response format.

Typical client workflow:

```text
Request

↓

success == true ?

↓

Yes

↓

Use data

↓

No

↓

Display message

↓

Handle errors if available
```

Frontend applications should always check the `success` property before processing the `data` object.

---

# Pagination

Current endpoints do not return paginated data.

Future list endpoints will include:

```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

# Future API Endpoints

The following endpoints are planned:

## Authentication

- POST /auth/refresh-token
- POST /auth/logout
- POST /auth/forgot-password
- POST /auth/reset-password
- POST /auth/change-password

---

## Users

- GET /users/profile
- PATCH /users/profile
- DELETE /users/profile

---

## Medications

- POST /medications
- GET /medications
- GET /medications/:id
- PATCH /medications/:id
- DELETE /medications/:id

---

## Appointments

- POST /appointments
- GET /appointments
- PATCH /appointments/:id
- DELETE /appointments/:id

---

## Health Tracker

- POST /health-records
- GET /health-records

---

## Notifications

- GET /notifications
- PATCH /notifications/:id/read

---

# API Design Principles

The HealthNest API follows these principles:

- RESTful resource naming
- Consistent response structure
- Predictable HTTP status codes
- Secure authentication
- Versioned endpoints
- Validation before business logic
- Centralized error handling
- Stable contracts for frontend integration

Maintaining these principles ensures that the API remains intuitive, scalable, and easy to integrate as the project evolves.
