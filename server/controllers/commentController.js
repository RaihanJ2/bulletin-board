import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username")
      .populate("parent");
    res.json(comments);
  } catch (err) {
    console.error("❌ [getCommentsByPost] Error:", err);
    res
      .status(500)
      .json({ message: "Failed to get comments", error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    await Post.findByIdAndUpdate(comment.post, {
      $push: { comments: comment._id },
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error("❌ [addComment] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to add comment", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("❌ [deleteComment] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to delete comment", error: err.message });
  }
};
