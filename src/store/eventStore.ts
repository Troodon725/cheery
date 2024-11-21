import { create } from 'zustand';
import type { Event } from '../lib/types';

// Mock data for development
const mockEvents: Event[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Christmas Dinner',
    date: '2024-12-25',
    time: '18:00',
    location: 'Home',
    theme: 'Traditional Christmas',
    guests: 12,
    description: 'Annual family Christmas dinner'
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'New Year Party',
    date: '2024-12-31',
    time: '20:00',
    location: 'City View Terrace',
    theme: 'Gatsby New Year',
    guests: 25,
    description: 'Ring in the new year with style'
  }
];

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: mockEvents,
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ events: mockEvents });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addEvent: async (event) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEvent: Event = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...event
      };
      set(state => ({ events: [...state.events, newEvent] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        events: state.events.filter(event => event.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateEvent: async (id, event) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        events: state.events.map(e => 
          e.id === id ? { ...e, ...event } : e
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));