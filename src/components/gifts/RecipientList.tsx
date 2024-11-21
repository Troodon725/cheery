import React, { useEffect } from 'react';
import { Users, Trash2, Gift as GiftIcon, Loader } from 'lucide-react';
import { useGiftStore } from '../../store/giftStore';

export default function RecipientList() {
  const { 
    recipients, 
    gifts,
    loading, 
    error, 
    fetchRecipients,
    deleteRecipient,
    selectedRecipient,
    setSelectedRecipient
  } = useGiftStore();

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
        <Users className="w-5 h-5 mr-2" />
        Recipients
      </h2>
      
      {recipients.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No recipients added yet. Add your first gift recipient!
        </p>
      ) : (
        <div className="space-y-4">
          {recipients.map((recipient) => {
            const recipientGifts = gifts.filter(g => g.recipient_id === recipient.id);
            const spent = recipientGifts.reduce((sum, g) => sum + g.price, 0);
            const remaining = recipient.budget - spent;
            
            return (
              <div
                key={recipient.id}
                className={`relative group p-4 rounded-lg border transition-all cursor-pointer
                  ${selectedRecipient === recipient.id 
                    ? 'border-holiday-green-500 bg-holiday-green-50' 
                    : 'border-gray-200 hover:border-holiday-green-200'
                  }`}
                onClick={() => setSelectedRecipient(recipient.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{recipient.name}</h3>
                    <p className="text-sm text-gray-500">{recipient.relationship}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      {recipient.interests.map((interest) => (
                        <span
                          key={interest}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-holiday-green-100 text-holiday-green-800"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecipient(recipient.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <GiftIcon className="w-4 h-4 mr-1" />
                    {recipientGifts.length} gifts
                  </div>
                  <div className="space-x-2">
                    <span className="text-holiday-red-600">
                      Spent: ${spent.toFixed(2)}
                    </span>
                    <span className="text-holiday-green-600">
                      Left: ${remaining.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}