import expressJwt from "express-jwt";
import { Post } from "../models/post";

export const requireSignin = expressJwt({
  secret: 'SHDFAKSHDAOIW9438934JDHHSKDFJHIEW',
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("POST in EDITDELETE MIDDLEWARE => ", post);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};