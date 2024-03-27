const jwt = require("../helper/jwt");
const verifySignIn = (req, res, next) => {
  // console.log("first");
  try {
    const { token } = req.body;
    if (!token) {
      throw new Error();
    }
    const verify = jwt.verifyToken(token);
    if (!verify) {
      throw new Error();
    }
    req.body._id = verify._id; //adding a new parameter to the body
    next();
  } catch {
    console.log("error");
    res.status(500).json({ error: "user not verified!!!" });
  }
};
module.exports = verifySignIn;
