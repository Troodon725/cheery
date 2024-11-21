import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Loader, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

type AuthMode = 'login' | 'register';

export default function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp, user, loading } = useAuthStore();

  // Get redirect path from URL params
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirectTo ? `/dashboard/${redirectTo}` : '/dashboard');
    }
  }, [user, navigate, redirectTo]);

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate(redirectTo ? `/dashboard/${redirectTo}` : '/dashboard');
      } else {
        await signUp(email, password);
        setSuccess('Registration successful! Please check your email to confirm your account.');
        // Don't automatically switch to login mode - let user see the success message
      }
    } catch (err: any) {
      let errorMessage = err.message;
      
      // Handle specific error cases
      if (errorMessage.includes('rate limit')) {
        errorMessage = 'Too many attempts. Please try again in a few minutes.';
      } else if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password.';
      } else if (errorMessage.includes('already registered')) {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (errorMessage.includes('email not confirmed')) {
        errorMessage = 'Please check your email to confirm your account before signing in.';
      }
      
      setError(errorMessage);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-holiday-green-50 to-holiday-red-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-holiday-red-600">
            Holiday Hub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login' 
              ? 'Welcome back! Sign in to continue your holiday planning.'
              : 'Create your account and start planning magical holidays.'
            }
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-holiday-green-50 border border-holiday-green-100 text-holiday-green-600 p-4 rounded-lg text-sm flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
                  disabled={loading}
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
                  disabled={loading}
                  minLength={6}
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-holiday-green-500 focus:border-holiday-green-500"
                    disabled={loading}
                    minLength={6}
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-holiday-red-600 to-holiday-green-600 hover:from-holiday-red-700 hover:to-holiday-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-holiday-green-500"
              disabled={loading}
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                mode === 'login' ? 'Sign in' : 'Create account'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-holiday-green-600 hover:text-holiday-green-500"
            disabled={loading}
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}