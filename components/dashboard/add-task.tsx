import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TaskCardProps } from '@/types/task-card';

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

type AddTaskProps = {
  task?: TaskCardProps;
  onSave?: (task: TaskCardProps) => void;
  mode?: 'add' | 'edit';
};

export function AddTask({ task, onSave, mode = 'add' }: AddTaskProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TaskCardProps>({
    title: '',
    description: '',
    deadline: '',
    link: '',
    status: 'belum',
  });

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData(task);
    }
  }, [task, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    setOpen(false);
  };

  const handleInputChange = (id: string, value: string) => {
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
                <Switch id="google-calendar" />
                <Label htmlFor="google-calendar">
                  Tambahkan ke Google Calendar
                </Label>
              </div>

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
            >
              Batal
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
