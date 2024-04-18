const express = require("express");
const {
  createUser,
  login,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  resetPassword,
  forgetPassword,
} = require("../controllers/usercontroller");
const { userAuth } = require("../middleware/authorization");
const router = express.Router();

router.post("/createUser", createUser);

router.post("/login", login);

router.get("/users", getAllUser);

router.get("/user/:id", getSingleUser);

router.delete("/user/:id", deleteUser, userAuth);

router.patch("/user/:id", updateUser, userAuth);

router.post("/auth/forget-password", forgetPassword);

router.post("/auth/reset-password/:token", resetPassword);

module.exports = router;
