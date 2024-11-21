import React from 'react';
import { useProfileStore } from '../../store/profileStore';
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react';

export default function SharedItems() {
  const { sharedItems, loading, toggleLike, addComment, deleteSharedItem } = useProfileStore();
  const [newComment, setNewComment] = React.useState('');
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const handleComment = async (itemId: string) => {
    if (!newComment.trim()) return;
    await addComment(itemId, newComment);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {sharedItems.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm">
          {/* Item Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">You shared a {item.item_type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {activeItem === item.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => deleteSharedItem(item.id)}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Item Content */}
          <div className="p-4">
            <p className="text-gray-800">{item.caption}</p>
          </div>

          {/* Item Actions */}
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleLike(item.id)}
                className="flex items-center text-gray-500 hover:text-holiday-red-600"
              >
                <Heart className="w-5 h-5 mr-1" />
                <span>{item.likes}</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-holiday-green-600">
                <MessageCircle className="w-5 h-5 mr-1" />
                <span>{item.comments.length}</span>
              </button>
            </div>
            <button className="flex items-center text-gray-500 hover:text-holiday-green-600">
              <Share2 className="w-5 h-5 mr-1" />
              Share
            </button>
          </div>

          {/* Comments */}
          <div className="px-4 py-3 border-t">
            <div className="space-y-3">
              {item.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src="https://via.placeholder.com/32"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">User</span>{' '}
                      {comment.content}
                    </p>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                      <button className="hover:text-holiday-red-600">Like</button>
                      <span>·</span>
                      <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4 flex space-x-3">
              <img
                src="https://via.placeholder.com/32"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-holiday-green-500"
                />
                <button
                  onClick={() => handleComment(item.id)}
                  className="mt-2 text-sm font-medium text-holiday-green-600 hover:text-holiday-green-700"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}