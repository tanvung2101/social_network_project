const { Post } = require("../models/post");
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dednm3ja1",
  api_key: "367836551974761",
  api_secret: "dEXwanT6GQJxCpxLoftoA_Bfzjk",
});

export const createPost = async (req, res) => {
  console.log(req.body);
  const { content, image } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }

  try {
    const post = new Post({ content, image, postedBy: req.user._id });
    post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  // console.log(req.files)
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log(result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postsByUser = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.user._id })
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    // console.log('posts',posts)
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (req, res) => {
  // console.log("post update controller => ", req.body);
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id)
    // remove the image from cloudinary
    if(post.image && post.image.public_id){
      const image = await cloudinary.uploader.destroy(post.image.public_id)
    }
    res.json({
      ok: true
    })
  } catch (error) {
    
  }
}
