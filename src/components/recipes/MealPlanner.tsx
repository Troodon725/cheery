import React, { useEffect, useState } from 'react';
import { Calendar, ChefHat, Trash2, Loader, Plus } from 'lucide-react';
import { useRecipeStore } from '../../store/recipeStore';
import AddMealPlanForm from './AddMealPlanForm';

export default function MealPlanner() {
  const { 
    recipes,
    mealPlans,
    loading,
    error,
    fetchMealPlans,
    deleteMealPlan
  } = useRecipeStore();

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchMealPlans();
  }, [fetchMealPlans]);

  const getRecipeById = (id: string) => recipes.find(r => r.id === id);

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
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-holiday-green-700 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Holiday Meal Plans
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-secondary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? 'Cancel' : 'New Plan'}
          </button>
        </div>

        {showAddForm ? (
          <AddMealPlanForm />
        ) : mealPlans.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No meal plans created yet. Start planning your holiday meals!
          </p>
        ) : (
          <div className="space-y-6">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className="relative group p-4 bg-white rounded-lg border border-holiday-green-100 hover:border-holiday-green-200 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {new Date(plan.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    {plan.notes && (
                      <p className="text-sm text-gray-500 mt-1">{plan.notes}</p>
                    )}
                  </div>
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteMealPlan(plan.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {plan.recipes.map(({ recipe_id, meal_type, serving_multiplier }) => {
                    const recipe = getRecipeById(recipe_id);
                    if (!recipe) return null;

                    return (
                      <div
                        key={`${plan.id}-${recipe_id}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-holiday-green-50"
                      >
                        <div className="flex items-center">
                          <ChefHat className="w-4 h-4 text-holiday-green-600 mr-2" />
                          <div>
                            <p className="font-medium text-gray-800">{recipe.name}</p>
                            <p className="text-sm text-gray-500">
                              {meal_type.charAt(0).toUpperCase() + meal_type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {recipe.servings * serving_multiplier} servings
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}