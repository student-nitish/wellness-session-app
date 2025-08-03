# Wellness Session Platform

A full-stack wellness session platform where users can create, manage, draft, and publish structured wellness sessions (e.g., meditation, yoga, breathing exercises) with tagging, auto-save, and secure authentication.

#Live Demo
https://wellness-session-app-lghj.vercel.app/


---

## About

This platform enables users to build wellness sessions composed of sequenced steps (type, duration, description), tag them, save drafts, and publish. It uses secure JWT-based authentication with httpOnly cookies to protect user sessions.

---

## Features

- User registration and login with JWT and secure cookies  
- Create, edit, draft, and publish wellness sessions  
- Session tagging for discovery  
- Structured session content with steps (type, duration, description)  
- Auto-save and draft management  
- Protected routes (only authenticated users can manage sessions)  
- Responsive React frontend  
- RESTful backend with validation and error handling  
- Toaster notification

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT, bcrypt, httpOnly cookies  

---


---

## Clone this Repository

To clone and run this project locally:

```bash
# Clone the repository
- git clone https://github.com/student-nitish/wellness-session-app.git

# Go into the project directory
- cd wellness-session-app


---

## Getting Started

### Prerequisites

=Install node_module package in both frontend and backend folder(npm install)

- Node.js (v16+ recommended)  
- npm or yarn  
- MongoDB (local or Atlas)

### Example `.env.example`

Create `.env` files from these templates (rename/copy to `.env` or `.env.local` per folder and fill values):

#### `server/.env`
```env
 - PORT=4000
- MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/dbname?retryWrites=true&w=majority
- JWT_SECRET=your_jwt_secret_here

