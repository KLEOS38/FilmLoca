
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session, type AuthTokenResponse, type AuthResponse } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthTokenResponse>;
  signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ data: unknown; error: unknown }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (userId: string) => {
    try {
      // Reduced timeout for faster failure (5 seconds instead of 10)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000);
      });

      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;
      
      if (error) {
        // Don't throw for 404 - profile might not exist yet
        if (error.code !== 'PGRST116') {
          // Only log, don't throw - don't block UI
          console.warn('Profile fetch error:', error);
        } else {
          console.warn('Profile not found for user:', userId);
        }
        return;
      }
      
      if (data) {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Don't set profile to null on error - keep existing profile if any
      // Don't throw - this is non-blocking
    }
  };

  useEffect(() => {
    // Set loading to false immediately - don't block UI
    // Profile will load in background
    setLoading(false);
    
    // Set up auth state listener FIRST to avoid missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession ?? null);
        setUser(newSession?.user ?? null);

        switch (event) {
          case 'SIGNED_IN':
            // Don't show toast here - let the page handle it or show it after navigation
            // This makes sign-in feel faster
            break;
          case 'SIGNED_OUT':
            toast.info('Signed out');
            setProfile(null);
            break;
          case 'TOKEN_REFRESHED':
            // Mild feedback; avoid noisy toasts
            // toast.success('Session refreshed');
            break;
          case 'USER_UPDATED':
            toast.success('Account updated');
            break;
          case 'PASSWORD_RECOVERY':
            toast.info('Password recovery in progress');
            break;
        }

        // Fetch profile in background (non-blocking, don't await)
        if (newSession?.user) {
          // Use setTimeout to defer profile fetch - makes sign-in feel instant
          setTimeout(() => {
            fetchProfile(newSession.user.id).catch(e => {
              console.error('Profile fetch after auth event failed', e);
            });
          }, 100); // Small delay to let navigation happen first
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session (non-blocking)
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch profile in background (non-blocking)
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id).catch(e => {
          console.error('Profile fetch failed', e);
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: metadata || {}
      }
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
