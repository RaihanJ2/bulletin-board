import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  // Fetch user's comments
  useEffect(() => {
    fetchUserComments();
  }, []);

  const fetchUserComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/comment/my-comments`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      Swal.fire("Error", "Failed to load your comments.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const handleEdit = (comment) => {
    setSelectedComment(comment);
    setEditedComment(comment.content);
    setIsModalOpen(true);
  };

  // Save edited comment
  const handleSave = async () => {
    try {
      await axios.put(
        `${API_URL}/comment/${selectedComment._id}`,
        { content: editedComment },
        { withCredentials: true }
      );

      setComments((prevComments) =>
        prevComments.map((c) =>
          c._id === selectedComment._id ? { ...c, content: editedComment } : c
        )
      );
      setIsModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your comment has been updated successfully.",
        confirmButtonColor: "#f97316",
      });
    } catch (error) {
      console.error("Error updating comment:", error);
      Swal.fire("Error", "Failed to update the comment.", "error");
    }
  };

  // Delete comment
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/comment/${id}`, {
        withCredentials: true,
      });

      setComments((prevComments) => prevComments.filter((c) => c._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your comment has been deleted.",
        confirmButtonColor: "#f97316",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      Swal.fire("Error", "Failed to delete the comment.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't made any comments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="font-medium text-gray-900">
                {comment.post?.title || "Post deleted"}
              </p>
              <p className="mt-2 text-gray-600 text-sm">"{comment.content}"</p>
              <p className="mt-2 text-xs text-gray-500">
                Commented on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-4 flex-shrink-0">
              <button
                onClick={() => handleEdit(comment)}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(comment._id)}
                className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Comment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Comment
            </h2>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              rows={4}
              className="w-full border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
