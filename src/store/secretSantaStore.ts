import { create } from 'zustand';
import type { SecretSantaGroup, Participant, WishlistItem } from '../lib/types';

// Mock data for development
const mockGroups: SecretSantaGroup[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Family Secret Santa 2024',
    description: 'Annual family gift exchange',
    event_date: '2024-12-24',
    budget: 50,
    theme: 'Handmade Gifts',
    status: 'active',
    participants: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        wishlist: [
          {
            id: '1',
            name: 'Knitted Scarf',
            priority: 'high',
            notes: 'Preferably in blue or green'
          }
        ],
        assigned_to: '2',
        rsvp_status: 'accepted'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        wishlist: [
          {
            id: '2',
            name: 'Handmade Candles',
            priority: 'medium',
            notes: 'Love vanilla scents'
          }
        ],
        assigned_to: '1',
        rsvp_status: 'accepted'
      }
    ]
  }
];

interface SecretSantaState {
  groups: SecretSantaGroup[];
  loading: boolean;
  error: string | null;
  selectedGroup: string | null;
  fetchGroups: () => Promise<void>;
  addGroup: (group: Omit<SecretSantaGroup, 'id' | 'created_at' | 'user_id' | 'status' | 'participants'>) => Promise<void>;
  updateGroup: (id: string, group: Partial<SecretSantaGroup>) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  addParticipant: (groupId: string, participant: Omit<Participant, 'id' | 'wishlist' | 'assigned_to' | 'rsvp_status'>) => Promise<void>;
  removeParticipant: (groupId: string, participantId: string) => Promise<void>;
  updateParticipant: (groupId: string, participantId: string, participant: Partial<Participant>) => Promise<void>;
  addWishlistItem: (groupId: string, participantId: string, item: Omit<WishlistItem, 'id' | 'purchased'>) => Promise<void>;
  removeWishlistItem: (groupId: string, participantId: string, itemId: string) => Promise<void>;
  updateWishlistItem: (groupId: string, participantId: string, itemId: string, item: Partial<WishlistItem>) => Promise<void>;
  assignSantas: (groupId: string) => Promise<void>;
  setSelectedGroup: (id: string | null) => void;
}

export const useSecretSantaStore = create<SecretSantaState>((set, get) => ({
  groups: mockGroups,
  loading: false,
  error: null,
  selectedGroup: null,

  fetchGroups: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ groups: mockGroups });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addGroup: async (group) => {
    set({ loading: true, error: null });
    try {
      const newGroup: SecretSantaGroup = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        status: 'pending',
        participants: [],
        ...group
      };
      set(state => ({ groups: [...state.groups, newGroup] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateGroup: async (id, group) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        groups: state.groups.map(g => 
          g.id === id ? { ...g, ...group } : g
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteGroup: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        groups: state.groups.filter(g => g.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addParticipant: async (groupId, participant) => {
    set({ loading: true, error: null });
    try {
      const newParticipant: Participant = {
        id: Math.random().toString(36).substr(2, 9),
        wishlist: [],
        rsvp_status: 'pending',
        ...participant
      };
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? { ...group, participants: [...group.participants, newParticipant] }
            : group
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeParticipant: async (groupId, participantId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                participants: group.participants.filter(p => p.id !== participantId)
              }
            : group
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateParticipant: async (groupId, participantId, participant) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                participants: group.participants.map(p =>
                  p.id === participantId ? { ...p, ...participant } : p
                )
              }
            : group
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addWishlistItem: async (groupId, participantId, item) => {
    set({ loading: true, error: null });
    try {
      const newItem: WishlistItem = {
        id: Math.random().toString(36).substr(2, 9),
        ...item
      };
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                participants: group.participants.map(p =>
                  p.id === participantId
                    ? { ...p, wishlist: [...p.wishlist, newItem] }
                    : p
                )
              }
            : group
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeWishlistItem: async (groupId, participantId, itemId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                participants: group.participants.map(p =>
                  p.id === participantId
                    ? {
                        ...p,
                        wishlist: p.wishlist.filter(item => item.id !== itemId)
                      }
                    : p
                )
              }
            : group
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateWishlistItem: async (groupId, participantId, itemId, item) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        groups: state.groups.map(group =>
          group.id === groupId
            ? {
                ...group,
                participants: group.participants.map(p =>
                  p.id === participantId
                    ? {
                        ...p,
                        wishlist: p.wishlist.map(i =>
                          i.id === itemId ? { ...i, ...item } : i
                        )
                      }
                    : p
                )
              }
            : group
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  assignSantas: async (groupId) => {
    set({ loading: true, error: null });
    try {
      const group = get().groups.find(g => g.id === groupId);
      if (!group) throw new Error('Group not found');

      const participants = [...group.participants];
      if (participants.length < 2) {
        throw new Error('Need at least 2 participants to assign Santas');
      }

      // Fisher-Yates shuffle
      for (let i = participants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participants[i], participants[j]] = [participants[j], participants[i]];
      }

      // Assign each person to the next person in the shuffled array
      const assignments = participants.map((p, i) => ({
        ...p,
        assigned_to: participants[(i + 1) % participants.length].id
      }));

      set(state => ({
        groups: state.groups.map(g =>
          g.id === groupId
            ? { ...g, participants: assignments, status: 'active' }
            : g
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedGroup: (id) => {
    set({ selectedGroup: id });
  }
}));