import React, { useState } from 'react';
import { Gift, Loader, Trash2, X } from 'lucide-react';
import { useSecretSantaStore } from '../../store/secretSantaStore';
import type { WishlistItem } from '../../lib/types';

interface WishlistFormProps {
  groupId: string;
  participantId: string;
  onClose: () => void;
}

export default function WishlistForm({ groupId, participantId, onClose }: WishlistFormProps) {
  const { 
    groups,
    loading,
    addWishlistItem,
    removeWishlistItem,
    updateWishlistItem
  } = useSecretSantaStore();

  const [newItem, setNewItem] = useState({
    name: '',
    url: '',
    price: '',
    priority: 'medium' as WishlistItem['priority'],
    notes: ''
  });

  const group = groups.find(g => g.id === groupId);
  const participant = group?.participants.find(p => p.id === participantId);

  if (!participant) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addWishlistItem(groupId, participantId, {
        name: newItem.name,
        url: newItem.url || undefined,
        price: newItem.price ? parseFloat(newItem.price) : undefined,
        priority: newItem.priority,
        notes: newItem.notes || undefined
      });
      setNewItem({
        name: '',
        url: '',
        price: '',
        priority: 'medium',
        notes: ''
      });
    } catch (error) {
      console.error('Failed to add wishlist item:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Gift className="w-5 h-5 mr-2" />
          {participant.name}'s Wishlist
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {participant.wishlist.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-holiday-green-200 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-holiday-green-600 hover:underline"
                  >
                    View Product
                  </a>
                )}
                {item.notes && (
                  <p className="text-sm text-gray-500 mt-1">{item.notes}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeWishlistItem(groupId, participantId, item.id)}
                  className="p-1 text-gray-400 hover:text-holiday-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              {item.price && (
                <span className="text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </span>
              )}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${item.priority === 'high'
                  ? 'bg-holiday-red-100 text-holiday-red-800'
                  : item.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
                }`}
              >
                {item.priority.toUpperCase()} Priority
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="font-medium text-gray-900">Add Item</h4>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (Optional)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="price"
                value={newItem.price}
                onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
                min="0"
                step="0.01"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={newItem.priority}
              onChange={(e) => setNewItem(prev => ({ 
                ...prev, 
                priority: e.target.value as WishlistItem['priority']
              }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              required
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Product URL (Optional)
          </label>
          <input
            type="url"
            id="url"
            value={newItem.url}
            onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={newItem.notes}
            onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
            rows={2}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            'Add Item'
          )}
        </button>
      </form>
    </div>
  );
}