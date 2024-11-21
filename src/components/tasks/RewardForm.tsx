import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';

export default function RewardForm() {
  const { addReward, loading } = useTaskStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points_required: '',
    category: '',
    image_url: '',
    expiry_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReward({
        title: formData.title,
        description: formData.description,
        points_required: parseInt(formData.points_required),
        category: formData.category as any,
        available: true,
        image_url: formData.image_url || undefined,
        expiry_date: formData.expiry_date || undefined
      });
      setFormData({
        title: '',
        description: '',
        points_required: '',
        category: '',
        image_url: '',
        expiry_date: ''
      });
    } catch (error) {
      console.error('Failed to add reward:', error);
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
      <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Add New Reward
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Reward Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="points_required" className="block text-sm font-medium text-gray-700">
              Points Required
            </label>
            <input
              type="number"
              id="points_required"
              name="points_required"
              value={formData.points_required}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              required
              disabled={loading}
            >
              <option value="">Select category</option>
              <option value="activity">Activity</option>
              <option value="treat">Treat</option>
              <option value="privilege">Privilege</option>
              <option value="gift">Gift</option>
            </select>
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">
            Expiry Date (optional)
          </label>
          <input
            type="date"
            id="expiry_date"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            disabled={loading}
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
            'Add Reward'
          )}
        </button>
      </form>
    </div>
  );
}