# 🏥 HealthNest Backend

A production-ready RESTful backend powering **HealthNest**, a Personal Health Companion designed to help users manage medications, appointments, health records, reminders, and daily wellness activities.

The project is being developed using modern backend engineering practices with a focus on clean architecture, security, scalability, maintainability, and developer experience.

---

# 📖 Table of Contents

- Overview
- Problem Statement
- Solution
- Features
- Technology Stack
- Project Architecture
- Folder Structure
- Getting Started
- Environment Variables
- Running the Project
- API Documentation
- Engineering Principles
- Roadmap
- Contributors

---

# Overview

HealthNest is a digital personal health companion that helps users stay consistent with their healthcare routines.

The backend exposes secure REST APIs that power the mobile application, handling user authentication, medication management, appointment scheduling, reminders, notifications, health records, and future AI-powered health assistance.

---

# Problem Statement

Many people struggle to consistently manage their personal health because they:

- Forget to take medications.
- Miss medical appointments.
- Lose track of health records.
- Have difficulty organizing daily health routines.
- Lack personalized guidance for managing their wellbeing.

These challenges often reduce treatment adherence and negatively affect long-term health outcomes.

---

# Solution

HealthNest provides a centralized platform that enables users to:

- Create and manage personal health accounts.
- Schedule medications and receive reminders.
- Manage medical appointments.
- Track personal health history.
- Receive intelligent health assistance.
- Stay organized through a personalized health dashboard.

---

# Current Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token Support
- Password Hashing using bcrypt
- Protected Routes

## Backend Infrastructure

- Feature-based Architecture
- Centralized Configuration Management
- Environment Validation
- Standardized API Responses
- Global Error Handling
- Request Validation using Joi
- Winston Logging
- Morgan HTTP Logging
- MongoDB Integration
- Express 5

---

# Technology Stack

| Layer             | Technology            |
| ----------------- | --------------------- |
| Runtime           | Node.js               |
| Framework         | Express 5             |
| Database          | MongoDB               |
| ODM               | Mongoose              |
| Authentication    | JWT                   |
| Validation        | Joi                   |
| Logging           | Winston + Morgan      |
| Password Security | bcrypt                |
| Documentation     | Swagger (In Progress) |
| Testing           | Jest + Supertest      |

---

# Project Architecture

The project follows a feature-based modular architecture.

```
Request
    │
    ▼
Express
    │
    ▼
Global Middleware
    │
    ▼
Route
    │
    ▼
Validation
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Database
    │
    ▼
API Response
    │
    ▼
Client
```

Business logic is isolated from routing and infrastructure to improve maintainability and scalability.

---

# Folder Structure

```
src/
│
├── common/
├── config/
├── database/
├── docs/
├── modules/
├── routes/
├── app.js
└── server.js
```

Each feature is implemented as an independent module containing its own routes, controller, service, validation, model, mapper, constants, and supporting files.

---

# Getting Started

## Clone the Repository

```bash
git clone <repository-url>
cd HealthNest
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=

JWT_SECRET=

JWT_EXPIRES_IN=1d

REFRESH_TOKEN_SECRET=

REFRESH_TOKEN_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000

LOG_LEVEL=info
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# API Documentation

Project documentation is available inside the `docs/` directory.

| Document                | Description                |
| ----------------------- | -------------------------- |
| API_GUIDE.md            | API Reference              |
| AUTHENTICATION.md       | Authentication Flow        |
| ARCHITECTURE.md         | Backend Architecture       |
| DATABASE.md             | Database Design            |
| ERROR_HANDLING.md       | Error Handling Strategy    |
| FRONTEND_INTEGRATION.md | Frontend Integration Guide |
| LOGGING.md              | Logging Strategy           |
| PROJECT_STRUCTURE.md    | Project Organization       |
| SECURITY.md             | Security Practices         |

Swagger documentation will be available in a future release.

---

# Engineering Principles

This project follows several engineering principles, including:

- Feature-based modular architecture
- Separation of concerns
- Single responsibility principle
- Centralized configuration
- Consistent API contracts
- Defensive programming
- Secure authentication practices
- Structured logging
- Reusable validation
- Production-ready error handling

---

# Roadmap

Upcoming features include:

- Medication Management
- Appointment Scheduling
- Health Tracker
- Notification Service
- AI Health Assistant
- Email Verification
- Password Reset
- Role-Based Access Control
- Audit Logging
- Automated Testing
- Docker Support
- CI/CD Pipeline

---

# Contributors

Backend Engineering Lead

- Promise Okere

---

# License

This project is developed as part of the HealthNest Personal Health Companion initiative.
