import { create } from 'zustand';
import type { Gift, Recipient } from '../lib/types';

// Mock data for development
const mockRecipients: Recipient[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Mom',
    relationship: 'Family',
    budget: 150,
    interests: ['Cooking', 'Gardening', 'Books'],
    occasion: 'Christmas'
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Dad',
    relationship: 'Family',
    budget: 150,
    interests: ['Golf', 'Technology', 'Coffee'],
    occasion: 'Christmas'
  }
];

const mockGifts: Gift[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    recipient_id: '1',
    name: 'Premium Cookbook Collection',
    price: 89.99,
    status: 'purchased',
    url: 'https://example.com/cookbook',
    notes: 'Special edition with garden-to-table recipes'
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    recipient_id: '2',
    name: 'Smart Coffee Maker',
    price: 129.99,
    status: 'pending',
    url: 'https://example.com/coffee-maker',
    notes: 'Programmable with phone app'
  }
];

interface GiftState {
  recipients: Recipient[];
  gifts: Gift[];
  loading: boolean;
  error: string | null;
  selectedRecipient: string | null;
  fetchRecipients: () => Promise<void>;
  fetchGifts: () => Promise<void>;
  addRecipient: (recipient: Omit<Recipient, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  addGift: (gift: Omit<Gift, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  updateGiftStatus: (id: string, status: Gift['status']) => Promise<void>;
  deleteGift: (id: string) => Promise<void>;
  deleteRecipient: (id: string) => Promise<void>;
  setSelectedRecipient: (id: string | null) => void;
}

export const useGiftStore = create<GiftState>((set, get) => ({
  recipients: mockRecipients,
  gifts: mockGifts,
  loading: false,
  error: null,
  selectedRecipient: null,

  fetchRecipients: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ recipients: mockRecipients });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchGifts: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ gifts: mockGifts });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addRecipient: async (recipient) => {
    set({ loading: true, error: null });
    try {
      const newRecipient: Recipient = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...recipient
      };
      set(state => ({ recipients: [...state.recipients, newRecipient] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addGift: async (gift) => {
    set({ loading: true, error: null });
    try {
      const newGift: Gift = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...gift
      };
      set(state => ({ gifts: [...state.gifts, newGift] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateGiftStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        gifts: state.gifts.map(gift =>
          gift.id === id ? { ...gift, status } : gift
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteGift: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        gifts: state.gifts.filter(gift => gift.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteRecipient: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        recipients: state.recipients.filter(recipient => recipient.id !== id),
        gifts: state.gifts.filter(gift => gift.recipient_id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedRecipient: (id) => {
    set({ selectedRecipient: id });
  }
}));