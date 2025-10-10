import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
    status: "draft",
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching post with ID:", id);
      console.log("API URL:", `${API_URL}/post/by-id/${id}`);

      const res = await axios.get(`${API_URL}/post/by-id/${id}`, {
        withCredentials: true,
      });

      console.log("Post data received:", res.data);

      setPost({
        title: res.data.title || "",
        content: res.data.content || "",
        tags: res.data.tags || [],
        status: res.data.status || "draft",
      });
    } catch (err) {
      console.error("Error fetching post:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost({ ...post, tags: [...post.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();

    try {
      const updateData = {
        title: post.title,
        content: post.content,
        tags: post.tags,
        status: status,
      };

      await axios.put(`${API_URL}/post/${id}`, updateData, {
        withCredentials: true,
      });

      alert(
        `Post ${
          status === "published" ? "published" : "saved as draft"
        } successfully!`
      );
      navigate("/history");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate("/history")}
            className="mt-4 text-orange-500 hover:text-orange-600"
          >
            ← Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Edit Article</h1>
        </div>

        <form className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddTag(e);
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-orange-500 hover:text-orange-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              rows="12"
              placeholder="Write your article content here..."
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/history")}
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
