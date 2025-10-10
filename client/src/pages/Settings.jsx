import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublishedArticles from "../components/PublishedArticles";
import Drafts from "../components/Drafts";
import Comments from "../components/Comments";

export default function Settings() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "React Router Simplified",
      date: "Mar 15, 2024",
      views: 234,
      status: "published",
    },
    {
      id: 2,
      title: "Introduction to Node.js",
      date: "Mar 10, 2024",
      views: 156,
      status: "published",
    },
  ]);
  const [drafts, setDrafts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("Post");
  const [editingItem, setEditingItem] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (editingItem?.type === "comment")
      setEditedContent(editingItem.data.comment);
  }, [editingItem]);

  const handleEditClick = (item, type) => {
    if (type === "Post" || type === "draft") navigate(`/edit-post/${item.id}`);
    else if (type === "comment")
      setEditingItem({ id: item.id, type, data: item });
  };

  const handleDeleteClick = (id, type) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    if (type === "Post") setPosts(posts.filter((p) => p.id !== id));
    if (type === "draft") setDrafts(drafts.filter((d) => d.id !== id));
    if (type === "comment") setComments(comments.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (editingItem?.type !== "comment") return;
    setComments(
      comments.map((c) =>
        c.id === editingItem.id ? { ...c, comment: editedContent } : c
      )
    );
    setEditingItem(null);
  };

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

      {/* Container utama */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

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
