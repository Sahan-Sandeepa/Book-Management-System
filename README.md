# 📚 Book Management App

A full-stack **Book Management System** built with **React**, **NestJS**, and **Prisma**, designed for managing book borrowing and returning activities efficiently.

---

## 🚀 Features

- 🔐 **User Authentication** (Login / Signup)
- 📖 **Book Management** (List, Borrow, Return)
- ⚡ **Instant UI Notifications** (No external libraries)
- 🧭 **Protected Routes** using JWT
- 🗄️ **Prisma ORM** for database operations
- 🔑 **Environment-based JWT secret** for secure authentication

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahan-Sandeepa/Book-Management-System
```
### 2️⃣ Backend Setup (NestJS)
```bash
cd book-management-backend
npm install
```

#### Create a .env file in the backend folder
```bash
DATABASE_URL="postgresql://postgres:{YOUR_PASSWORD}@{DB_URL}/bookdb?schema=public"
FRONTEND_URL=http://localhost:3001/
SECRET_KEY="yourSecretKey"
```
#### Run Prisma migrations
```bash
Run Prisma migrations
```
#### Start the backend server
```bash
npm run start
```
Backend runs at 👉 http://localhost:3000

### 3️⃣ Frontend Setup (React)
```bash
cd book-management-frontend
npm install
```
#### Create a .env file in the frontend folder
```bash
PORT=3001
```
#### Start the frontend server
```bash
npm run start
```
Frontend runs at 👉 http://localhost:3001

## 🧰 Tech Stack
- Frontend: React, TypeScript, React Query, React Router
- Backend: NestJS, Prisma ORM, JWT
- Database: PostgreSQL
