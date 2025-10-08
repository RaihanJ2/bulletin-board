import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([
    { id: 1, title: "React Router Simplified", date: "Mar 15, 2024", views: 234, status: 'published' },
    { id: 2, title: "Introduction to Node.js", date: "Mar 10, 2024", views: 156, status: 'published' }
  ]);

  const [drafts, setDrafts] = useState([
    { id: 3, title: "Understanding Express Middleware", lastEdited: "Apr 20, 2024", status: 'draft' },
    { id: 4, title: "Mastering Async/Await in JavaScript", lastEdited: "Apr 17, 2024", status: 'draft' }
  ]);

  const [comments, setComments] = useState([
    { id: 1, articleTitle: "Understanding Modern Web Development", comment: "Great article! Very helpful.", date: "Mar 16, 2024" },
    { id: 2, articleTitle: "Getting Started with React", comment: "This helped me understand hooks better.", date: "Mar 14, 2024" }
  ]);

  const [activeTab, setActiveTab] = useState('articles');
  const [editingItem, setEditingItem] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (editingItem && editingItem.type === 'comment') {
      setEditedContent(editingItem.data.comment);
    }
  }, [editingItem]);

  const handleEditClick = (item, type) => {
    if (type === 'article' || type === 'draft') {
      navigate(`/edit-article/${item.id}`);
    } else if (type === 'comment') {
      setEditingItem({ id: item.id, type: type, data: item });
    }
  };
  
  const handleDeleteClick = (itemId, itemType) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus item ini? Ini tidak dapat dibatalkan.")) {
      return;
    }

    switch (itemType) {
      case 'article':
        setArticles(currentArticles => currentArticles.filter(article => article.id !== itemId));
        break;
      case 'draft':
        setDrafts(currentDrafts => currentDrafts.filter(draft => draft.id !== itemId));
        break;
      case 'comment':
        setComments(currentComments => currentComments.filter(comment => comment.id !== itemId));
        break;
      default:
        console.error("Unknown item type for deletion");
    }
  };

  const handleSave = () => {
    if (!editingItem || editingItem.type !== 'comment') return;
    const updatedComments = comments.map(comment =>
      comment.id === editingItem.id
        ? { ...comment, comment: editedContent }
        : comment
    );
    setComments(updatedComments);
    setEditingItem(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Modal untuk edit komentar */}
      {editingItem && editingItem.type === 'comment' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kartu utama halaman settings */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        {/* Tab Navigasi */}
        <div className="border-b border-orange-100">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'articles'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Published Articles
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'drafts'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'comments'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Comments
            </button>
          </div>
        </div>

        {/* Konten tiap tab */}
        <div className="p-6">
          {activeTab === 'articles' && (
            <div className="space-y-4">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
                >
                  <Link to={`/article/${article.id}`} className="flex-grow">
                    <div>
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <p className="text-sm text-gray-500">
                        Published on {article.date} · {article.views} views
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 hidden sm:inline-block">
                      {article.status}
                    </span>
                    {/* PERUBAHAN TAMPILAN TOMBOL */}
                    <button
                      onClick={() => handleEditClick(article, 'article')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(article.id, 'article')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'drafts' && (
            <div className="space-y-4">
              {drafts.map(draft => (
                <div
                  key={draft.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{draft.title}</h3>
                    <p className="text-sm text-gray-500">Last edited: {draft.lastEdited}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 hidden sm:inline-block">
                      {draft.status}
                    </span>
                     {/* PERUBAHAN TAMPILAN TOMBOL */}
                    <button
                      onClick={() => handleEditClick(draft, 'draft')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-md hover:bg-orange-200 transition-colors"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      Continue
                    </button>
                    <button
                      onClick={() => handleDeleteClick(draft.id, 'draft')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 rounded-lg border border-orange-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">{comment.articleTitle}</p>
                      <p className="mt-2 text-gray-600 text-sm">"{comment.comment}"</p>
                      <p className="mt-2 text-xs text-gray-500">
                        Commented on {comment.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      {/* PERUBAHAN TAMPILAN TOMBOL */}
                      <button
                        onClick={() => handleEditClick(comment, 'comment')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(comment.id, 'comment')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

