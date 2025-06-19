'use client';

import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { logoutUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export function useNavbar() {
  const pathName = usePathname();
  const { user } = useUserStore();
  const router = useRouter();
  const initalName = user?.name ? user?.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { pathName, user, initalName, handleLogout };
}
