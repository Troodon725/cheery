import React from 'react';
import { Trophy } from 'lucide-react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import RewardList from './RewardList';
import RewardForm from './RewardForm';
import { useTaskStore } from '../../store/taskStore';

export default function TasksAndRewards() {
  const { userPoints } = useTaskStore();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-cover bg-center h-48" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90"></div>
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Tasks & Rewards</h1>
          <p className="text-xl text-white/90">
            Complete tasks, earn points, claim rewards!
          </p>
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">{userPoints} Points Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TaskList />
        </div>
        <div>
          <TaskForm />
        </div>
      </div>

      {/* Rewards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RewardList />
        </div>
        <div>
          <RewardForm />
        </div>
      </div>
    </div>
  );
}