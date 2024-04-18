const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, avatar } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User Already Registered" });
  }
  const register = new userModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    phone: phone,
    avatar: avatar,
  });
  try {
    const data = await register.save();
    const token = jwt.sign(
      { email: register.email, id: register._id },
      process.env.JWT_SECRET
    );
    res
      .status(201)
      .json({ success: true, msg: "User Created Successfully", data, token });
  } catch (error) {
    res.status(404).json({ success: false, msg: "Error Occured", err: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(409).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({ success: true, msg: "User Logged In", token });
  } catch (error) {
    res.status(404).json({ success: false, msg: "Error Occured", err: error });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, msg: "Error Occured", err: error });
  }
};

exports.getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await userModel.findById(id);
    res.status(200).json({ success: true, singleUser });
  } catch (error) {
    res.status(404).json({ success: false, msg: "Error Occured", err: error });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updateUser = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, msg: "User Updated Successfully", updateUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      msg: `User with id ${id} has been deleted successfully`,
    });
  } catch (error) {
    res.status(404).json({ success: false, msg: "Error Occured", err: error });
  }
};

const sendResetPasswordEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Hello, <p>Please  click on the following link to reset your password</p>
      <a href=${resetLink}>${resetLink}</a></p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Reset Password link send to ${email}`);
  } catch (error) {
    console.log("Error sending reset password email");
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const resetToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    (user.resetPasswordToken = resetToken),
      (user.resetPasswordTokenExpire = Date.now() + 3600000);

    await user.save();
    await sendResetPasswordEmail(email, resetToken);
    res.status(200).json({
      msg: "Password reset token send to your email",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpire: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.status(400).json({
        msg: "Invailid Token or Expired Token",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;
    await user.save();

    const resetEmail = user.email;
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: resetEmail,
      subject: "Reset Your Password",
      html: `<h1>Password Reset Successfully</h1><p>Password reset successfully, now you can login with mew password</p>`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);
    console.log("Reset Password token", token);
    res.status(200).json({
      msg: "Password reset successfully",
    });
  } catch (error) {
    req.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};
