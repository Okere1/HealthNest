# Backend Architecture

## Overview

HealthNest is built using a **feature-based modular architecture** with clear separation of concerns.

The architecture is designed to produce a backend that is:

- Scalable
- Maintainable
- Testable
- Secure
- Easy to understand
- Easy to extend

Rather than placing all controllers together, all services together, and all models together, each business feature owns its complete implementation.

This keeps related code together and minimizes coupling between different parts of the application.

---

# High-Level Architecture

```text
                Client
                   │
                   ▼
        HTTP Request (REST API)
                   │
                   ▼
              Express Server
                   │
                   ▼
        Global Middleware Layer
                   │
                   ▼
           Route Registration
                   │
                   ▼
             Route Middleware
        (Validation / Auth)
                   │
                   ▼
              Controller
                   │
                   ▼
               Service
                   │
                   ▼
          MongoDB (Mongoose)
                   │
                   ▼
             Response Mapper
                   │
                   ▼
          Standard API Response
                   │
                   ▼
             HTTP Response
```

---

# Request Lifecycle

Every incoming request follows the same processing pipeline.

```text
Incoming Request

↓

Helmet

↓

CORS

↓

Compression

↓

Morgan Logger

↓

Body Parser

↓

Route

↓

Validation

↓

Authentication (if required)

↓

Controller

↓

Service

↓

Database

↓

Mapper

↓

ApiResponse

↓

Client
```

This standardized flow ensures every endpoint behaves consistently.

---

# Application Entry Point

The application starts in:

```text
src/server.js
```

Responsibilities:

- Load environment variables
- Connect to MongoDB
- Start the Express server
- Handle startup failures
- Log application startup

---

# Express Application

The Express application is created in:

```text
src/app.js
```

Responsibilities include:

- Register global middleware
- Configure security middleware
- Configure request parsing
- Register routes
- Handle unknown routes
- Register the global error handler

The Express application itself contains no business logic.

---

# Global Middleware Layer

Global middleware executes before any route-specific logic.

Current middleware includes:

## Helmet

Adds secure HTTP headers.

Protects against common web vulnerabilities.

---

## CORS

Controls which clients are allowed to communicate with the API.

Configured using environment variables.

---

## Compression

Compresses HTTP responses to reduce payload size and improve performance.

---

## Morgan

Logs every HTTP request.

Morgan has been integrated with Winston so all application logs use a single logging system.

---

## JSON Parser

Parses incoming JSON request bodies.

---

## URL Encoded Parser

Supports HTML form submissions.

---

# Routing Layer

Routes define the available API endpoints.

Example:

```text
POST /api/v1/auth/login

↓

auth.routes.js
```

Routes are responsible for:

- URL definition
- HTTP methods
- Middleware registration

Routes do not contain business logic.

---

# Validation Layer

Incoming requests are validated before reaching controllers.

HealthNest uses **Joi** for schema validation.

Example:

```text
Client Request

↓

Joi Validation

↓

Valid

↓

Controller
```

Invalid requests never reach business logic.

Instead, they immediately return a standardized validation response.

---

# Authentication Layer

Protected endpoints use JWT authentication.

Authentication middleware performs the following steps:

1. Read Authorization header.
2. Validate Bearer format.
3. Verify JWT signature.
4. Decode token.
5. Load authenticated user.
6. Attach user to the request object.
7. Continue request processing.

After authentication:

```javascript
req.user;
```

contains the authenticated user's information.

---

# Controller Layer

Controllers are intentionally thin.

Responsibilities include:

- Receive validated requests
- Call service methods
- Return standardized responses
- Forward errors to the global error handler

Controllers should not contain business rules.

Example:

```text
Request

↓

Controller

↓

Service

↓

Response
```

---

# Service Layer

The service layer contains the application's business logic.

Examples include:

- Registering users
- Authenticating users
- Scheduling medications
- Creating appointments
- Sending reminders

Services are responsible for:

- Business rules
- Database interaction
- External service integration
- Security operations
- Data processing

The service layer is the heart of the application.

---

# Database Layer

HealthNest uses MongoDB with Mongoose.

Responsibilities include:

- Data persistence
- Schema enforcement
- Validation
- Indexing
- Relationships

Business logic remains outside the model whenever possible.

---

# Mapper Layer

Database documents are not returned directly to clients.

Instead:

```text
MongoDB Document

↓

Mapper

↓

API DTO

↓

Client
```

Benefits include:

- Hide passwords
- Hide refresh tokens
- Hide internal IDs if desired
- Control API contracts
- Simplify frontend integration

---

# Response Layer

All successful responses use the ApiResponse utility.

Example response:

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {},
  "errors": null,
  "meta": null,
  "timestamp": "2026-07-20T12:00:00Z"
}
```

Every endpoint follows the same structure.

---

# Error Handling

Errors are never returned directly.

Instead:

```text
Service

↓

throw Error

↓

Controller

↓

next(error)

↓

Global Error Handler

↓

ApiResponse.failure()

↓

Client
```

Unexpected errors are logged through Winston.

Operational errors return meaningful client messages.

---

# Logging Architecture

HealthNest uses Winston as the centralized logging engine.

Sources of logs include:

- Application logs
- HTTP requests (Morgan)
- Database events
- Authentication events
- Startup events
- Unexpected errors

This provides a single, consistent logging strategy.

---

# Configuration Management

All configuration values are centralized.

No file outside the configuration layer should access:

```javascript
process.env;
```

Instead:

```javascript
const config = require("../config");
```

is used throughout the application.

Benefits include:

- Validation
- Type safety
- Centralized defaults
- Easier testing
- Cleaner code

---

# Security Architecture

Security is applied at multiple layers.

Current protections include:

- Helmet
- CORS
- Password hashing (bcrypt)
- JWT authentication
- Request validation
- Environment validation
- Secure configuration management

Additional protections planned:

- Rate limiting
- MongoDB query sanitization
- XSS protection
- Refresh token rotation
- Email verification

---

# Scalability Strategy

HealthNest is designed to grow without major architectural changes.

Future enhancements include:

- Repository pattern
- Dependency injection
- Background jobs
- Event-driven architecture
- Redis caching
- Message queues
- Microservices (if needed)

The current architecture provides a strong foundation while avoiding unnecessary complexity for the MVP.

---

# Design Principles

The backend follows these engineering principles:

- Separation of Concerns
- Single Responsibility Principle
- Feature-Based Organization
- Reusability
- Consistency
- Explicit Error Handling
- Defensive Programming
- Secure by Default
- Maintainability
- Readability

Every architectural decision aims to improve long-term maintainability rather than simply making the initial implementation faster.
