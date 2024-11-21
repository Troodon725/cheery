import React from 'react';
import { Gift } from 'lucide-react';
import RecipientList from './RecipientList';
import AddRecipientForm from './AddRecipientForm';
import GiftList from './GiftList';
import AddGiftForm from './AddGiftForm';
import { useGiftStore } from '../../store/giftStore';

export default function GiftManager() {
  const { selectedRecipient } = useGiftStore();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-48" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1511895571-b6cf8c563178?q=80&w=2070&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Gift Manager</h1>
          <p className="text-xl text-white/90">
            Organize your holiday gift-giving with ease
          </p>
        </div>
      </div>

      {/* Recipients Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecipientList />
        </div>
        <div>
          <AddRecipientForm />
        </div>
      </div>

      {/* Gifts Section */}
      {selectedRecipient && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GiftList />
          </div>
          <div>
            <AddGiftForm />
          </div>
        </div>
      )}
    </div>
  );
}