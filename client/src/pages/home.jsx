import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const allArticles = [
    {
      id: 1,
      title: "Getting Started with React",
      description:
        "Learn the basics of React and start building your first interactive UI easily.",
      author: "John Doe",
      date: "March 15, 2024",
      category: "Programming",
    },
    {
      id: 2,
      title: "Design Principles for Beginners",
      description:
        "Understand the core design principles to make your interfaces beautiful and functional.",
      author: "Sarah Lee",
      date: "April 2, 2024",
      category: "Design",
    },
    {
      id: 3,
      title: "How to Build a Startup in 2024",
      description:
        "Explore key strategies for launching your startup successfully in a digital world.",
      author: "Michael Tan",
      date: "May 10, 2024",
      category: "Business",
    },
    {
      id: 4,
      title: "AI Trends That Will Shape the Future",
      description:
        "A look into the most promising artificial intelligence trends driving innovation today.",
      author: "Alice Kim",
      date: "June 5, 2024",
      category: "Technology",
    },
    {
      id: 5,
      title: "Deep Dive into Node.js",
      description:
        "Explore backend development with Node.js and understand how it powers modern web apps.",
      author: "Kevin Park",
      date: "June 20, 2024",
      category: "Programming",
    },
    {
      id: 6,
      title: "Modern UI Patterns",
      description:
        "Discover the most effective design trends and patterns shaping modern interfaces.",
      author: "Clara Sun",
      date: "July 2, 2024",
      category: "Design",
    },
    {
      id: 7,
      title: "Digital Marketing Strategies",
      description:
        "Learn how to grow your brand and business with proven digital marketing methods.",
      author: "Tim Wong",
      date: "July 15, 2024",
      category: "Business",
    },
  ];

  // --- State Management ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // --- Filtering Logic ---
  const filteredArticles =
    selectedCategory === "All"
      ? allArticles
      : allArticles.filter(
          (article) => article.category === selectedCategory
        );

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Category Options ---
  const categories = ["All", "Programming", "Design", "Business", "Technology"];

  // --- Pagination Controls ---
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // --- Reset halaman ke 1 saat filter berubah ---
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl rounded font-bold mb-4">Share Your Knowledge</h1>
          <p className="text-xl mb-8">Discover and create amazing articles</p>
          <Link
            to="/create-article"
            className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
          >
            Start Writing
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles</h2>

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

          {/* Article List */}
          <div className="space-y-6">
            {currentArticles.map((article) => (
              <Link
                to={`/article/${article.id}`}
                key={article.id}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {article.title}
                </h3>
                <div className="text-sm text-gray-500 mb-3">
                  By{" "}
                  <span className="text-gray-700 font-medium">
                    {article.author}
                  </span>{" "}
                  • <span>{article.date}</span>
                </div>
                <div className="text-orange-500 text-sm font-medium mb-3">
                  {article.category}
                </div>
                <p className="text-gray-600">{article.description}</p>
              </Link>
            ))}

            {filteredArticles.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No articles found for this category.
              </p>
            )}
          </div>

          {/* Pagination */}
          {filteredArticles.length > 0 && (
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
                to="/create-article"
                className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                New Article
              </Link>
              <Link
                to="/Settings"
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
