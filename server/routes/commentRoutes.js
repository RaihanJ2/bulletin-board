import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/post/:postId", getCommentsByPost);

router.post("/", addComment);

router.delete("/:id", deleteComment);

export default router;
