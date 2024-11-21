import React, { useState } from 'react';
import { Users, Gift, Mail, Trash2, Loader, Plus } from 'lucide-react';
import { useSecretSantaStore } from '../../store/secretSantaStore';
import WishlistForm from './WishlistForm';

export default function ParticipantList() {
  const { 
    groups,
    selectedGroup,
    loading,
    addParticipant,
    removeParticipant,
    updateParticipant
  } = useSecretSantaStore();

  const [showWishlist, setShowWishlist] = useState<string | null>(null);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    notes: ''
  });

  const group = groups.find(g => g.id === selectedGroup);

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup) return;

    try {
      await addParticipant(selectedGroup, newParticipant);
      setNewParticipant({
        name: '',
        email: '',
        notes: ''
      });
    } catch (error) {
      console.error('Failed to add participant:', error);
    }
  };

  if (!selectedGroup) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Select a group to manage participants</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Participants
        </h2>

        {showWishlist ? (
          <WishlistForm
            groupId={selectedGroup}
            participantId={showWishlist}
            onClose={() => setShowWishlist(null)}
          />
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {group?.participants.map((participant) => {
                const assignedTo = group.participants.find(
                  p => p.id === participant.assigned_to
                );

                return (
                  <div
                    key={participant.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-holiday-green-200 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{participant.name}</h3>
                        <p className="text-sm text-gray-500">{participant.email}</p>
                        {participant.notes && (
                          <p className="text-sm text-gray-600 mt-1">{participant.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowWishlist(participant.id)}
                          className="p-1 text-gray-400 hover:text-holiday-green-600"
                        >
                          <Gift className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeParticipant(selectedGroup, participant.id)}
                          className="p-1 text-gray-400 hover:text-holiday-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${participant.rsvp_status === 'accepted'
                            ? 'bg-holiday-green-100 text-holiday-green-800'
                            : participant.rsvp_status === 'declined'
                            ? 'bg-holiday-red-100 text-holiday-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {participant.rsvp_status.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {participant.wishlist.length} items in wishlist
                        </span>
                      </div>
                      {group.status === 'active' && assignedTo && (
                        <p className="text-sm text-holiday-green-600">
                          Buying for: {assignedTo.name}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleAddParticipant} className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Participant
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={newParticipant.notes}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, notes: e.target.value }))}
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
                  'Add Participant'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}