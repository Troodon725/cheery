import React, { useEffect } from 'react';
import { Archive, Box, Trash2, Loader } from 'lucide-react';
import { useDecorStore } from '../../store/decorStore';
import { QRCodeSVG } from 'qrcode.react';

export default function StorageBoxList() {
  const { 
    boxes, 
    items,
    loading, 
    error, 
    fetchBoxes,
    deleteBox,
    selectedBox,
    setSelectedBox
  } = useDecorStore();

  useEffect(() => {
    fetchBoxes();
  }, [fetchBoxes]);

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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
        <Archive className="w-5 h-5 mr-2" />
        Storage Boxes
      </h2>
      
      {boxes.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No storage boxes added yet. Add your first box!
        </p>
      ) : (
        <div className="space-y-4">
          {boxes.map((box) => {
            const boxItems = items.filter(item => box.items.includes(item.id));
            
            return (
              <div
                key={box.id}
                className={`relative group p-4 rounded-lg border transition-all cursor-pointer
                  ${selectedBox === box.id 
                    ? 'border-holiday-green-500 bg-holiday-green-50' 
                    : 'border-gray-200 hover:border-holiday-green-200'
                  }`}
                onClick={() => setSelectedBox(box.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Box className="w-5 h-5 text-holiday-green-600 mr-2" />
                      <h3 className="font-medium text-gray-800">Box #{box.box_number}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{box.location}</p>
                    <p className="text-sm text-gray-600 mt-1">{box.description}</p>
                    <div className="mt-2">
                      {boxItems.map((item) => (
                        <span
                          key={item.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-holiday-green-100 text-holiday-green-800 mr-2 mb-2"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <button 
                      className="p-1 text-gray-400 hover:text-holiday-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBox(box.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <QRCodeSVG
                        value={`box:${box.id}`}
                        size={64}
                        level="M"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}