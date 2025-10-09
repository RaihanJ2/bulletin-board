import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [posts, setposts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // --- Fetch data artikel dari backend ---
  useEffect(() => {
    const fetchposts = async () => {
      try {
        const res = await axios.get(`${API_URL}/post`);
        setposts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchposts();
  }, []);

  // --- Filter kategori ---
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(
          (post) =>
            post.category &&
            post.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // --- Pagination ---
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Daftar kategori ---
  const categories = ["All", "Programming", "Design", "Business", "Technology"];

  // --- Fungsi Pagination ---
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl rounded font-bold mb-4">
            Share Your Knowledge
          </h1>
          <p className="text-xl mb-8">Discover and create amazing Posts</p>
          <Link
            to="/create-post"
            className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
          >
            Start Writing
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* posts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-300 text-gray-700 hover:bg-orange-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* post List */}
          <div className="space-y-6">
            {currentPosts.map((post) => (
              <Link
                to={`/post/${post.slug}`}
                key={post.slug}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {post.title}
                </h3>
                <div className="text-sm text-gray-500 mb-3">
                  By{" "}
                  <span className="text-gray-700 font-medium">
                    {post.author?.name || "Unknown Author"}
                  </span>{" "}
                  • <span>{post.date || "No date"}</span>
                </div>
                <div className="text-orange-500 text-sm font-medium mb-3">
                  {post.category || "Uncategorized"}
                </div>
                <p className="text-gray-600">
                  {post.content
                    ? post.content.substring(0, 100) + "..."
                    : "No description available."}
                </p>
              </Link>
            ))}

            {filteredPosts.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No posts found for this category.
              </p>
            )}
          </div>

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center items-center space-x-3 mt-10">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Prev
              </button>
              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* Quick Upload Section */}
        <section className="bg-orange-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to share your story?
              </h2>
              <p className="text-gray-600">
                Start writing and reach thousands of readers.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/create-post"
                className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                New post
              </Link>
              <Link
                to="/settings"
                className="border border-orange-500 text-orange-500 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              >
                History Post
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
