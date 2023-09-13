import express from "express";
import formidable from "express-formidable";

import { canEditDeletePost, requireSignin } from "../middlewares";
import {
  createPost,
  uploadImage,
  postsByUser,
  userPost,
  updatePost,
  deletePost,
} from "../controllers/post";

const router = express.Router();

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({
    maxFieldsSize: 5 * 1024 * 1024,
  }),
  uploadImage
);

// posts
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete("/delete-post/:_id", requireSignin, canEditDeletePost, deletePost);

module.exports = router;
