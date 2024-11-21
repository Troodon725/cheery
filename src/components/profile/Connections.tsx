import React from 'react';
import { useProfileStore } from '../../store/profileStore';
import { Users, UserPlus, UserMinus } from 'lucide-react';

export default function Connections() {
  const { 
    connections, 
    loading,
    sendConnectionRequest,
    acceptConnectionRequest,
    removeConnection
  } = useProfileStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2" />
        Connections
      </h2>

      <div className="space-y-4">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">User Name</p>
                <p className="text-sm text-gray-500">
                  {connection.status === 'pending' ? 'Pending' : 'Connected'}
                </p>
              </div>
            </div>
            {connection.status === 'pending' ? (
              <button
                onClick={() => acceptConnectionRequest(connection.id)}
                className="btn btn-primary btn-sm"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Accept
              </button>
            ) : (
              <button
                onClick={() => removeConnection(connection.id)}
                className="btn btn-secondary btn-sm"
              >
                <UserMinus className="w-4 h-4 mr-1" />
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}