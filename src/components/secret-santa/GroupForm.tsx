import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useSecretSantaStore } from '../../store/secretSantaStore';

export default function GroupForm() {
  const { addGroup, loading } = useSecretSantaStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    event_date: '',
    budget: '',
    theme: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addGroup({
        name: formData.name,
        description: formData.description,
        event_date: formData.event_date,
        budget: parseFloat(formData.budget),
        theme: formData.theme || undefined
      });
      setFormData({
        name: '',
        description: '',
        event_date: '',
        budget: '',
        theme: ''
      });
    } catch (error) {
      console.error('Failed to add group:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Create New Group
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Group Name
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget per Person
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
                required
                min="0"
                step="0.01"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme (Optional)
          </label>
          <input
            type="text"
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            placeholder="e.g., Handmade Gifts, White Elephant"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
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
            'Create Group'
          )}
        </button>
      </form>
    </div>
  );
}