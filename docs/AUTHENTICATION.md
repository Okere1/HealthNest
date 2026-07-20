# Authentication Guide

## Overview

HealthNest uses **JSON Web Token (JWT)** authentication to secure protected API endpoints.

The authentication system is designed to provide:

- Secure user authentication
- Stateless API requests
- Refresh token support
- Password hashing
- Scalable authorization
- Consistent API responses

The current implementation supports user registration, login, access token authentication, and refresh token management. Additional features such as email verification, password reset, and refresh token rotation are planned for future releases.

---

# Authentication Flow

```text
                Register
                    │
                    ▼
           User Account Created
                    │
                    ▼
                 Login
                    │
                    ▼
         Validate Credentials
                    │
                    ▼
        Generate JWT Tokens
                    │
                    ▼
    Store Refresh Token Hash
                    │
                    ▼
     Return Tokens to Client
                    │
                    ▼
   Client Stores Tokens Securely
                    │
                    ▼
Protected API Request (Bearer Token)
                    │
                    ▼
        Authentication Middleware
                    │
                    ▼
          Verify Access Token
                    │
                    ▼
           Attach req.user
                    │
                    ▼
             Controller
```

---

# Authentication Components

The authentication feature consists of the following files:

```text
modules/
└── auth/
    ├── auth.routes.js
    ├── auth.controller.js
    ├── auth.service.js
    ├── auth.validation.js
    ├── auth.mapper.js
    ├── auth.constants.js
    └── index.js
```

Shared authentication utilities are located in:

```text
common/
├── auth/
│   └── jwt.js
├── security/
│   └── password.js
└── middlewares/
    └── authenticate.js
```

---

# User Registration

## Endpoint

```http
POST /api/v1/users/register
```

## Request Body

```json
{
  "firstName": "Promise",
  "lastName": "Okere",
  "email": "promise@test.com",
  "password": "Password123!"
}
```

## Success Response

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
    "createdAt": "2026-07-20T12:00:00Z"
  },
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T12:00:00Z"
}
```

---

# User Login

## Endpoint

```http
POST /api/v1/auth/login
```

## Request Body

```json
{
  "email": "promise@test.com",
  "password": "Password123!"
}
```

---

# Successful Login Response

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
      "createdAt": "2026-07-20T12:00:00Z"
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
  "timestamp": "2026-07-20T12:00:00Z"
}
```

---

# JWT Payload

The access token currently contains the following claims:

```json
{
  "sub": "6a5d4591942547e95ce5e617",
  "type": "access",
  "iat": 1784530744,
  "exp": 1784617144
}
```

Where:

| Claim | Description                      |
| ----- | -------------------------------- |
| sub   | User ID                          |
| type  | Token type (`access`)            |
| iat   | Issued At (Unix timestamp)       |
| exp   | Expiration Time (Unix timestamp) |

The refresh token contains:

```json
{
  "sub": "<USER_ID>",
  "type": "refresh",
  "iat": "...",
  "exp": "..."
}
```

---

# Password Security

Passwords are never stored in plain text.

HealthNest uses:

- bcrypt
- Configurable salt rounds
- One-way hashing

Password verification is performed using bcrypt's comparison function.

---

# Protected Routes

Protected endpoints require an access token.

Example:

```http
GET /api/v1/auth/me
```

Request Header:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

# Authentication Middleware

The authentication middleware performs the following steps:

1. Verify the Authorization header exists.
2. Ensure the header uses the `Bearer` scheme.
3. Verify the JWT signature.
4. Validate token expiration.
5. Extract the user ID.
6. Retrieve the user from the database.
7. Attach the authenticated user to `req.user`.
8. Continue processing the request.

If any step fails, a standardized `401 Unauthorized` response is returned.

---

# Request Context

After successful authentication:

```javascript
req.user;
```

contains the authenticated user's information.

Example:

```javascript
req.user = {
  _id: "...",
  email: "...",
  status: "ACTIVE",
};
```

Controllers should use `req.user` rather than trusting client-provided user identifiers.

---

# Refresh Tokens

HealthNest issues two JWTs:

| Token         | Purpose                   |
| ------------- | ------------------------- |
| Access Token  | Authenticate API requests |
| Refresh Token | Obtain new access tokens  |

Refresh tokens are not stored directly in the database.

Instead:

```text
Refresh Token

↓

Hash (bcrypt)

↓

Database
```

This protects users if the database is compromised.

---

# Token Expiration

Current configuration:

| Token         | Expiration |
| ------------- | ---------- |
| Access Token  | 1 Day      |
| Refresh Token | 7 Days     |

Values are configurable through environment variables.

---

# Logout Strategy

Current implementation:

- Refresh token hash stored in the database.

Future implementation:

```text
Logout

↓

Remove Refresh Token Hash

↓

Token Invalidated
```

This prevents future refresh requests using old tokens.

---

# Error Responses

## Invalid Credentials

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Missing Authorization Header

```json
{
  "success": false,
  "message": "Authorization header is required."
}
```

---

## Invalid Token

```json
{
  "success": false,
  "message": "Invalid or expired access token."
}
```

---

## Validation Error

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

# Frontend Responsibilities

The frontend application is responsible for:

- Calling the authentication endpoints.
- Securely storing tokens.
- Including the access token in protected requests.
- Detecting expired tokens.
- Refreshing tokens when required.
- Clearing stored tokens on logout.
- Redirecting unauthenticated users to the login screen.

---

# Current Authentication Features

Implemented:

- User registration
- User login
- Password hashing
- JWT access tokens
- JWT refresh tokens
- Protected routes
- Authentication middleware
- Standardized authentication responses

---

# Planned Enhancements

The authentication system will be expanded with:

- Refresh token endpoint
- Token rotation
- Logout endpoint
- Email verification
- Forgot password
- Password reset
- Change password
- Account lockout after repeated failed logins
- Multi-factor authentication (optional)
- Session management
- Device tracking

---

# Security Considerations

To maintain a secure authentication system:

- Never expose passwords.
- Never log JWTs or passwords.
- Store refresh tokens securely.
- Hash refresh tokens before persistence.
- Use HTTPS in production.
- Rotate secrets when necessary.
- Keep token lifetimes appropriate.
- Validate every incoming token.

Following these practices helps protect user accounts and reduces common authentication vulnerabilities.
