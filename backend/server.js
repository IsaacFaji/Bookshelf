require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Disable unnecessary server identification
app.disable("x-powered-by");

// HTTP security headers
app.use(helmet({
  strictTransportSecurity: false
}));

// Limit incoming JSON request size
app.use(express.json({ limit: "10kb" }));

// Rate limit authentication attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts. Please try again later."
  }
});

// Apply rate limiting to registration and login
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Authentication routes
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "BookShelf backend is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

// Handle invalid JSON and oversized requests
app.use((error, req, res, next) => {
  if (error.type === "entity.too.large") {
    return res.status(413).json({
      message: "Request is too large."
    });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Invalid request format."
    });
  }

  console.error("Unexpected server error:", error.name);

  return res.status(500).json({
    message: "An unexpected server error occurred."
  });
});

// Connect to MongoDB before starting Express
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      authSource: "bookshelf",
      serverSelectionTimeoutMS: 5000
    });

    console.log("Connected to BookShelf MongoDB");

    app.listen(PORT, "0.0.0.0", (error) => {
      if (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
      }

      console.log(`BookShelf backend running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();

