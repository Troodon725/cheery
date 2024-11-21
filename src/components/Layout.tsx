import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-holiday-green-50 to-holiday-red-50">
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-8">
          <div className="mb-8 flex justify-end">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm text-holiday-red-600 hover:text-holiday-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}