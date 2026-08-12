# Full-Stack Personal Portfolio Website

A production-ready full-stack personal portfolio application built with **React (Vite)**, **Node.js**, **Express.js**, and **SQLite**.

# My Portfolio

🌐 **Live Portfolio:** https://portfolio-website-1-ncge.onrender.com

This is my personal portfolio website showcasing my skills, projects, and technical experience.

---

## 🌟 Key Features

1. **Frontend (Vite + React)**:
   - Modern HSL dark theme with glassmorphism visual effects & responsive grid layouts.
   - Dynamic projects showcase with category filters (Full-Stack, Frontend, Backend).
   - Category-wise technical skills list with visual progress bars.
   - Live backend stats counter (Projects in DB, Skills count, Messages count).
   - Working contact form with real-time feedback toast notifications.
   - Add Project Modal dialog to dynamically insert new projects into the SQLite database.
   - Admin Messages Drawer to inspect contact form submissions stored in the backend DB.

2. **Backend (Node.js + Express.js)**:
   - RESTful API endpoints for projects, skills, contact messages, and system health.
   - CORS enabled for seamless cross-origin communication.
   - Environment configurations and clean error handling.

3. **Database (SQLite)**:
   - Persistent SQLite database (`portfolio.db`) with zero external service dependencies.
   - Auto-population of initial showcase project entries and technical skills upon first run.

---

## 🚀 How to Run Locally

### 1. Start the Backend API Server
Open a terminal tab and run:
```bash
cd server
npm start
```
The REST API will run on `http://localhost:5000`.

### 2. Start the Frontend Development App
Open a second terminal tab and run:
```bash
cd client
npm run dev
```
The React frontend application will launch on `http://localhost:3000`.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/projects` | Fetch projects (Optional `?category=Full-Stack`) |
| `POST` | `/api/projects` | Add new project entry to database |
| `DELETE` | `/api/projects/:id` | Remove a project entry from database |
| `GET` | `/api/skills` | Retrieve list of skills |
| `POST` | `/api/contact` | Submit & store contact message |
| `GET` | `/api/messages` | Fetch contact messages (Admin view) |
| `GET` | `/api/stats` | Retrieve aggregate metrics |

---

## ☁️ Deployment Guide

### Deploying Frontend to Vercel or Netlify
1. Push this workspace folder to your GitHub repository.
2. Log into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Import your GitHub repository, setting the root directory to `client`.
4. Set Build Command to `npm run dev` / `npm run build` and Output Directory to `dist`.
5. Add environment variable `VITE_API_URL` pointing to your deployed backend URL.

### Deploying Backend to Render or Railway
1. Sign up on [Render](https://render.com).
2. Create a new **Web Service** connected to your repository with root directory `server`.
3. Set Build Command to `npm install` and Start Command to `npm start`.
4. Render will deploy your Node/Express server and persistent database.
