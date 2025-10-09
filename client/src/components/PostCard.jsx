export default function ArticleCard({ article }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] border border-orange-100">
      <img
        src={article.coverImage}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-orange-600">{article.author.name}</p>
            <p className="text-sm text-gray-500">{article.publishDate}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-500">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-orange-500 text-sm">
            <span className="mr-3">
              {article.readTime} min read
            </span>
            <button className="hover:text-orange-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
