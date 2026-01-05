'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useUser, Auth0Provider } from '@auth0/nextjs-auth0';

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Auth0Provider>
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </Auth0Provider>
  );
}

function AuthContextWrapper({ children }: { children: ReactNode }) {
  const { user, error, isLoading } = useUser();

  return (
    <AuthContext.Provider value={{ user, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
