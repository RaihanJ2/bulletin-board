import { useState } from "react";

export default function Comments() {
  // ✅ Dummy data komentar
  const [comments, setComments] = useState([
    {
      id: 1,
      PostTitle: "Understanding React Context API",
      comment: "This article really helped me understand state sharing!",
      date: "2025-10-04",
    },
    {
      id: 2,
      PostTitle: "Building a REST API with Node.js and Express",
      comment: "Great explanation on routing and middleware!",
      date: "2025-09-30",
    },
    {
      id: 3,
      PostTitle: "Modern CSS Techniques for Responsive Design",
      comment: "Loved the CSS Grid examples, very practical.",
      date: "2025-09-25",
    },
  ]);

  // ✅ State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  // ✅ Buka modal edit
  const handleEdit = (comment) => {
    setSelectedComment(comment);
    setEditedComment(comment.comment);
    setIsModalOpen(true);
  };

  // ✅ Simpan hasil edit
  const handleSave = () => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === selectedComment.id ? { ...c, comment: editedComment } : c
      )
    );
    setIsModalOpen(false);
    alert("Comment updated successfully!");
  };

  // ✅ Hapus komentar
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setComments((prevComments) => prevComments.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="font-medium text-gray-900">{comment.PostTitle}</p>
              <p className="mt-2 text-gray-600 text-sm">"{comment.comment}"</p>
              <p className="mt-2 text-xs text-gray-500">
                Commented on {comment.date}
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
                onClick={() => handleDelete(comment.id)}
                className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ✅ Modal Edit Komentar */}
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
