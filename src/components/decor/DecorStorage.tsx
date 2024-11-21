import React from 'react';
import { Box } from 'lucide-react';
import StorageBoxList from './StorageBoxList';
import DecorItemList from './DecorItemList';
import AddBoxForm from './AddBoxForm';
import AddItemForm from './AddItemForm';
import { useDecorStore } from '../../store/decorStore';

export default function DecorStorage() {
  const { selectedBox } = useDecorStore();

  return (
    <div className="space-y-8">
      <div 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-48" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1544665215-e8239d25dd77?q=80&w=2070&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Décor Storage</h1>
          <p className="text-xl text-white/90">
            Organize and track your holiday decorations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <StorageBoxList />
        </div>
        <div>
          <AddBoxForm />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DecorItemList />
        </div>
        <div>
          <AddItemForm />
        </div>
      </div>
    </div>
  );
}