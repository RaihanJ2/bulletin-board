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

export const getMyComments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const comments = await Comment.find({
      author: req.user._id,
      isDeleted: false,
    })
      .populate("post", "title slug")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("❌ [getMyComments] Error:", err);
    res
      .status(500)
      .json({ message: "Failed to get comments", error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const commentData = {
      ...req.body,
      author: req.user._id,
    };

    const comment = await Comment.create(commentData);
    await Post.findByIdAndUpdate(comment.post, {
      $push: { comments: comment._id },
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "author",
      "username"
    );

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error("❌ [addComment] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to add comment", error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this comment" });
    }

    comment.content = req.body.content;
    await comment.save();

    res.json(comment);
  } catch (err) {
    console.error("❌ [updateComment] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to update comment", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("❌ [deleteComment] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to delete comment", error: err.message });
  }
};
