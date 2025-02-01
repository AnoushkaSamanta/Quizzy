const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  console.log(process.env.JWT_SECRET);
  
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = generateToken;
