const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const  {id}= decode;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(302).json({ message: "user not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authorization: Invalid Token",
    });
  }
};

module.exports = { userAuth };
