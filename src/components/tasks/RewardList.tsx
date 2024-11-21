import React, { useEffect } from 'react';
import { Gift, Trash2, Loader } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';

export default function RewardList() {
  const { 
    rewards, 
    userPoints,
    loading, 
    error, 
    fetchRewards,
    claimReward,
    deleteReward
  } = useTaskStore();

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

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
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <Gift className="w-5 h-5 mr-2" />
        Available Rewards
      </h2>
      
      {rewards.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No rewards available yet. Add some rewards to motivate task completion!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:border-holiday-red-200 transition-all"
            >
              {reward.image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={reward.image_url}
                    alt={reward.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{reward.title}</h3>
                    <p className="text-sm text-gray-500">{reward.description}</p>
                  </div>
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteReward(reward.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-holiday-green-100 text-holiday-green-800">
                    {reward.category}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {reward.points_required} points
                  </span>
                </div>

                {reward.available ? (
                  <button
                    onClick={() => claimReward(reward.id)}
                    disabled={userPoints < reward.points_required}
                    className={`mt-4 w-full btn ${
                      userPoints >= reward.points_required
                        ? 'btn-primary'
                        : 'btn-secondary opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= reward.points_required
                      ? 'Claim Reward'
                      : `Need ${reward.points_required - userPoints} more points`}
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full btn btn-secondary opacity-50 cursor-not-allowed"
                  >
                    Claimed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}