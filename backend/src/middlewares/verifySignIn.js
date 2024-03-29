const jwt = require("../helper/jwt");
const verifySignIn = (req, res, next) => {
  console.log("first");
  try {
    console.log(req.body);
    const { token } = req.body;
    console.log(token);
    if (!token) {
      //
      throw new Error();
    }
    const verify = jwt.verifyToken(token);
    if (!verify) {
      throw new Error();
    }
    req.body._id = verify._id; //adding a new parameter to the body
    next();
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "user not verified!!!" });
  }
};
module.exports = verifySignIn;
