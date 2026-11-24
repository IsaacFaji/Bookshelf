const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const cookieHeader = req.headers.cookie || "";

  // Find the BookShelf authentication cookie
  const tokenCookie = cookieHeader
    .split(";")
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith("bookshelf_token="));

  if (!tokenCookie) {
    return res.status(401).json({
      message: "Authentication required."
    });
  }

  const token = tokenCookie.substring(
    "bookshelf_token=".length
  );

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] }
    );

    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
}

module.exports = authenticateToken;
