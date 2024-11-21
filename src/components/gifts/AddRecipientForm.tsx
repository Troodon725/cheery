import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useGiftStore } from '../../store/giftStore';

export default function AddRecipientForm() {
  const { addRecipient, loading } = useGiftStore();
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    budget: '',
    interests: '',
    occasion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRecipient({
        name: formData.name,
        relationship: formData.relationship,
        budget: parseFloat(formData.budget),
        interests: formData.interests.split(',').map(i => i.trim()),
        occasion: formData.occasion || undefined
      });
      setFormData({
        name: '',
        relationship: '',
        budget: '',
        interests: '',
        occasion: ''
      });
    } catch (error) {
      console.error('Failed to add recipient:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Add Recipient
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
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
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <select
              id="relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            >
              <option value="">Select relationship</option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget
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

          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">
              Occasion
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              disabled={loading}
            >
              <option value="">Select occasion</option>
              <option value="Christmas">Christmas</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g., Books, Cooking, Travel"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
            required
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
            'Add Recipient'
          )}
        </button>
      </form>
    </div>
  );
}