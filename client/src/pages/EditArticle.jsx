import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Editrticle() {
  const navigate = useNavigate();
  const [Post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    image: null,
    imagePreview: null,
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", Post.title);
    formData.append("summary", Post.summary);
    formData.append("content", Post.content);
    formData.append("category", Post.category);
    if (Post.image) {
      formData.append("image", Post.image);
    }

    const response = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    navigate(`/post/${data.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Edit Article</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={Post.title}
              onChange={(e) => setPost({ ...Post, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter article title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={Post.category}
              onChange={(e) => setPost({ ...Post, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          {/* Summary Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <textarea
              value={Post.summary}
              onChange={(e) => setPost({ ...Post, summary: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              rows="3"
              placeholder="Brief summary of your article"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={Post.content}
              onChange={(e) => setPost({ ...Post, content: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              rows="12"
              placeholder="Write your article content here..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Edit Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
