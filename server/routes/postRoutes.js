import express from "express";
import {
  getAllPosts,
  createPost,
  getPostBySlug,
  updatePost,
  deletePost,
  getPostsByCurrentUser,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/my-posts", isAuthenticated, getPostsByCurrentUser);

router.get("/:slug", getPostBySlug);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
