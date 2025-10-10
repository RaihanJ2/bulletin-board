import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
  getMyComments,
} from "../controllers/commentController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/post/:postId", getCommentsByPost);

router.get("/my-comments", isAuthenticated, getMyComments);

router.post("/", isAuthenticated, addComment);

router.put("/:id", isAuthenticated, deleteComment);

router.delete("/:id", isAuthenticated, deleteComment);

export default router;
