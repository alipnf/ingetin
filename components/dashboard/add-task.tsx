import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TaskCardProps } from '@/types/task-card';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import FormField from '../form-field';
import { getLoginProvider } from '@/lib/firebase/auth';
import { updateTask, convertTaskCardToInput } from '@/lib/firebase/task';
import { createTaskWithCalendar } from '@/lib/calendar-integration';
import { useUserStore } from '@/store/user-store';
import { auth } from '@/lib/firebase/config-client';
import { onAuthStateChanged } from 'firebase/auth';

type AddTaskProps = {
  task?: TaskCardProps & { id?: string };
  onSave?: (task: TaskCardProps) => void;
  mode?: 'add' | 'edit';
};

export function AddTask({ task, onSave, mode = 'add' }: AddTaskProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TaskCardProps>({
    title: '',
    description: '',
    deadline: '',
    link: '',
    status: 'belum',
    googleCalendar: false,
  });
  const [loginProvider, setLoginProvider] = useState<
    'google' | 'email' | 'unknown'
  >('unknown');
  const [providerLoading, setProviderLoading] = useState(true);

  const { user, setProvider } = useUserStore();
  const storedProvider = user?.provider;
  const currentProvider = storedProvider || loginProvider;
  const isGoogleLogin = currentProvider === 'google';
  const hasGoogleAccess = isGoogleLogin && localStorage.getItem('google_access_token');

  useEffect(() => {
    const checkProvider = async () => {
      try {
        // If provider is already stored, use it and skip loading
        if (storedProvider && storedProvider !== 'unknown') {
          setLoginProvider(storedProvider);
          setProviderLoading(false);
          return;
        }

        setProviderLoading(true);
        
        // Wait for auth state to be ready
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
          if (authUser) {
            const provider = await getLoginProvider();
            setLoginProvider(provider);
            setProvider(provider); // Store in user store
          } else {
            setLoginProvider('unknown');
            setProvider('unknown');
          }
          setProviderLoading(false);
          unsubscribe(); // Cleanup listener after first check
        });

        // Fallback timeout in case auth state doesn't change
        const timeout = setTimeout(() => {
          setProviderLoading(false);
          unsubscribe();
        }, 3000);

        return () => {
          clearTimeout(timeout);
          unsubscribe();
        };
      } catch (error) {
        console.error('Error checking login provider:', error);
        setProviderLoading(false);
        setLoginProvider('unknown');
      }
    };

    checkProvider();
  }, [user, storedProvider, setProvider]);

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData(task);
    }
  }, [task, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.uid) {
      toast.error('Anda harus login untuk menambah tugas');
      return;
    }

    if (!formData.title?.trim()) {
      toast.error('Judul tugas harus diisi');
      return;
    }

    if (!formData.deadline) {
      toast.error('Deadline harus diisi');
      return;
    }

    setLoading(true);

    try {
      const taskInput = convertTaskCardToInput(formData);

      if (mode === 'add') {
        const result = await createTaskWithCalendar(user.uid, taskInput);

        if (result.calendarEventId) {
          toast.success('Tugas berhasil ditambahkan ke Google Calendar! 📅');
        } else if (taskInput.googleCalendar) {
          toast.success('Tugas berhasil ditambahkan (tanpa calendar)');
        } else {
          toast.success('Tugas berhasil ditambahkan');
        }
      } else if (mode === 'edit' && task?.id) {
        await updateTask(user.uid, task.id, taskInput);
        toast.success('Tugas berhasil diperbarui');
      }

      // Call the callback if provided (for parent component updates)
      if (onSave) {
        onSave(formData);
      }

      setOpen(false);

      // Reset form for add mode
      if (mode === 'add') {
        setFormData({
          title: '',
          description: '',
          deadline: '',
          link: '',
          status: 'belum',
          googleCalendar: false,
        });
      }
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error(
        mode === 'add' ? 'Gagal menambahkan tugas' : 'Gagal memperbarui tugas'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (id: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'add' ? (
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Tugas
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Tambah Tugas Baru' : 'Edit Tugas'}
            </DialogTitle>
            <div className="mt-4 flex flex-col gap-4">
              <FormField
                id="title"
                label="Judul Tugas"
                placeholder="Masukkan judul tugas"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              <FormField
                id="description"
                label="Deskripsi (opsional)"
                placeholder="Tulis deskripsi jika ada"
                component="textarea"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
              />

              <FormField
                id="link"
                label="Link (opsional)"
                type="url"
                placeholder="https://contoh.com"
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
              />

              <FormField
                id="deadline"
                label="Deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                required
              />

              <div className="flex items-center space-x-2">
                <Switch
                  id="google-calendar"
                  checked={formData.googleCalendar}
                  disabled={providerLoading || !hasGoogleAccess}
                  onCheckedChange={(checked) =>
                    handleInputChange('googleCalendar', checked)
                  }
                />
                <Label htmlFor="google-calendar">
                  Tambahkan ke Google Calendar
                  {providerLoading && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      (Loading...)
                    </span>
                  )}
                </Label>
              </div>

              {!providerLoading && !isGoogleLogin && (
                <p className="text-xs text-red-500">
                  Login dengan Google untuk menggunakan fitur ini
                </p>
              )}

              {!providerLoading && isGoogleLogin && !localStorage.getItem('google_access_token') && (
                <p className="text-xs text-yellow-600">
                  Akses Google Calendar tidak tersedia. Silakan login ulang.
                </p>
              )}

              {!providerLoading && hasGoogleAccess && (
                <p className="text-sm text-muted-foreground">
                  Tugas akan otomatis ditambahkan ke Google Calendar Anda
                </p>
              )}
            </div>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : mode === 'add' ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
