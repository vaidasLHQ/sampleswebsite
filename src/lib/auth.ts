import { createSignal, createEffect, onCleanup } from 'solid-js';
import { supabase, onAuthStateChange } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

// Global auth state
const [user, setUser] = createSignal<User | null>(null);
const [session, setSession] = createSignal<Session | null>(null);
const [loading, setLoading] = createSignal(true);

// Initialize auth state
async function initAuth() {
  try {
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
  } catch (error) {
    console.error('Error initializing auth:', error);
  } finally {
    setLoading(false);
  }
}

// Set up auth state listener
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  async (event, currentSession) => {
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    setLoading(false);
  }
);

// Initialize on load
initAuth();

// Export auth state and helpers
export { user, session, loading };

export function useAuth() {
  return {
    user,
    session,
    loading,
    isAuthenticated: () => !!user(),
  };
}

