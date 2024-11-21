import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useRecipeStore } from '../../store/recipeStore';

export default function RecipeForm() {
  const { addRecipe, loading } = useRecipeStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    servings: '',
    prep_time: '',
    cook_time: '',
    ingredients: '',
    instructions: '',
    image_url: '',
    category: '',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRecipe({
        name: formData.name,
        description: formData.description,
        servings: parseInt(formData.servings),
        prep_time: parseInt(formData.prep_time),
        cook_time: parseInt(formData.cook_time),
        ingredients: formData.ingredients.split('\n').filter(Boolean),
        instructions: formData.instructions.split('\n').filter(Boolean),
        image_url: formData.image_url || undefined,
        category: formData.category as any,
        tags: formData.tags.split(',').map(t => t.trim())
      });
      setFormData({
        name: '',
        description: '',
        servings: '',
        prep_time: '',
        cook_time: '',
        ingredients: '',
        instructions: '',
        image_url: '',
        category: '',
        tags: ''
      });
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Add New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
              Servings
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="prep_time" className="block text-sm font-medium text-gray-700">
              Prep Time (min)
            </label>
            <input
              type="number"
              id="prep_time"
              name="prep_time"
              value={formData.prep_time}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="cook_time" className="block text-sm font-medium text-gray-700">
              Cook Time (min)
            </label>
            <input
              type="number"
              id="cook_time"
              name="cook_time"
              value={formData.cook_time}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            >
              <option value="">Select category</option>
              <option value="main">Main Course</option>
              <option value="side">Side Dish</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., Christmas, Traditional, Vegan"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients (one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500 font-mono text-sm"
            required
            disabled={loading}
            placeholder="2 cups all-purpose flour&#10;1 cup sugar&#10;1 tsp vanilla extract"
          />
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
            Instructions (one step per line)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500 font-mono text-sm"
            required
            disabled={loading}
            placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            'Add Recipe'
          )}
        </button>
      </form>
    </div>
  );
}