const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Validate email
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    // Validate password
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        message: "Password must be at least 8 characters and at most 72 UTF-8 bytes."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether email already exists
    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    // Hash password before saving
    const passwordHash = await bcrypt.hash(password, 12);

    // Create MongoDB user
    const user = await User.create({
      email: normalizedEmail,
      passwordHash
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      message: "An unexpected server error occurred."
    });
  }
});

module.exports = router;
