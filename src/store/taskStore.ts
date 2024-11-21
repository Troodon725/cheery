import { create } from 'zustand';
import type { Task, Reward } from '../lib/types';

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    title: 'Decorate Christmas Tree',
    description: 'Set up and decorate the main Christmas tree in the living room',
    points: 100,
    deadline: '2024-12-01',
    category: 'decoration',
    priority: 'high',
    status: 'completed',
    assigned_to: ['1', '2'],
    tags: ['Christmas', 'Family Activity']
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    title: 'Prepare Cookie Dough',
    description: 'Make and chill gingerbread cookie dough for decorating',
    points: 50,
    deadline: '2024-12-15',
    category: 'cooking',
    priority: 'medium',
    status: 'pending',
    tags: ['Baking', 'Christmas']
  }
];

const mockRewards: Reward[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    title: 'Choose Movie Night Film',
    description: 'Pick the holiday movie for family movie night',
    points_required: 200,
    category: 'privilege',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    title: 'Hot Chocolate Special',
    description: 'Deluxe hot chocolate with all the toppings',
    points_required: 100,
    category: 'treat',
    available: true,
    image_url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=2070&auto=format&fit=crop'
  }
];

interface TaskState {
  tasks: Task[];
  rewards: Reward[];
  userPoints: number;
  loading: boolean;
  error: string | null;
  selectedTask: string | null;
  fetchTasks: () => Promise<void>;
  fetchRewards: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'user_id' | 'status'>) => Promise<void>;
  addReward: (reward: Omit<Reward, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  updateTaskStatus: (id: string, status: Task['status']) => Promise<void>;
  claimReward: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteReward: (id: string) => Promise<void>;
  setSelectedTask: (id: string | null) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockTasks,
  rewards: mockRewards,
  userPoints: 350, // Mock user points
  loading: false,
  error: null,
  selectedTask: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ tasks: mockTasks });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchRewards: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ rewards: mockRewards });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        status: 'pending',
        ...task
      };
      set(state => ({ tasks: [...state.tasks, newTask] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addReward: async (reward) => {
    set({ loading: true, error: null });
    try {
      const newReward: Reward = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...reward
      };
      set(state => ({ rewards: [...state.rewards, newReward] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateTaskStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const task = get().tasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');

      // Add points only when completing a task
      if (status === 'completed' && task.status !== 'completed') {
        set(state => ({ userPoints: state.userPoints + task.points }));
      }
      // Remove points if uncompleting a task
      else if (status !== 'completed' && task.status === 'completed') {
        set(state => ({ userPoints: state.userPoints - task.points }));
      }

      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, status } : task
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  claimReward: async (id) => {
    set({ loading: true, error: null });
    try {
      const reward = get().rewards.find(r => r.id === id);
      if (!reward) throw new Error('Reward not found');
      if (!reward.available) throw new Error('Reward not available');
      if (get().userPoints < reward.points_required) {
        throw new Error('Not enough points');
      }

      set(state => ({
        userPoints: state.userPoints - reward.points_required,
        rewards: state.rewards.map(r =>
          r.id === id
            ? {
                ...r,
                available: false,
                claimed_by: '1',
                claimed_at: new Date().toISOString()
              }
            : r
        )
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteReward: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        rewards: state.rewards.filter(reward => reward.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedTask: (id) => {
    set({ selectedTask: id });
  }
}));