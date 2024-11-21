import React from 'react';
import { Calendar } from 'lucide-react';
import EventList from './EventList';
import EventForm from './EventForm';
import { useEventStore } from '../../store/eventStore';

export default function PartyPlanner() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-48" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=2069&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Party Planner</h1>
          <p className="text-xl text-white/90">
            Plan and organize your holiday gatherings
          </p>
        </div>
      </div>

      {/* Event Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EventList />
        </div>
        <div>
          <EventForm />
        </div>
      </div>
    </div>
  );
}