import Post from "../models/post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    console.error("❌ [getAllPosts] Error:", err);
    res
      .status(500)
      .json({ message: "Failed to get posts", error: err.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("❌ [getPostBySlug] Error:", err);
    res.status(500).json({ message: "Failed to get post", error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    console.error("❌ [createPost] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to create post", error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ [updatePost] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to update post", error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("❌ [deletePost] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to delete post", error: err.message });
  }
};
