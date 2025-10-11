import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CommentSection from "../components/CommentSection";

const API_URL = import.meta.env.VITE_API_URL;

export default function PostDetail() {
  const { slug } = useParams(); // ✅ Ambil slug dari URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchpost = async () => {
      try {
        // ✅ Ambil data artikel dari backend menggunakan slug
        const res = await axios.get(`${API_URL}/post/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchpost();
  }, [slug]);

  // 🕒 Loading state
  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading post...</p>;
  }

  // ❌ Error state
  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  // ✅ Jika data berhasil diambil
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white border-orange-200 rounded-xl shadow-md border  p-8 mb-10">
        <Link to="/" className="text-orange-500 hover:text-orange-600 text-sm">
          ← Back to Posts
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center mb-6">
          <img
            src="/profile.png"
            alt={post.author?.email}
            className="w-12 h-12 rounded-full mr-4 border-2 border-orange-200"
          />
          <div>
            <p className="text-orange-500 text-xl capitalize font-semibold">
              {post.author?.fullname || ""}
            </p>
            <p className="text-gray-800 font-semibold">{post.author?.email}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="prose prose-orange text-gray-700 max-w-none leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Komentar Section */}
      <CommentSection
        postId={post._id || post.id}
        initialComments={
          post.comments && post.comments.length > 0 ? post.comments : []
        }
      />
    </div>
  );
}
