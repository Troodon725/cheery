import { create } from 'zustand';
import type { DecorItem, StorageBox } from '../lib/types';

// Mock data for development
const mockDecorItems: DecorItem[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'LED String Lights',
    description: 'Warm white LED string lights, 100 count',
    category: 'lighting',
    condition: 'good',
    quantity: 3,
    storage_location: 'Attic',
    box_number: 'H-L1',
    image_url: 'https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?q=80&w=2070&auto=format&fit=crop',
    purchase_date: '2023-11-15',
    last_used: '2023-12-25',
    tags: ['Christmas', 'Outdoor']
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Artificial Christmas Tree',
    description: '7.5ft Pre-lit Spruce',
    category: 'tree',
    condition: 'good',
    quantity: 1,
    storage_location: 'Basement',
    box_number: 'H-T1',
    image_url: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=2069&auto=format&fit=crop',
    purchase_date: '2022-12-01',
    last_used: '2023-12-25',
    tags: ['Christmas', 'Indoor']
  }
];

const mockStorageBoxes: StorageBox[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    box_number: 'H-L1',
    location: 'Attic',
    description: 'Holiday Lights and Electronics',
    items: ['1']
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    box_number: 'H-T1',
    location: 'Basement',
    description: 'Trees and Large Items',
    items: ['2']
  }
];

interface DecorState {
  items: DecorItem[];
  boxes: StorageBox[];
  loading: boolean;
  error: string | null;
  selectedBox: string | null;
  fetchItems: () => Promise<void>;
  fetchBoxes: () => Promise<void>;
  addItem: (item: Omit<DecorItem, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  addBox: (box: Omit<StorageBox, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  updateItem: (id: string, item: Partial<DecorItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  deleteBox: (id: string) => Promise<void>;
  setSelectedBox: (id: string | null) => void;
}

export const useDecorStore = create<DecorState>((set, get) => ({
  items: mockDecorItems,
  boxes: mockStorageBoxes,
  loading: false,
  error: null,
  selectedBox: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ items: mockDecorItems });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchBoxes: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ boxes: mockStorageBoxes });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (item) => {
    set({ loading: true, error: null });
    try {
      const newItem: DecorItem = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...item
      };
      set(state => ({ items: [...state.items, newItem] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addBox: async (box) => {
    set({ loading: true, error: null });
    try {
      const newBox: StorageBox = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...box
      };
      set(state => ({ boxes: [...state.boxes, newBox] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateItem: async (id, item) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        items: state.items.map(i => 
          i.id === id ? { ...i, ...item } : i
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteItem: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        items: state.items.filter(item => item.id !== id),
        boxes: state.boxes.map(box => ({
          ...box,
          items: box.items.filter(itemId => itemId !== id)
        }))
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteBox: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        boxes: state.boxes.filter(box => box.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedBox: (id) => {
    set({ selectedBox: id });
  }
}));