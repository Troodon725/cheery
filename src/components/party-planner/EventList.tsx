import React, { useEffect } from 'react';
import { Calendar, Users, Trash2, Edit, Loader } from 'lucide-react';
import { useEventStore } from '../../store/eventStore';

export default function EventList() {
  const { events, loading, error, fetchEvents, deleteEvent } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[300px]">
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
        <Calendar className="w-5 h-5 mr-2" />
        Upcoming Events
      </h2>
      
      {events.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No events planned yet. Create your first event!
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative group p-4 bg-white rounded-lg border border-holiday-green-100 hover:border-holiday-green-200 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{event.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} at {event.time}
                  </p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-green-600"
                    onClick={() => {/* TODO: Implement edit */}}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-red-600"
                    onClick={() => deleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-holiday-green-100 text-holiday-green-800">
                  {event.theme}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {event.guests} guests
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}