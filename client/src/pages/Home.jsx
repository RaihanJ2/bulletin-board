import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TagDropdown from "../components/TagsDropdown";
import { useAuth } from "../hook/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [posts, setposts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { checkAuth } = useAuth();

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

  useEffect(() => {
    // Check if we just returned from OAuth
    const pendingAuth = sessionStorage.getItem("pendingAuth");
    if (pendingAuth) {
      sessionStorage.removeItem("pendingAuth");
      // Force re-check authentication
      checkAuth();
    }
  }, [checkAuth]);

  // --- Get unique tags from all posts and sort A-Z ---
  const allTags = ["All"];
  const uniqueTags = [];
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (tag && !uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });
    }
  });
  // Sort tags alphabetically and add to allTags
  uniqueTags.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  allTags.push(...uniqueTags);

  // --- Filter by tag ---
  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter(
          (post) =>
            post.tags &&
            post.tags.some(
              (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
            )
        );

  // --- Pagination ---
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Fungsi Pagination ---
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen roboto bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-tr rounded-2xl from-orange-400 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl rounded font-bold mb-4">
            Share Your Knowledge
          </h1>
          <p className="text-xl mb-8">Discover and create amazing Posts</p>
          <Link
            to="/create-post"
            className="inline-block bg-white text-orange-600 px-6 py-3 rounded-2xl font-bold uppercase
       hover:bg-orange-50  hover:scale-105
       transition-transform duration-300 ease-in-out"
          >
            Start Writing
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* posts Section */}
        <section className="mb-12">
          {/* Filter Tags - Custom Dropdown */}
          <TagDropdown
            tags={allTags}
            selectedTag={selectedTag}
            onTagChange={handleTagChange}
          />

          {/* post List */}
          <div className="space-y-6">
            {currentPosts.map((post) => (
              <div
                key={post.slug}
                className="block border-2 border-orange-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <Link to={`/post/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <div className="text-sm text-gray-500 mb-3">
                  By{" "}
                  <span className="text-gray-700 font-medium">
                    {post.author?.fullname || post.author?.email}
                  </span>{" "}
                  •{" "}
                  <span>
                    {new Date(post.createdAt).toLocaleDateString() || "No date"}
                  </span>
                </div>
                {/* Display Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags && post.tags.length > 0 ? (
                    post.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagChange(tag)}
                        className="px-3 py-1 capitalize bg-orange-100 text-orange-600 text-xs font-medium rounded-full hover:bg-orange-200 transition-all cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <span className="text-orange-500 text-sm font-medium">
                      No tags
                    </span>
                  )}
                </div>
                <Link to={`/post/${post.slug}`}>
                  <p className="text-gray-600 hover:text-gray-800 transition-colors">
                    {post.content
                      ? post.content.substring(0, 100) + "..."
                      : "No description available."}
                  </p>
                </Link>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No posts found for this tag.
              </p>
            )}
          </div>

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center items-center space-x-3 mt-10">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 cursor-pointer rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Prev
              </button>
              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 cursor-pointer rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
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
                to="/history"
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
