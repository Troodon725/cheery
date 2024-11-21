import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { useDecorStore } from '../../store/decorStore';

export default function AddItemForm() {
  const { addItem, loading, boxes } = useDecorStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    quantity: '1',
    storage_location: '',
    box_number: '',
    image_url: '',
    purchase_date: '',
    last_used: '',
    notes: '',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addItem({
        name: formData.name,
        description: formData.description,
        category: formData.category as any,
        condition: formData.condition as any,
        quantity: parseInt(formData.quantity),
        storage_location: formData.storage_location,
        box_number: formData.box_number,
        image_url: formData.image_url || undefined,
        purchase_date: formData.purchase_date || undefined,
        last_used: formData.last_used || undefined,
        notes: formData.notes || undefined,
        tags: formData.tags.split(',').map(t => t.trim())
      });
      setFormData({
        name: '',
        description: '',
        category: '',
        condition: '',
        quantity: '1',
        storage_location: '',
        box_number: '',
        image_url: '',
        purchase_date: '',
        last_used: '',
        notes: '',
        tags: ''
      });
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBoxSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const box = boxes.find(b => b.box_number === e.target.value);
    if (box) {
      setFormData(prev => ({
        ...prev,
        box_number: box.box_number,
        storage_location: box.location
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Add Decor Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="tree">Tree</option>
              <option value="table">Table</option>
              <option value="lighting">Lighting</option>
              <option value="other">Other</option>
            </select>
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              required
              disabled={loading}
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="needs-repair">Needs Repair</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="box_number" className="block text-sm font-medium text-gray-700">
              Storage Box
            </label>
            <select
              id="box_number"
              name="box_number"
              value={formData.box_number}
              onChange={handleBoxSelect}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              required
              disabled={loading}
            >
              <option value="">Select box</option>
              {boxes.map((box) => (
                <option key={box.id} value={box.box_number}>
                  Box #{box.box_number} ({box.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="storage_location" className="block text-sm font-medium text-gray-700">
              Storage Location
            </label>
            <input
              type="text"
              id="storage_location"
              name="storage_location"
              value={formData.storage_location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500 bg-gray-50"
              required
              disabled={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="purchase_date" className="block text-sm font-medium text-gray-700">
              Purchase Date
            </label>
            <input
              type="date"
              id="purchase_date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="last_used" className="block text-sm font-medium text-gray-700">
              Last Used
            </label>
            <input
              type="date"
              id="last_used"
              name="last_used"
              value={formData.last_used}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            disabled={loading}
          />
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
            placeholder="e.g., Christmas, Indoor, Lights"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
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
            'Add Item'
          )}
        </button>
      </form>
    </div>
  );
}