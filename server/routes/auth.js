import express from "express";
import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
} from "../controllers/auth";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);

router.put('/profile-update', requireSignin, profileUpdate)


module.exports = router;
