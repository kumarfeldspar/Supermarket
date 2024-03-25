const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secretkey";

class Jwt {
  generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  }
  verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }
  generateTokenWithExpiry(payload, expiry) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: expiry });
  }
}

module.exports = new Jwt();
