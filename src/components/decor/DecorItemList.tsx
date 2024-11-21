import React, { useEffect } from 'react';
import { Package, Trash2, Edit, Loader } from 'lucide-react';
import { useDecorStore } from '../../store/decorStore';

export default function DecorItemList() {
  const { 
    items, 
    boxes,
    loading, 
    error, 
    selectedBox,
    fetchItems,
    deleteItem,
    updateItem
  } = useDecorStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[200px]">
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

  const filteredItems = selectedBox
    ? items.filter(item => {
        const box = boxes.find(b => b.id === selectedBox);
        return box?.items.includes(item.id);
      })
    : items;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-red-600 flex items-center">
        <Package className="w-5 h-5 mr-2" />
        {selectedBox 
          ? `Items in Box #${boxes.find(b => b.id === selectedBox)?.box_number}`
          : 'All Decor Items'
        }
      </h2>
      
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          {selectedBox 
            ? 'No items in this box yet. Add some items!'
            : 'No items added yet. Start adding your holiday decorations!'
          }
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:border-holiday-red-200 transition-all"
            >
              {item.image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="mt-2 space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.condition === 'new'
                          ? 'bg-green-100 text-green-800'
                          : item.condition === 'good'
                          ? 'bg-blue-100 text-blue-800'
                          : item.condition === 'fair'
                          ? 'bg-yellow-100 text-yellow-800'
                          : item.condition === 'needs-repair'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.condition.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-1 text-gray-400 hover:text-holiday-green-600"
                      onClick={() => {/* TODO: Implement edit */}}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-holiday-red-600"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    Location: {item.storage_location} (Box #{item.box_number})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
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