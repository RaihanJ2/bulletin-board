export default function Drafts({ drafts, onEdit, onDelete }) {
  if (drafts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No drafts found. Start writing to create your first draft!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <div
          key={draft._id}
          className="flex items-center justify-between p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900">{draft.title}</h3>
            <p className="text-sm text-gray-500">
              Last edited:{" "}
              {new Date(draft.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            {draft.tags && draft.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {draft.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
                {draft.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{draft.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 hidden sm:inline-block">
              Draft
            </span>

            {/* Continue button to edit page */}
            <button
              onClick={() => onEdit(draft, "draft")}
              className="px-3 py-1.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-md hover:bg-orange-200 transition-colors"
            >
              Continue
            </button>

            <button
              onClick={() => onDelete(draft._id, "draft")}
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
