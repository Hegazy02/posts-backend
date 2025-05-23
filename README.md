# 📝 Blog Posts Backend

A RESTful API for managing blog posts, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**. This backend handles post creation, editing, deletion, and retrieval for a blog application.

---

## 🚀 Features

- Create, read, update, and delete (CRUD) blog posts
- RESTful API architecture
- MongoDB Atlas with Mongoose ODM
- CORS enabled for frontend integration
- Environment-based configuration
- Proper error handling and logging

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Tools & Packages:** dotenv, nodemon, body-parser, morgan

---

## 📁 Project Structure

#### blog-backend/
#### ├── controllers/
#### │ └── postController.js # Controller functions for post routes
#### ├── models/
#### │ └── Post.js # Mongoose schema for blog posts
#### ├── routes/
#### │ └── postRoutes.js # Route definitions
#### ├── .env # Environment variables
#### ├── .gitignore # Ignored files for git
#### ├── server.js # Entry point
#### ├── package.json
#### └── README.md

## 🛠 API Endpoints

### 📚 Posts

| Method | Route              | Description             |
|--------|--------------------|-------------------------|
| GET    | `/api/posts`       | Get all posts           |
| GET    | `/api/posts/:id`   | Get a specific post     |
| POST   | `/api/posts`       | Create a new post       |
| PUT    | `/api/posts/:id`   | Update an existing post |
| DELETE | `/api/posts/:id`   | Delete a post           |

### 👤 Authentication & Users

| Method | Route              | Description              |
|--------|--------------------|--------------------------|
| POST   | `/api/signup`      | Register a new user      |
| POST   | `/api/signin`      | Sign in an existing user |
| GET    | `/api/users`       | Get all registered users |

