# SmartCRM — Full Stack CRM System

A modern full-stack CRM (Customer Relationship Management) platform built using **React.js, FastAPI, PostgreSQL, JWT Authentication, and Tailwind CSS**.

---

# Features

## Authentication & Security
- User Registration
- Admin Registration
- JWT Authentication
- OTP Verification
- Forgot Password
- Reset Password
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (RBAC)

---

# USER Features

Users can:
- Manage their own contacts
- Create and track leads
- Manage deals
- Create support tickets
- Access personal CRM dashboard

Users cannot:
- Access admin pages
- Delete other users
- Access company analytics
- View organization-wide data

---

# ADMIN Features

Admins can:
- View all users
- Delete users
- Access analytics dashboard
- View revenue reports
- Manage all contacts/leads/deals
- Access organization-wide CRM data

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React Icons

## Backend
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- JWT Authentication
- Pydantic Validation
- bcrypt Password Hashing

---

# Project Structure

```bash
Smart-CRM/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── routes.py
│   │   └── email_utils.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Leads.jsx
│   │   │   ├── Deals.jsx
│   │   │   ├── Tickets.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   └── AdminAnalytics.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation Guide

# 1. Clone Repository

```bash
git clone https://github.com/raunaque21278/Smart-CRM.git
```

```bash
cd Smart-CRM
```

---

# 2. Backend Setup

```bash
cd backend
```

## Create Virtual Environment

### Windows

```bash
python -m venv venv
```

### Activate Virtual Environment

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 3. PostgreSQL Setup

Create database:

```sql
CREATE DATABASE smart_crm_db;
```

---

# 4. Configure Environment Variables

Create `.env` inside backend folder:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/smart_crm_db

JWT_SECRET_KEY=mysecretkey123
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 5. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```txt
http://127.0.0.1:8000
```

Swagger Docs:

```txt
http://127.0.0.1:8000/docs
```

---

# 6. Frontend Setup

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Authentication Flow

```txt
Register
   ↓
Verify OTP
   ↓
Login
   ↓
Dashboard
```

---

# Role-Based Access Control

| Feature | USER | ADMIN |
|---|---|---|
| Login/Register | ✅ | ✅ |
| Manage Own Contacts | ✅ | ✅ |
| Manage Own Leads | ✅ | ✅ |
| View All Contacts | ❌ | ✅ |
| View All Leads | ❌ | ✅ |
| Delete Users | ❌ | ✅ |
| Admin Analytics | ❌ | ✅ |
| Revenue Reports | ❌ | ✅ |
| User Management | ❌ | ✅ |

---

# API Endpoints

## Authentication APIs

| Method | Endpoint |
|---|---|
| POST | /auth/register |
| POST | /auth/login |
| POST | /auth/verify-otp |
| POST | /auth/forgot-password |
| POST | /auth/reset-password |

---

## Contacts APIs

| Method | Endpoint |
|---|---|
| GET | /contacts |
| POST | /contacts |
| PUT | /contacts/{id} |
| DELETE | /contacts/{id} |

---

## Leads APIs

| Method | Endpoint |
|---|---|
| GET | /leads |
| POST | /leads |
| PUT | /leads/{id} |
| DELETE | /leads/{id} |

---

## Deals APIs

| Method | Endpoint |
|---|---|
| GET | /deals |
| POST | /deals |
| PUT | /deals/{id} |
| DELETE | /deals/{id} |

---

## Tickets APIs

| Method | Endpoint |
|---|---|
| GET | /tickets |
| POST | /tickets |
| PUT | /tickets/{id} |
| DELETE | /tickets/{id} |

---

## Admin APIs

| Method | Endpoint |
|---|---|
| GET | /admin/users |
| DELETE | /admin/users/{id} |
| GET | /admin/analytics |

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected Backend Routes
- Protected Frontend Routes
- Role-Based Authorization
- Ownership-Based Data Access

---

# Engineering Highlights

- Full-stack architecture
- Modular backend design
- SQLAlchemy ORM integration
- Secure authentication flow
- Scalable REST API structure
- Dynamic role-based frontend rendering

---

# Future Improvements

- Docker Deployment
- Redis Caching
- Email OTP Integration
- WebSocket Notifications
- AI Lead Scoring
- File Uploads
- Activity Logs
- Kanban Board
- Dark Mode

---

# Screenshots

## Login Page
- JWT authentication
- Responsive UI
- Role-based login

## Dashboard
- Revenue analytics
- CRM statistics
- Dynamic cards

## Admin Dashboard
- User management
- Organization analytics
- Revenue reports

---

# Author

## Raunaque Khan

- GitHub: https://github.com/raunaque21278
- LinkedIn: https://www.linkedin.com/

---

# License

This project is developed for educational and portfolio purposes.
