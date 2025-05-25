require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;
const prefex = "/api";
const AppError = require("./utils/appError.js");
const postRoutes = require("./routes/post.route.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.route.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");
var cors = require("cors");
const { log } = require("console");

var whitelist = [
  "http://localhost:3000",
  "https://posts-backend-olive.vercel.app",
  "http://localhost:4200",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

server.use(cors(corsOptionsDelegate));

app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure code
  });

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("Unauthorized", 401); // not authenticated
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(`${prefex}/`, authRoutes);

app.use(verifyToken);

// Routes
app.use(`${prefex}/users`, userRoutes);
app.use(`${prefex}/posts`, postRoutes);

app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "failed",
    statusCode,
    message: err.message || "Something went wrong",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
