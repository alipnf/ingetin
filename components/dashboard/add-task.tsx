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
import { createTask, updateTask, convertTaskCardToInput } from '@/lib/firebase/task';
import { useUserStore } from '@/store/user-store';

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

  const { user } = useUserStore();
  const isGoogleLogin = loginProvider === 'google';

  useEffect(() => {
    const checkProvider = async () => {
      const provider = await getLoginProvider();
      setLoginProvider(provider);
    };

    checkProvider();
  }, []);

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
        await createTask(user.uid, taskInput);
        toast.success('Tugas berhasil ditambahkan');
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
      toast.error(mode === 'add' ? 'Gagal menambahkan tugas' : 'Gagal memperbarui tugas');
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
                  disabled={!isGoogleLogin}
                  onCheckedChange={(checked) =>
                    handleInputChange('googleCalendar', checked)
                  }
                />
                <Label htmlFor="google-calendar">
                  Tambahkan ke Google Calendar
                </Label>
              </div>

              {!isGoogleLogin && (
                <p className="text-xs text-red-500">
                  Login dengan Google untuk menggunakan fitur ini
                </p>
              )}

              <p className="text-sm text-muted-foreground">
                Tugas akan otomatis ditambahkan ke Google Calendar Anda
              </p>
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
              {loading ? 'Menyimpan...' : (mode === 'add' ? 'Tambah' : 'Simpan')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
