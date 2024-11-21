import React, { useEffect } from 'react';
import { ChefHat, Clock, Users, Trash2, Edit, Loader } from 'lucide-react';
import { useRecipeStore } from '../../store/recipeStore';

export default function RecipeList() {
  const { recipes, loading, error, fetchRecipes, deleteRecipe, setSelectedRecipe } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

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
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
        <ChefHat className="w-5 h-5 mr-2" />
        Holiday Recipes
      </h2>
      
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No recipes added yet. Add your first holiday recipe!
        </p>
      ) : (
        <div className="space-y-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:border-holiday-green-200 transition-all"
            >
              {recipe.image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 text-lg">{recipe.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-1 text-gray-400 hover:text-holiday-green-600"
                      onClick={() => setSelectedRecipe(recipe.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-holiday-red-600"
                      onClick={() => deleteRecipe(recipe.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prep_time + recipe.cook_time} min
                    </span>
                    <span className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {recipe.servings} servings
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-holiday-green-100 text-holiday-green-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}