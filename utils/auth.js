const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticate = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const isAdmin = function (req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied, admin role required" });
};

module.exports = {
    isAuthenticate,
    isAdmin
}