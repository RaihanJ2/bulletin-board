import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Editrticle() {
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    summary: '',
    content: '',
    image: null,
    imagePreview: null,
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('summary', article.summary);
    formData.append('content', article.content);
    formData.append('category', article.category);
    if (article.image) {
      formData.append('image', article.image);
    }

    const response = await fetch('/api/articles', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    navigate(`/articles/${data.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Edit Article</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => setArticle({...article, title: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter article title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={article.category}
              onChange={(e) => setArticle({...article, category: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
            </select>
          </div>

    
      

          {/* Summary Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <textarea
              value={article.summary}
              onChange={(e) => setArticle({...article, summary: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              rows="3"
              placeholder="Brief summary of your article"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={article.content}
              onChange={(e) => setArticle({...article, content: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              rows="12"
              placeholder="Write your article content here..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Edit Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
