import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PublishedArticles from "../components/PublishedArticles";
import Drafts from "../components/Drafts";
import Comments from "../components/Comments";

const API_URL = import.meta.env.VITE_API_URL;

export default function History() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("Post");
  const [editingItem, setEditingItem] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/post/my-posts`, {
        withCredentials: true,
      });

      const allPosts = res.data;
      const publishedPosts = allPosts.filter(
        (post) => post.status === "published"
      );
      const draftPosts = allPosts.filter((post) => post.status === "draft");

      setPosts(publishedPosts);
      setDrafts(draftPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
      Swal.fire({
        title: "Error!",
        text: "Failed to load posts. Please try again later.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editingItem?.type === "comment")
      setEditedContent(editingItem.data.comment);
  }, [editingItem]);

  const handleEditClick = (item, type) => {
    if (type === "Post" || type === "draft")
      navigate(`/edit-article/${item._id}`);
    else if (type === "comment")
      setEditingItem({ id: item.id, type, data: item });
  };

  const handleDeleteClick = async (id, type) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      if (type === "Post" || type === "draft") {
        await axios.delete(`${API_URL}/post/${id}`, {
          withCredentials: true,
        });
        setPosts(posts.filter((p) => p._id !== id));
        setDrafts(drafts.filter((d) => d._id !== id));
      }

      if (type === "comment") {
        // Placeholder: add your delete comment API call later
        setComments(comments.filter((c) => c.id !== id));
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your item has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#f97316",
      });
    } catch (err) {
      console.error("Error deleting item:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete item. Please try again.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    }
  };

  const handleSave = () => {
    if (editingItem?.type !== "comment") return;

    setComments(
      comments.map((c) =>
        c.id === editingItem.id ? { ...c, comment: editedContent } : c
      )
    );
    setEditingItem(null);

    Swal.fire({
      title: "Saved!",
      text: "Comment updated successfully.",
      icon: "success",
      confirmButtonColor: "#f97316",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Modal Edit Comment */}
      {editingItem && editingItem.type === "comment" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">History</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-orange-100 flex">
          {["Post", "drafts", "comments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "Post"
                ? "Published Articles"
                : tab === "drafts"
                ? "Drafts"
                : "Comments"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "Post" && (
            <PublishedArticles
              posts={posts}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
          {activeTab === "drafts" && (
            <Drafts
              drafts={drafts}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
          {activeTab === "comments" && (
            <Comments
              comments={comments}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
