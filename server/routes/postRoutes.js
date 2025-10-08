import express from "express";
import {
  getAllPosts,
  createPost,
  getPostBySlug,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:slug", getPostBySlug);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
