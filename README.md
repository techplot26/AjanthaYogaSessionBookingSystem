# Ajantha Yoga Session Booking System

## Project Overview

Ajantha Yoga Session Booking System is a full-stack web application. This system allows users to browse yoga sessions, register, login, book sessions, cancel bookings, and manage their profiles. Administrators can manage yoga sessions and monitor bookings.

---

## Live Deployment

**Public URL:**

http://3.26.242.17

**Backend API:**

http://3.26.242.17:5001/

> Note: EC2 instance may be stopped in status due to avoiding personal AWS charges may incur as .

---

## GitHub Repository

Repository:

https://github.com/techplot26/AjanthaYogaSessionBookingSystem

---

## Features

### User Features

* User Registration
* User Login (JWT Authentication)
* View Yoga Sessions
* Book Yoga Sessions
* Cancel Bookings
* Update User Profile

### Admin Features

* Create Yoga Sessions
* Update Yoga Sessions
* Delete Yoga Sessions
* View All Bookings
* Dashboard Management

---

## Technology Stack

### Frontend

* React.js


### Backend

* Node.js
* Express.js
* JWT Authentication


### Database

* MongoDB Atlas

### DevOps

* GitHub
* GitHub Actions
* AWS EC2
* PM2 Process Manager

---

## Installation Instructions

### Clone Repository

```bash
git clone https://github.com/techplot26/AjanthaYogaSessionBookingSystem.git

cd AjanthaYogaSessionBookingSystem
```

### Backend Setup

```bash
cd backend

npm install
```

Create .env file:

```env
PORT=5001

MONGO_URI=mongodb://127.0.0.1:27017/ajantha_yoga

JWT_SECRET=ajantha_yoga_secret_key
```

Start Backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend will run on:

```text
http://localhost:3000
```

---

## Deployment

### AWS EC2

Application is deployed on:

* Ubuntu EC2 Instance
* Node.js Runtime
* MongoDB Atlas
* PM2 Process Manager

### PM2 Commands

```bash
pm2 start server.js --name ajantha-backend

pm2 restart ajantha-backend

pm2 logs ajantha-backend

pm2 save
```

---

## CI/CD Pipeline

GitHub Actions automatically performs:

### Continuous Integration (CI)

* Checkout Code
* Install Backend Dependencies
* Install Frontend Dependencies
* Build Frontend
* Validate Backend Build

### Continuous Deployment (CD)

* Deploy to EC2 using GitHub Self-Hosted Runner
* Restart Backend Service
* Update Application Automatically

Workflow File:

```text
.github/workflows/ci.yml
```

---

## Testing

### Backend API

```text
GET /api/yoga-sessions

POST /api/auth/register

POST /api/auth/login

GET /api/bookings
```

---

## Login Credentials

### User Access

Users can register a new account using the Registration page.


### Admin Access

Admin functionality can be accessed using an administrator account created in MongoDB.

---

## Author

Rizwan Mohammed


