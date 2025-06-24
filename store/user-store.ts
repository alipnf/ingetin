import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  provider?: 'google' | 'email' | 'unknown';
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  setProvider: (provider: 'google' | 'email' | 'unknown') => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      setProvider: (provider) => set((state) => ({ 
        user: state.user ? { ...state.user, provider } : null 
      })),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-user',
    }
  )
);
