import { useCallback, useEffect, useState } from 'react';
import sdk from "@farcaster/frame-sdk";
import { SignIn as SignInCore } from "@farcaster/frame-sdk";

type UseAuthenticateProps = {
  signInOptions?: SignInCore.SignInOptions;
  provider?: AuthProvider;
}

export type AuthProvider = {
  getUser: () => Promise<SignInCore.SignInResult | null>;
  saveUser: (user: SignInCore.SignInResult) => Promise<void>;
  removeUser: () => Promise<void>;
};

const localStorageProvider: AuthProvider = {
  getUser: async () => {
    if (typeof window === 'undefined') {
      return null;
    }
    const saved = localStorage.getItem('farcaster_user');
    return saved ? JSON.parse(saved) : null;
  },
  saveUser: async (user) => {
    localStorage.setItem('farcaster_user', JSON.stringify(user));
  },
  removeUser: async () => {
    localStorage.removeItem('farcaster_user');
  }
};

export const useAuthenticate = ({ 
  signInOptions,
  provider = localStorageProvider 
}: UseAuthenticateProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<SignInCore.SignInResult | null>(null);

  useEffect(() => {
    provider.getUser().then(setUser);
  }, [provider]);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      // Generate exactly 8 chars using base36
      const nonce = [...Array(8)].map(() => 
        Math.floor(Math.random() * 36).toString(36)
      ).join('');
      const result = await sdk.actions.signIn({ nonce, ...signInOptions });
      await provider.saveUser(result);
      setUser(result);
      return result;
    } catch (e) {
      if (e instanceof SignInCore.RejectedByUser) {
        throw new Error("Rejected by user");
      }
      throw new Error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  }, [signInOptions, provider]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await provider.removeUser();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  return {
    login,
    logout,
    isLoading,
    authenticated: !!user,
    user,
  };
}; 