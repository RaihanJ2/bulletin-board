import { useState } from "react";
export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      name: "You",
      avatar: "https://source.unsplash.com/random/50x50?user",
      text: newComment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      replies: [],
    };

    setComments([...comments, newEntry]);
    setNewComment("");
  };

  const handleReply = (commentId) => {
    if (replyText.trim() === "") return;

    const updated = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [
            ...(c.replies || []),
            {
              id: Date.now(),
              name: "You",
              avatar: "https://source.unsplash.com/random/50x50?face",
              text: replyText,
              date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            },
          ],
        };
      }
      return c;
    });

    setComments(updated);
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">
        Comments ({comments.length})
      </h2>

      {/* Comment List */}
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-orange-50/40 border border-orange-100 rounded-lg p-3"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-8 h-8 rounded-full border border-orange-200"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900">
                      {comment.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{comment.text}</p>

                  <button
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                    className="text-xs text-orange-600 mt-2 hover:underline font-medium"
                  >
                    Reply
                  </button>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-3 ml-6">
                      <textarea
                        rows="2"
                        className="w-full text-sm border border-orange-200 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => handleReply(comment.id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg shadow-sm transition"
                        >
                          Reply
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                          className="border border-orange-300 text-orange-600 hover:bg-orange-50 text-xs font-medium px-4 py-1.5 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 ml-6 space-y-2">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="flex items-start space-x-3 bg-white border border-orange-100 rounded-md p-2"
                        >
                          <img
                            src={reply.avatar}
                            alt={reply.name}
                            className="w-7 h-7 rounded-full border border-orange-200"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {reply.name}
                              </p>
                              <span className="text-xs text-gray-500">
                                {reply.date}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">
                              {reply.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleAddComment}
        className="border-t border-orange-100 pt-5"
      >
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Leave a comment
        </h3>
        <textarea
          rows="2"
          className="w-full text-sm border border-orange-200 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-1.5 rounded-lg shadow-sm transition"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
