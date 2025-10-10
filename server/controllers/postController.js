import Post from "../models/post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "fullname email");
    res.json(posts);
  } catch (err) {
    console.error("❌ [getAllPosts] Error:", err);
    res
      .status(500)
      .json({ message: "Failed to get posts", error: err.message });
  }
};

export const getPostsByCurrentUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .populate("author", "fullname email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("❌ [getPostsByCurrentUser] Error:", err);
    res
      .status(500)
      .json({ message: "Failed to get user posts", error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    console.log("🔍 Fetching post by ID:", req.params.id);
    console.log("👤 User:", req.user?._id);

    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    const post = await Post.findById(req.params.id).populate(
      "author",
      "fullname email"
    );

    if (!post) {
      console.log("❌ Post not found");
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author of the post
    if (post.author._id.toString() !== req.user._id.toString()) {
      console.log("❌ Unauthorized access attempt");
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" });
    }

    console.log("✅ Post found:", post.title);
    res.json(post);
  } catch (err) {
    console.error("❌ [getPostById] Error:", err);
    res.status(500).json({ message: "Failed to get post", error: err.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("author", "fullname email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "fullname email" },
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
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.user && post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.user && post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("❌ [deletePost] Error:", err);
    res
      .status(400)
      .json({ message: "Failed to delete post", error: err.message });
  }
};
