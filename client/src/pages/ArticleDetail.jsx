import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

export default function ArticleDetail() {
  const { id } = useParams();

  // Data contoh artikel tunggal
  const article = {
    id: id,
    title: "Understanding Modern Web Development",
    content: `
      In this article, we'll explore the latest technologies shaping the modern web.
      From frameworks like React and Next.js to backend trends such as serverless and microservices,
      web development continues to evolve at an incredible pace.
    `,
    author: {
      name: "John Doe",
      avatar: "https://source.unsplash.com/random/100x100?face",
    },
    publishDate: "Mar 15, 2024",
    readTime: "5",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header Artikel */}
      <div className="bg-white rounded-xl shadow-md border border-orange-100 p-8 mb-10">
        <Link to="/" className="text-orange-500 hover:text-orange-600 text-sm">
          ← Back to Articles
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center mb-6">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-12 h-12 rounded-full mr-4 border-2 border-orange-200"
          />
          <div>
            <p className="text-gray-800 font-semibold">{article.author.name}</p>
            <p className="text-sm text-gray-500">
              {article.publishDate} · {article.readTime} min read
            </p>
          </div>
        </div>

        <div className="prose prose-orange text-gray-700 max-w-none leading-relaxed">
          {article.content}
        </div>
      </div>

      {/* Komentar Section */}
      <CommentSection
        initialComments={[
          {
            id: 1,
            name: "Alice",
            avatar: "https://source.unsplash.com/random/50x50?girl",
            text: "Great article! Really enjoyed reading this.",
            date: "Apr 10, 2024",
          },
          {
            id: 2,
            name: "Bob",
            avatar: "https://source.unsplash.com/random/50x50?man",
            text: "Thanks for sharing, this helped me understand better!",
            date: "Apr 11, 2024",
          },
        ]}
      />
    </div>
  );
}
