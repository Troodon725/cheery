import React from 'react';
import { Users, Gift, Calendar, DollarSign } from 'lucide-react';
import GroupList from './GroupList';
import GroupForm from './GroupForm';
import ParticipantList from './ParticipantList';
import { useSecretSantaStore } from '../../store/secretSantaStore';

export default function SecretSanta() {
  const { selectedGroup } = useSecretSantaStore();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-cover bg-center h-48" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2069&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-red-600/90 to-holiday-green-600/90"></div>
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Secret Santa</h1>
          <p className="text-xl text-white/90">
            Organize gift exchanges with family and friends
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GroupList />
        </div>
        <div>
          <GroupForm />
        </div>
      </div>

      {/* Participants Section */}
      {selectedGroup && (
        <div>
          <ParticipantList />
        </div>
      )}
    </div>
  );
}