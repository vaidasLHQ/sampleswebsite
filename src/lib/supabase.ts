import { createClient } from '@supabase/supabase-js';

// Supabase project configuration
// Project ID: qborzulfzciqhjyfxcjz
const supabaseUrl = 'https://qborzulfzciqhjyfxcjz.supabase.co';

// Get the anon key from environment variable
// Set this in .env file: VITE_SUPABASE_ANON_KEY=your_key_here
// You can find it at: https://supabase.com/dashboard/project/qborzulfzciqhjyfxcjz/settings/api
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the key is configured
export const isSupabaseConfigured = !!supabaseAnonKey && supabaseAnonKey !== 'your_anon_key_here';

// Create Supabase client (will fail gracefully if not configured)
export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'placeholder');

// Auth helper functions
export async function signUp(email: string, password: string, redirectUrl?: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: { message: 'Supabase is not configured. Please add your anon key to .env file.' } };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl || `${window.location.origin}/vault`,
    },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: { message: 'Supabase is not configured. Please add your anon key to .env file.' } };
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  if (!isSupabaseConfigured) {
    return { error: { message: 'Supabase is not configured.' } };
  }
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  if (!isSupabaseConfigured) {
    return { session: null, error: null };
  }
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

export async function getUser() {
  if (!isSupabaseConfigured) {
    return { user: null, error: null };
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

// Password reset
export async function resetPassword(email: string, redirectUrl?: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: { message: 'Supabase is not configured.' } };
  }
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl || `${window.location.origin}/reset-password`,
  });
  return { data, error };
}

// Update password (after reset)
export async function updatePassword(newPassword: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: { message: 'Supabase is not configured.' } };
  }
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
}

// Auth state listener
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
