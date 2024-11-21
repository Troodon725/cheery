import React, { useEffect } from 'react';
import { Users, Calendar, DollarSign, Trash2, Loader, Gift } from 'lucide-react';
import { useSecretSantaStore } from '../../store/secretSantaStore';

export default function GroupList() {
  const { 
    groups, 
    loading, 
    error, 
    fetchGroups,
    deleteGroup,
    selectedGroup,
    setSelectedGroup,
    assignSantas
  } = useSecretSantaStore();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

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
        <Gift className="w-5 h-5 mr-2" />
        Gift Exchange Groups
      </h2>
      
      {groups.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No groups created yet. Start your first Secret Santa group!
        </p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`relative group p-4 rounded-lg border transition-all cursor-pointer
                ${selectedGroup === group.id 
                  ? 'border-holiday-green-500 bg-holiday-green-50' 
                  : 'border-gray-200 hover:border-holiday-green-200'
                }`}
              onClick={() => setSelectedGroup(group.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description}</p>
                  
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(group.event_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <DollarSign className="w-4 h-4 mr-1" />
                      ${group.budget}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {group.participants.length} participants
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {group.status === 'pending' && group.participants.length >= 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        assignSantas(group.id);
                      }}
                      className="px-3 py-1 text-sm bg-holiday-green-100 text-holiday-green-700 rounded-full hover:bg-holiday-green-200"
                    >
                      Assign Santas
                    </button>
                  )}
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGroup(group.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${group.status === 'completed'
                    ? 'bg-gray-100 text-gray-800'
                    : group.status === 'active'
                    ? 'bg-holiday-green-100 text-holiday-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                </span>
                {group.theme && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-holiday-red-100 text-holiday-red-800">
                    {group.theme}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}