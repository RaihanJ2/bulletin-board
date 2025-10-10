import express from "express";
import {
  getAllPosts,
  createPost,
  getPostBySlug,
  getPostById,
  updatePost,
  deletePost,
  getPostsByCurrentUser,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/my-posts", isAuthenticated, getPostsByCurrentUser);
router.get("/by-id/:id", isAuthenticated, getPostById);

router.get("/", getAllPosts);
router.post("/", createPost);

router.get("/:slug", getPostBySlug);

router.put("/:id", isAuthenticated, updatePost);
router.delete("/:id", isAuthenticated, deletePost);

export default router;
