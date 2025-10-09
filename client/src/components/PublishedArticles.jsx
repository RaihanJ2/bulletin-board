import { Link } from "react-router-dom";

export default function PublishedArticles({ posts, onDelete }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
        >
          {/* Bagian kiri: Judul dan info artikel */}
          <Link to={`/post/${post.id}`} className="flex-grow">
            <div>
              <h3 className="font-medium text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-500">
                Published on {post.date} · {post.views} views
              </p>
            </div>
          </Link>

          {/* Bagian kanan: Status + tombol aksi */}
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 hidden sm:inline-block">
              {post.status}
            </span>

            {/* Tombol Edit menggunakan Link menuju halaman edit */}
            <Link
              to={`/edit-article/${post.id}`}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Edit
            </Link>

            {/* Tombol Delete */}
            <button
              onClick={() => onDelete(post.id, "Post")}
              className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Jika tidak ada postingan */}
      {posts.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-6">
          No published articles found.
        </p>
      )}
    </div>
  );
}
