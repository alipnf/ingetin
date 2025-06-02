import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-user',
    }
  )
);
