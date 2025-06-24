'use client';

import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { logoutUser } from '@/lib/firebase/auth';

export function useNavbar() {
  const pathName = usePathname();
  const { user } = useUserStore();
  const initalName = user?.name ? user?.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { pathName, user, initalName, handleLogout };
}
