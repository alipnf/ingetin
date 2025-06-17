'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, loginWithGoogle } from '@/lib/firebase/auth';
import { toast } from 'sonner';

interface LoginFormData {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEmailLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await loginUser(email, password);
      toast.success('Login berhasil');
      router.push('/');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login gagal';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Login berhasil');
      router.push('/');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login dengan Google gagal';
      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEmailLogin(formData.email, formData.password);
  };

  return {
    isLoading,
    isGoogleLoading,
    formData,

    handleChange,
    handleSubmit,
    handleEmailLogin,
    handleGoogleLogin,
  };
}
