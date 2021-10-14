require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  UnauthenticatedError
} = require("../errors");

const authentication = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid token or no token provided");
  }

  try {
    const token = authHeaders.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {
      name,
      email
    } = decoded;
    req.user = {
      name,
      email
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authorized to access this route");
  }
};

module.exports = authentication;