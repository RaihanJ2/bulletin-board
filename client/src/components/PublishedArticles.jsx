import { Link } from "react-router-dom";

export default function PublishedArticles({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>
          No published articles yet. Start writing to publish your first
          article!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex items-center justify-between p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900">{post.title}</h3>
            <p className="text-sm text-gray-500">
              Published:{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span> {post.views || 0} views</span>
              <span> {post.likes || 0} likes</span>
              <span> {post.comments?.length || 0} comments</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 hidden sm:inline-block">
              Published
            </span>

            {/* View article button */}
            {post.slug && (
              <Link
                to={`/post/${post.slug}`}
                className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
              >
                View
              </Link>
            )}

            {/* Edit button */}
            <button
              onClick={() => onEdit(post, "Post")}
              className="px-3 py-1.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-md hover:bg-orange-200 transition-colors"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(post._id, "Post")}
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
