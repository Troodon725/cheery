import { create } from 'zustand';
import type { Recipe, MealPlan } from '../lib/types';

// Mock data for development
const mockRecipes: Recipe[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Traditional Roast Turkey',
    description: 'A perfectly roasted turkey with herbs and butter',
    servings: 12,
    prep_time: 30,
    cook_time: 240,
    ingredients: [
      '1 (12-15 lb) whole turkey',
      '1 cup butter, softened',
      '4 cloves garlic, minced',
      '2 tablespoons fresh rosemary',
      '2 tablespoons fresh thyme',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 325°F (165°C)',
      'Remove giblets and pat turkey dry',
      'Mix butter with herbs and garlic',
      'Rub mixture under and over skin',
      'Roast for 15-20 minutes per pound'
    ],
    image_url: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?q=80&w=2070&auto=format&fit=crop',
    category: 'main',
    tags: ['Christmas', 'Thanksgiving', 'Traditional']
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    user_id: '1',
    name: 'Classic Gingerbread Cookies',
    description: 'Perfectly spiced holiday cookies',
    servings: 24,
    prep_time: 45,
    cook_time: 12,
    ingredients: [
      '3 cups flour',
      '1 1/2 tsp ground ginger',
      '1 1/2 tsp cinnamon',
      '1/4 tsp nutmeg',
      '3/4 cup butter',
      '3/4 cup brown sugar'
    ],
    instructions: [
      'Mix dry ingredients',
      'Cream butter and sugar',
      'Combine wet and dry ingredients',
      'Chill dough for 2 hours',
      'Roll and cut shapes',
      'Bake at 350°F for 12 minutes'
    ],
    image_url: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=2069&auto=format&fit=crop',
    category: 'dessert',
    tags: ['Christmas', 'Cookies', 'Baking']
  }
];

const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    user_id: '1',
    date: '2024-12-25',
    recipes: [
      { recipe_id: '1', serving_multiplier: 1, meal_type: 'dinner' },
      { recipe_id: '2', serving_multiplier: 2, meal_type: 'dessert' }
    ],
    notes: 'Christmas dinner for extended family'
  }
];

interface RecipeState {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  loading: boolean;
  error: string | null;
  selectedRecipe: string | null;
  selectedDate: string | null;
  fetchRecipes: () => Promise<void>;
  fetchMealPlans: () => Promise<void>;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  addMealPlan: (mealPlan: Omit<MealPlan, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  deleteMealPlan: (id: string) => Promise<void>;
  setSelectedRecipe: (id: string | null) => void;
  setSelectedDate: (date: string | null) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: mockRecipes,
  mealPlans: mockMealPlans,
  loading: false,
  error: null,
  selectedRecipe: null,
  selectedDate: null,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ recipes: mockRecipes });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchMealPlans: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ mealPlans: mockMealPlans });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addRecipe: async (recipe) => {
    set({ loading: true, error: null });
    try {
      const newRecipe: Recipe = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...recipe
      };
      set(state => ({ recipes: [...state.recipes, newRecipe] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addMealPlan: async (mealPlan) => {
    set({ loading: true, error: null });
    try {
      const newMealPlan: MealPlan = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: '1',
        ...mealPlan
      };
      set(state => ({ mealPlans: [...state.mealPlans, newMealPlan] }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteRecipe: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteMealPlan: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        mealPlans: state.mealPlans.filter(plan => plan.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedRecipe: (id) => {
    set({ selectedRecipe: id });
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  }
}));