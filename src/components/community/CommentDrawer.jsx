import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { useHeritage } from '../../context/HeritageContext';

export const CommentDrawer = ({ isOpen, onClose, story }) => {
  const { showToast } = useHeritage();
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState(story?.comments || []);

  if (!isOpen || !story) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newC = {
      id: `c-${Date.now()}`,
      user: 'Yashasvi Ranjan',
      text: commentText.trim(),
      time: 'Just now'
    };

    setCommentsList(prev => [newC, ...prev]);
    setCommentText('');
    showToast('Comment added to community archive', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-modal border-l border-heritage-border p-6 animate-fade-in">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-heritage-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-heritage-red" />
              <h3 className="font-editorial-heading font-bold text-base text-heritage-textDark">
                Community Discussion
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-heritage-textMuted hover:text-heritage-textDark rounded-lg hover:bg-heritage-bg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-3 text-xs text-heritage-textMuted border-b border-heritage-border">
            Story: <strong className="text-heritage-textDark">"{story.title}"</strong>
          </div>

          {/* Comments List */}
          <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {commentsList.length === 0 ? (
              <p className="text-xs text-heritage-textMuted text-center py-6">
                Be the first to share archival insight or personal context on this story.
              </p>
            ) : (
              commentsList.map(c => (
                <div key={c.id} className="p-3 bg-heritage-bg rounded-2xl border border-heritage-border/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-heritage-textDark">{c.user}</span>
                    <span className="text-[10px] text-heritage-textMuted">{c.time}</span>
                  </div>
                  <p className="text-xs text-heritage-textDark leading-relaxed">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddComment} className="pt-4 border-t border-heritage-border flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your cultural reflection..."
            className="flex-1 px-3.5 py-2.5 bg-heritage-bg border border-heritage-border rounded-xl text-xs font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2.5 bg-heritage-red hover:bg-heritage-deepRed disabled:opacity-50 text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
