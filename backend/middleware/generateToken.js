const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  return jwt.sign({ email }, "JWT_SECRET", { expiresIn: "24h" });
};

module.exports = generateToken;
