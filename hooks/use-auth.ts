import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { registerUser, loginUser, loginWithGoogle } from '@/lib/firebase/auth';
import { toast } from 'sonner';

interface LoginFormData {
  name: string;
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    email: '',
    password: '',
  });

  const redirectPath = searchParams.get('redirect');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Login berhasil');
      router.push(redirectPath || '/');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login dengan Google gagal';
      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(formData.email, formData.password);
      toast.success('Login berhasil');
      router.push(redirectPath || '/');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login gagal';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser(formData.name, formData.email, formData.password);
      toast.success('Registrasi berhasil');
      router.push('/login');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registrasi gagal';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isGoogleLoading,
    formData,

    handleChange,
    handleSubmitLogin,
    handleSubmitRegister,
    handleGoogle,
  };
}
