import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: "",
    status: "published",
  });
  const [slug, setSlug] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        withCredentials: true,
      });
      setCurrentUser(res.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Generate slug whenever title changes
  useEffect(() => {
    if (post.title) {
      const generatedSlug = post.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      setSlug(generatedSlug);
    } else {
      setSlug("");
    }
  }, [post.title]);

  const handleSubmit = async (e, submitStatus) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to submit a post.");
      navigate("/login");
      return;
    }
    setIsSubmitting(true);

    try {
      const tagArray = post.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const finalSlug = slug + "-" + Date.now();

      const payload = {
        title: post.title,
        content: post.content,
        tags: tagArray,
        status: submitStatus,
        author: currentUser._id,
        slug: finalSlug,
      };

      const res = await axios.post(`${API_URL}/post`, payload, {
        withCredentials: true,
      });

      if (submitStatus === "draft") {
        alert("Draft saved successfully!");
        navigate("/");
      } else {
        alert("Article published successfully!");
        navigate(`/post/${res.data.slug}`);
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while saving the article."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Create New Article</h1>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e, "published")}
          className="p-6 space-y-6"
        >
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Slug Display (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug (Auto-generated)
            </label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-600 cursor-not-allowed"
              placeholder="Slug will be generated from title"
            />
            <p className="text-xs text-gray-500 mt-1">
              Final URL will include a timestamp for uniqueness
            </p>
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={post.tags}
              onChange={(e) => setPost({ ...post, tags: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g. programming, design, technology"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              rows="12"
              placeholder="Write your Post content here..."
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
            >
              Cancel
            </button>

            {/* Save as Draft */}
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </button>

            {/* Publish Post */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
