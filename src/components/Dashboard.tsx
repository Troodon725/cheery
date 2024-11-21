import React from 'react';
import { Calendar, Gift, ChefHat, Box, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Calendar, label: 'Upcoming Events', value: '3' },
  { icon: Gift, label: 'Gifts Planned', value: '12' },
  { icon: ChefHat, label: 'Saved Recipes', value: '8' },
  { icon: Box, label: 'Stored Items', value: '24' },
  { icon: Users, label: 'Secret Santa Groups', value: '2' },
  { icon: Trophy, label: 'Tasks Completed', value: '15' },
];

const backgroundImages = {
  events: "url('https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2070&auto=format&fit=crop')",
  tasks: "url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop')"
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-96" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=2070&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Make Your Holidays Magical</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Plan, organize, and celebrate with ease. From gift-giving to meal planning, 
            we've got everything you need for a perfect holiday season.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/party-planner" 
              className="btn btn-primary bg-white text-holiday-red-600 hover:bg-gray-100"
            >
              Start Planning
            </Link>
            <Link 
              to="/tasks" 
              className="btn btn-secondary bg-transparent text-white border-white hover:bg-white/10"
            >
              View Tasks
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-sm p-6 transition-all hover:scale-105 hover:shadow-md border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-holiday-red-100 to-holiday-green-100 rounded-lg">
                <Icon className="w-6 h-6 text-holiday-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events Card */}
        <div className="relative bg-white rounded-xl shadow-sm overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{ backgroundImage: backgroundImages.events }}
          />
          <div className="relative p-6">
            <h2 className="text-xl font-semibold mb-4 text-holiday-green-700">Upcoming Events</h2>
            <div className="space-y-4">
              {[
                { name: 'Christmas Dinner', date: 'Dec 25, 2024', guests: 12 },
                { name: 'New Year Party', date: 'Dec 31, 2024', guests: 25 },
              ].map((event) => (
                <div
                  key={event.name}
                  className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-holiday-green-100"
                >
                  <div>
                    <p className="font-medium text-gray-800">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <div className="text-sm text-holiday-green-600 font-medium">
                    {event.guests} guests
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tasks Card */}
        <div className="relative bg-white rounded-xl shadow-sm overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{ backgroundImage: backgroundImages.tasks }}
          />
          <div className="relative p-6">
            <h2 className="text-xl font-semibold mb-4 text-holiday-red-600">Recent Tasks</h2>
            <div className="space-y-4">
              {[
                { task: 'Buy Christmas Tree', points: 100, status: 'completed' },
                { task: 'Plan Menu', points: 50, status: 'in-progress' },
                { task: 'Send Invitations', points: 75, status: 'pending' },
              ].map((task) => (
                <div
                  key={task.task}
                  className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-holiday-red-100"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.status === 'completed'
                          ? 'bg-holiday-green-500'
                          : task.status === 'in-progress'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}
                    />
                    <p className="font-medium text-gray-800">{task.task}</p>
                  </div>
                  <div className="text-sm text-holiday-red-600 font-medium">
                    {task.points} points
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}