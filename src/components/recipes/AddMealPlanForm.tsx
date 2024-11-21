import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useRecipeStore } from '../../store/recipeStore';
import type { Recipe } from '../../lib/types';

export default function AddMealPlanForm() {
  const { recipes, addMealPlan, loading } = useRecipeStore();
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    recipes: [] as {
      recipe_id: string;
      serving_multiplier: number;
      meal_type: 'breakfast' | 'lunch' | 'dinner' | 'dessert';
    }[]
  });

  const [selectedRecipe, setSelectedRecipe] = useState({
    recipe_id: '',
    serving_multiplier: 1,
    meal_type: 'dinner' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.recipes.length === 0) {
      alert('Please add at least one recipe to the meal plan');
      return;
    }

    try {
      await addMealPlan(formData);
      setFormData({
        date: '',
        notes: '',
        recipes: []
      });
    } catch (error) {
      console.error('Failed to add meal plan:', error);
    }
  };

  const handleAddRecipe = () => {
    if (!selectedRecipe.recipe_id) return;
    
    setFormData(prev => ({
      ...prev,
      recipes: [...prev.recipes, selectedRecipe]
    }));

    setSelectedRecipe({
      recipe_id: '',
      serving_multiplier: 1,
      meal_type: 'dinner'
    });
  };

  const handleRemoveRecipe = (index: number) => {
    setFormData(prev => ({
      ...prev,
      recipes: prev.recipes.filter((_, i) => i !== index)
    }));
  };

  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find(r => r.id === id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Create Meal Plan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <input
              type="text"
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              disabled={loading}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add Recipes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="recipe" className="block text-sm font-medium text-gray-700">
                Recipe
              </label>
              <select
                id="recipe"
                value={selectedRecipe.recipe_id}
                onChange={(e) => setSelectedRecipe(prev => ({ ...prev, recipe_id: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
                disabled={loading}
              >
                <option value="">Select recipe</option>
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="meal_type" className="block text-sm font-medium text-gray-700">
                Meal Type
              </label>
              <select
                id="meal_type"
                value={selectedRecipe.meal_type}
                onChange={(e) => setSelectedRecipe(prev => ({ 
                  ...prev, 
                  meal_type: e.target.value as typeof selectedRecipe.meal_type 
                }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
                disabled={loading}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>

            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
                Serving Multiplier
              </label>
              <input
                type="number"
                id="servings"
                value={selectedRecipe.serving_multiplier}
                onChange={(e) => setSelectedRecipe(prev => ({ 
                  ...prev, 
                  serving_multiplier: parseInt(e.target.value) || 1
                }))}
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddRecipe}
            disabled={!selectedRecipe.recipe_id || loading}
            className="btn btn-secondary mb-6"
          >
            Add to Plan
          </button>

          {formData.recipes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Selected Recipes:</h4>
              {formData.recipes.map((recipe, index) => {
                const recipeDetails = getRecipeById(recipe.recipe_id);
                if (!recipeDetails) return null;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{recipeDetails.name}</p>
                      <p className="text-sm text-gray-500">
                        {recipe.meal_type} - {recipe.serving_multiplier}x servings
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRecipe(index)}
                      className="text-gray-400 hover:text-holiday-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center"
          disabled={loading || formData.recipes.length === 0}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            'Create Meal Plan'
          )}
        </button>
      </form>
    </div>
  );
}