import { create } from 'zustand';
import type { UserProfile, Connection, SharedItem } from '../lib/types';

// Mock data for development
const mockProfile: UserProfile = {
  id: '1',
  user_id: '1',
  created_at: new Date().toISOString(),
  display_name: 'Holiday Enthusiast',
  bio: 'Love creating magical holiday moments ✨',
  location: 'Winter Wonderland',
  favorite_holiday: 'Christmas',
  interests: ['Baking', 'Decorating', 'Gift Wrapping'],
  is_public: true
};

const mockConnections: Connection[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    follower_id: '1',
    following_id: '2',
    status: 'accepted'
  }
];

const mockSharedItems: SharedItem[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    item_type: 'recipe',
    item_id: '1',
    caption: 'My favorite holiday cookie recipe! 🍪',
    likes: 5,
    comments: [
      {
        id: '1',
        created_at: new Date().toISOString(),
        user_id: '2',
        content: 'These look amazing! Thanks for sharing!',
        likes: 1
      }
    ],
    is_public: true
  }
];

interface ProfileState {
  profile: UserProfile | null;
  connections: Connection[];
  sharedItems: SharedItem[];
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  shareItem: (item: Omit<SharedItem, 'id' | 'created_at' | 'likes' | 'comments'>) => Promise<void>;
  toggleItemVisibility: (itemId: string) => Promise<void>;
  deleteSharedItem: (itemId: string) => Promise<void>;
  addComment: (itemId: string, content: string) => Promise<void>;
  toggleLike: (itemId: string) => Promise<void>;
  toggleCommentLike: (itemId: string, commentId: string) => Promise<void>;
  sendConnectionRequest: (userId: string) => Promise<void>;
  acceptConnectionRequest: (connectionId: string) => Promise<void>;
  removeConnection: (connectionId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: mockProfile,
  connections: mockConnections,
  sharedItems: mockSharedItems,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ profile: mockProfile });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (profile) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        profile: state.profile ? { ...state.profile, ...profile } : null
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  shareItem: async (item) => {
    set({ loading: true, error: null });
    try {
      const newItem: SharedItem = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        likes: 0,
        comments: [],
        ...item
      };
      set(state => ({
        sharedItems: [newItem, ...state.sharedItems]
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  toggleItemVisibility: async (itemId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        sharedItems: state.sharedItems.map(item =>
          item.id === itemId
            ? { ...item, is_public: !item.is_public }
            : item
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteSharedItem: async (itemId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        sharedItems: state.sharedItems.filter(item => item.id !== itemId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addComment: async (itemId, content) => {
    set({ loading: true, error: null });
    try {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1', // Current user
        content,
        likes: 0
      };
      set(state => ({
        sharedItems: state.sharedItems.map(item =>
          item.id === itemId
            ? { ...item, comments: [...item.comments, newComment] }
            : item
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  toggleLike: async (itemId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        sharedItems: state.sharedItems.map(item =>
          item.id === itemId
            ? { ...item, likes: item.likes + 1 }
            : item
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  toggleCommentLike: async (itemId, commentId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        sharedItems: state.sharedItems.map(item =>
          item.id === itemId
            ? {
                ...item,
                comments: item.comments.map(comment =>
                  comment.id === commentId
                    ? { ...comment, likes: comment.likes + 1 }
                    : comment
                )
              }
            : item
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  sendConnectionRequest: async (userId) => {
    set({ loading: true, error: null });
    try {
      const newConnection: Connection = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        follower_id: '1', // Current user
        following_id: userId,
        status: 'pending'
      };
      set(state => ({
        connections: [...state.connections, newConnection]
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  acceptConnectionRequest: async (connectionId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        connections: state.connections.map(conn =>
          conn.id === connectionId
            ? { ...conn, status: 'accepted' }
            : conn
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  removeConnection: async (connectionId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        connections: state.connections.filter(conn => conn.id !== connectionId)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));