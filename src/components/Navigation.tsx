import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Gift, Calendar, ChefHat, Box, Users, Trophy, Home, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Party Planner', path: '/dashboard/party-planner' },
  { icon: Gift, label: 'Gift Manager', path: '/dashboard/gifts' },
  { icon: ChefHat, label: 'Recipe Vault', path: '/dashboard/recipes' },
  { icon: Box, label: 'Décor Storage', path: '/dashboard/decor' },
  { icon: Users, label: 'Secret Santa', path: '/dashboard/secret-santa' },
  { icon: Trophy, label: 'Tasks & Rewards', path: '/dashboard/tasks' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' }
];

export default function Navigation() {
  return (
    <nav className="w-64 min-h-screen bg-white shadow-lg flex flex-col">
      <div className="p-6 bg-hero-pattern bg-cover bg-center">
        <Link to="/dashboard" className="block">
          <div className="bg-white/90 rounded-lg p-4 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-holiday-red-600">Holiday Hub</h1>
            <p className="text-sm text-gray-600 mt-1">Holiday Planning Made Easy</p>
          </div>
        </Link>
      </div>
      
      <div className="px-4 flex-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-holiday-green-100 text-holiday-green-700'
                  : 'text-gray-600 hover:bg-holiday-red-50'
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}