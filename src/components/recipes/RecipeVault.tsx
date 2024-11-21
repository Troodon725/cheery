import React from 'react';
import { ChefHat } from 'lucide-react';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import MealPlanner from './MealPlanner';
import { useRecipeStore } from '../../store/recipeStore';

export default function RecipeVault() {
  const { selectedRecipe } = useRecipeStore();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-48" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=2069&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Recipe Vault</h1>
          <p className="text-xl text-white/90">
            Store and organize your favorite holiday recipes
          </p>
        </div>
      </div>

      {/* Recipe Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecipeList />
        </div>
        <div>
          <RecipeForm />
        </div>
      </div>

      {/* Meal Planner */}
      <MealPlanner />
    </div>
  );
}