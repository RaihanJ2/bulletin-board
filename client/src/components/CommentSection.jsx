import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../hook/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export default function CommentSection({ postId }) {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!postId) return;
    try {
      const res = await axios.get(`${API_URL}/comment/post/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      Swal.fire("Error", "Failed to load comments.", "error");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to leave a comment.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (newComment.trim() === "") return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/comment`,
        {
          post: postId,
          content: newComment,
        },
        { withCredentials: true }
      );

      setComments([...comments, res.data]);
      setNewComment("");

      Swal.fire({
        icon: "success",
        title: "Comment Posted!",
        text: "Your comment has been added successfully.",
        confirmButtonColor: "#f97316",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      Swal.fire("Error", "Failed to add comment. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (author) => {
    if (!author) return "Anonymous";
    return author.fullname || "Anonymous";
  };

  const getEmail = (author) => {
    return author.email;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">
        Comments ({comments.length})
      </h2>

      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-orange-50/40 border border-orange-100 rounded-lg p-3"
            >
              <div className="flex items-start space-x-3">
                <img
                  src="/profile.png"
                  alt={getFullName(comment.author)}
                  className="w-8 h-8 rounded-full border border-orange-200"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="block">
                      <p className="text-sm font-semibold text-gray-900">
                        {getFullName(comment.author)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getEmail(comment.author)}
                      </p>
                    </div>

                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment */}
      {isAuthenticated ? (
        <form
          onSubmit={handleAddComment}
          className="border-t border-orange-100 pt-5"
        >
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Leave a comment
          </h3>
          <textarea
            rows="2"
            className="w-full text-sm border border-orange-200 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={loading}
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={loading || newComment.trim() === ""}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-1.5 rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="border-t border-orange-100 pt-5">
          <p className="text-sm text-gray-600 text-center">
            Please{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              login
            </a>{" "}
            to leave a comment
          </p>
        </div>
      )}
    </div>
  );
}
