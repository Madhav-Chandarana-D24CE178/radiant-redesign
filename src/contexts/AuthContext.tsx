import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'user' | 'service_provider' | 'admin';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: AppRole[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signup: (email: string, password: string, name: string, role?: AppRole) => Promise<{ error: Error | null }>;
  loginWithGoogle: () => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  continueAsGuest: () => void;
  hasRole: (role: AppRole) => boolean;
  getPrimaryRole: () => AppRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data as Profile);
    }
  };

  const fetchRoles = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (!error && data) {
      setRoles(data.map(r => r.role as AppRole));
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsGuest(false);
        
        // Defer Supabase calls with setTimeout
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchRoles(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setRoles([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchRoles(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signup = async (email: string, password: string, name: string, role: AppRole = 'user') => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: name,
          requested_role: role,
        },
      },
    });

    // If signup successful and user wants to be a provider, add the role
    if (!error && data.user && role === 'service_provider') {
      // Note: This will be handled by admin verification flow
      // The user gets 'user' role by default from trigger
    }

    return { error: error as Error | null };
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    return { error: error as Error | null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRoles([]);
    setIsGuest(false);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setIsLoading(false);
  };

  const hasRole = (role: AppRole) => roles.includes(role);

  const getPrimaryRole = (): AppRole | null => {
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('service_provider')) return 'service_provider';
    if (roles.includes('user')) return 'user';
    return null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      roles,
      isAuthenticated: !!user,
      isLoading,
      isGuest,
      login,
      signup,
      loginWithGoogle,
      logout,
      continueAsGuest,
      hasRole,
      getPrimaryRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
