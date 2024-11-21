import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('email not confirmed')) {
          throw new Error('Please check your email to confirm your account before signing in.');
        }
        throw error;
      }
      
      set({ user: data.user, session: data.session });
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password) => {
    set({ loading: true });
    try {
      // First check if user exists but hasn't confirmed email
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const existingUser = users?.find(u => u.email === email && !u.email_confirmed_at);
      
      if (existingUser) {
        // Resend confirmation email
        await supabase.auth.resend({
          type: 'signup',
          email,
        });
        throw new Error('A confirmation email has been resent. Please check your inbox.');
      }

      // Proceed with new signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            email_confirmed: false
          }
        },
      });
      
      if (error) throw error;
      
      // Don't automatically sign in after registration
      set({ user: null, session: null });

      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        throw new Error('Please check your email to confirm your account before signing in.');
      }

    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, session: null });
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  initialize: async () => {
    if (!supabase) return;

    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Set up auth state change listener
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          // Verify email confirmation status
          const { data: { user } } = await supabase.auth.getUser();
          if (user && !user.email_confirmed_at) {
            await supabase.auth.signOut();
            set({ 
              session: null, 
              user: null,
              loading: false 
            });
            return;
          }
        }

        set({ 
          session, 
          user: session?.user ?? null,
          loading: false 
        });
      });
      
      set({ 
        session, 
        user: session?.user ?? null, 
        loading: false,
        initialized: true
      });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ loading: false, initialized: true });
    }
  },
}));