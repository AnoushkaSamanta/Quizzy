const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.status(403).json({ message: "Access Denied. No token provided." });
  }

  // Verify the token using the secret key
  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach the decoded email to the request object
    req.user = decoded;
    
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = verifyToken;
