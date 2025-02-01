const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.status(403).json({ message: "Access Denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET ,(err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach the decoded email to the request 
    req.user = decoded;
    
    next(); 
  });
}

module.exports = verifyToken;
