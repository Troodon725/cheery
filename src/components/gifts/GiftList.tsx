import React, { useEffect } from 'react';
import { GiftIcon, Loader, Trash2, Check, Package } from 'lucide-react';
import { useGiftStore } from '../../store/giftStore';

export default function GiftList() {
  const { 
    gifts, 
    recipients,
    loading, 
    error, 
    selectedRecipient,
    fetchGifts,
    deleteGift,
    updateGiftStatus
  } = useGiftStore();

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[200px]">
        <Loader className="w-6 h-6 animate-spin text-holiday-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  const recipient = recipients.find(r => r.id === selectedRecipient);
  const recipientGifts = gifts.filter(g => g.recipient_id === selectedRecipient);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <GiftIcon className="w-5 h-5 mr-2" />
        Gifts for {recipient?.name}
      </h2>
      
      {recipientGifts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No gifts added yet. Add your first gift!
        </p>
      ) : (
        <div className="space-y-4">
          {recipientGifts.map((gift) => (
            <div
              key={gift.id}
              className="relative group p-4 bg-white rounded-lg border border-gray-200 hover:border-holiday-red-200 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{gift.name}</h3>
                  <p className="text-sm text-gray-500">${gift.price.toFixed(2)}</p>
                  {gift.url && (
                    <a
                      href={gift.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-holiday-green-600 hover:underline"
                    >
                      View Product
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {gift.status === 'pending' && (
                    <button
                      onClick={() => updateGiftStatus(gift.id, 'purchased')}
                      className="p-1 text-gray-400 hover:text-holiday-green-600"
                      title="Mark as purchased"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {gift.status === 'purchased' && (
                    <button
                      onClick={() => updateGiftStatus(gift.id, 'wrapped')}
                      className="p-1 text-gray-400 hover:text-holiday-green-600"
                      title="Mark as wrapped"
                    >
                      <Package className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteGift(gift.id)}
                    className="p-1 text-gray-400 hover:text-holiday-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {gift.notes && (
                <p className="mt-2 text-sm text-gray-500">{gift.notes}</p>
              )}
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${gift.status === 'wrapped'
                    ? 'bg-holiday-green-100 text-holiday-green-800'
                    : gift.status === 'purchased'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {gift.status.charAt(0).toUpperCase() + gift.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}