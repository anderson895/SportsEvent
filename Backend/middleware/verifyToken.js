const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "i3jCXU67a9f8Ul-LW5THvDP1JqTTD9OmmeEiaiMdhH4yp2e6PHZicR1jRq8gY3sX5VXIeTyL2LhYbCAQDAhF5Q";
console.log(SECRET_KEY)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ success: 0, message: "Access denied. No token provided." });
  }

  try {
    const verifiedUser = jwt.verify(token, SECRET_KEY);
    req.user = verifiedUser;

    next();
  } catch (err) {
    res.status(403).json({ success: 0, message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
