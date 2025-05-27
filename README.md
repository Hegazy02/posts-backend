# 📝 Blog Posts Backend

A RESTful API for managing blog posts, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**. This backend handles post creation, editing, deletion, and retrieval for a blog application.

---
## 🔗 Live
https://posts-backend-olive.vercel.app/

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
#### ├── models/
#### ├── routes/
#### ├── server.js
#### ├── package.json

## 🛠 API Endpoints

### 📚 Posts

| Method | Route                     | Description             | Optional Query Params                                  |
|--------|---------------------------|-------------------------|--------------------------------------------------------|
| GET    | `/api/posts`              | Get all posts           | `page`, `limit`, `title`, `content`, `sortBy`, `order` |
| GET    | `/api/posts/:id`          | Get a specific post     |                                                        |
| POST   | `/api/posts`              | Create a new post       |                                                        |
| PUT    | `/api/posts/:id`          | Update an existing post |                                                        |
| DELETE | `/api/posts/:id`          | Delete a post           |                                                        |
| POST   | `/api/posts/:id/comments` | Add a comment to a post |                                                        |
| POST   | `/api/posts/:id/like`     | Like or unlike a post   |                                                        |



### 👤 Authentication & Users

| Method | Route              | Description              |
|--------|--------------------|--------------------------|
| POST   | `/api/signup`      | Register a new user      |
| POST   | `/api/signin`      | Sign in an existing user |
| GET    | `/api/users`       | Get all registered users |
### 📫 Postman Collection


🔗 [Click here to open the Postman Collection](https://angular-proj.postman.co/workspace/angular-proj-Workspace~e8dd4cd0-4a00-4d31-8b89-eb03c7183e03/collection/26507427-e20aad72-c72f-4a30-ab0a-bc9dc97ee1ec?action=share&creator=26507427&active-environment=26507427-3c2533a2-af2e-47a1-9d12-cdd87f9ba262)
