import { Link } from "react-router-dom";

export default function Drafts() {
  // ✅ Dummy data langsung di dalam file
  const drafts = [
    {
      id: 1,
      title: "Understanding React Context API",
      lastEdited: "2025-10-03",
      status: "Draft",
    },
    {
      id: 2,
      title: "Building a REST API with Node.js and Express",
      lastEdited: "2025-09-28",
      status: "Draft",
    },
    {
      id: 3,
      title: "Modern CSS Techniques for Responsive Design",
      lastEdited: "2025-09-15",
      status: "Draft",
    },
  ];

  // ✅ Fungsi dummy untuk hapus draft
  const handleDelete = (id) => {
    alert(`Draft with ID ${id} deleted (dummy action)`);
  };

  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <div
          key={draft.id}
          className="flex items-center justify-between p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900">{draft.title}</h3>
            <p className="text-sm text-gray-500">
              Last edited: {draft.lastEdited}
            </p>
          </div>

          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 hidden sm:inline-block">
              {draft.status}
            </span>

            {/* Tombol Continue menuju ke halaman edit */}
            <Link
              to={`/edit-article/${draft.id}`}
              className="px-3 py-1.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-md hover:bg-orange-200 transition-colors"
            >
              Continue
            </Link>

            <button
              onClick={() => handleDelete(draft.id)}
              className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
