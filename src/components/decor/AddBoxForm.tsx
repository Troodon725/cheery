import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useDecorStore } from '../../store/decorStore';

export default function AddBoxForm() {
  const { addBox, loading } = useDecorStore();
  const [formData, setFormData] = useState({
    box_number: '',
    location: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBox({
        ...formData,
        items: []
      });
      setFormData({
        box_number: '',
        location: '',
        description: ''
      });
    } catch (error) {
      console.error('Failed to add box:', error);
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
        Add Storage Box
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="box_number" className="block text-sm font-medium text-gray-700">
              Box Number
            </label>
            <input
              type="text"
              id="box_number"
              name="box_number"
              value={formData.box_number}
              onChange={handleChange}
              placeholder="e.g., H-L1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Storage Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Attic"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-red-500 focus:border-holiday-red-500"
              required
              disabled={loading}
            />
          </div>
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

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            'Add Box'
          )}
        </button>
      </form>
    </div>
  );
}