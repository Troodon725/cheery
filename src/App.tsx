import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PartyPlanner from './components/party-planner/PartyPlanner';
import GiftManager from './components/gifts/GiftManager';
import RecipeVault from './components/recipes/RecipeVault';
import DecorStorage from './components/decor/DecorStorage';
import SecretSanta from './components/secret-santa/SecretSanta';
import TasksAndRewards from './components/tasks/TasksAndRewards';
import UserProfile from './components/profile/UserProfile';
import AuthForm from './components/auth/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { initialize, user } = useAuthStore();

  // Initialize auth state
  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="party-planner" element={<PartyPlanner />} />
          <Route path="gifts" element={<GiftManager />} />
          <Route path="recipes" element={<RecipeVault />} />
          <Route path="decor" element={<DecorStorage />} />
          <Route path="secret-santa" element={<SecretSanta />} />
          <Route path="tasks" element={<TasksAndRewards />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}