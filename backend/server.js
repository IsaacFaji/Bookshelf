require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
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

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      authSource: "bookshelf",
      serverSelectionTimeoutMS: 5000
    });

    console.log("Connected to BookShelf MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`BookShelf backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
