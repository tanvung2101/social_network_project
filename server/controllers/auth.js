const AppError = require("../helpers/appError");
const { hashPassword, comparePassword } = require("../helpers/auth");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
import { nanoid } from 'nanoid'

exports.register = async (req, res) => {
  // console.log('REGISTER ENDPOIN', req.body)
  const { name, email, password, secret } = req.body;
  // validation
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Answer is required",
    });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  });

  try {
    await user.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (error) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

exports.login = async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");
    // create signd token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again.");
  }
};

exports.currentUser = async (req, res) => {
  // console.log(req.headers)
  // console.log(req.user)
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ok: true})
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

exports.forgotPassword = async (req, res) => {
  // console.log(req.body);
  const { email, newPassword, secret } = req.body;
  // validation
  if (!newPassword || newPassword < 6) {
    return res.json({
      error: "Wrong password",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We cant verify you with those details",
    });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats, Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong. Try again.",
    });
  }
};
