# Project Structure

## Overview

HealthNest follows a **feature-based modular architecture**, where each business feature is organized into its own module.

This approach improves maintainability, scalability, and separation of concerns by grouping related files together instead of grouping files by type.

Unlike traditional MVC applications, every feature owns its routes, controllers, services, models, validation rules, constants, and supporting utilities.

---

# Project Directory Structure

```text
HealthNest/
│
├── docs/
├── logs/
├── src/
│   ├── common/
│   ├── config/
│   ├── database/
│   ├── modules/
│   ├── routes/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Source Directory

All application source code resides inside the `src` directory.

```text
src/
│
├── common/
├── config/
├── database/
├── modules/
├── routes/
├── app.js
└── server.js
```

---

# Directory Responsibilities

## common/

Contains reusable infrastructure shared across all modules.

Examples include:

- Authentication helpers
- API response utilities
- Custom error classes
- Middleware
- Validation helpers
- Constants

Business logic should **never** be placed here.

---

## config/

Contains application configuration.

Examples:

- Environment validation
- Winston logger
- Application configuration

No part of the application should access `process.env` directly outside this folder.

---

## database/

Responsible for establishing and managing the MongoDB connection.

Responsibilities include:

- Database connection
- Connection monitoring
- Future migrations
- Future seeders

---

## modules/

Contains all business features.

Each feature is isolated into its own module.

Example:

```text
modules/
│
├── auth/
├── users/
├── medications/
├── appointments/
└── reminders/
```

Each module follows a consistent internal structure.

---

# Module Structure

```text
users/
│
├── index.js
├── user.routes.js
├── user.controller.js
├── user.service.js
├── user.model.js
├── user.validation.js
├── user.mapper.js
├── user.constants.js
```

---

# Responsibilities Within a Module

## Routes

- Define API endpoints.
- Apply middleware.
- Delegate requests to controllers.

Routes should not contain business logic.

---

## Controller

Responsible for:

- Receiving validated requests
- Calling services
- Returning standardized responses

Controllers should remain thin.

---

## Service

Contains business logic.

Responsibilities include:

- Data processing
- Business rules
- Database interaction
- External integrations

Most application logic belongs here.

---

## Model

Defines the MongoDB schema using Mongoose.

Responsible for:

- Data structure
- Field constraints
- Indexes
- Default values

Models should not contain business workflows.

---

## Validation

Defines request validation rules using Joi.

Every incoming request should be validated before reaching the controller.

---

## Mapper

Transforms internal database documents into API response objects.

This prevents exposing unnecessary database fields to clients.

---

## Constants

Stores feature-specific constants, such as:

- User statuses
- Gender values
- Authentication messages

This avoids hard-coded strings throughout the codebase.

---

# Routing

The application uses centralized route registration.

```text
app.js
    │
    ▼
routes/index.js
    │
    ▼
Feature Modules
```

This provides a single entry point for all API routes.

---

# Design Principles

The project structure is based on the following principles:

- Feature-based organization
- Separation of concerns
- High cohesion
- Low coupling
- Reusability
- Scalability
- Consistency

These principles make it easier to add new features without affecting existing functionality.

---

# Future Modules

As HealthNest evolves, additional modules will include:

- Medication Management
- Appointment Scheduling
- Reminder Service
- Health Tracker
- Notification Service
- AI Assistant
- Administration

Each new module will follow the same structure to ensure consistency across the codebase.
