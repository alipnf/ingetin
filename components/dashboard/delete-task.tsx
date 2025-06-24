import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteTask } from '@/lib/firebase/task';
import { deleteTaskWithCalendar } from '@/lib/calendar-integration';
import { useUserStore } from '@/store/user-store';

type DeleteTaskProps = {
  taskId?: string;
  taskData?: {
    googleCalendar: boolean;
    googleCalendarEventId?: string;
  };
  onDelete?: () => void;
};

export function DeleteTask({ taskId, taskData, onDelete = () => {} }: DeleteTaskProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  const handleDelete = async () => {
    if (!user?.uid) {
      toast.error('Anda harus login untuk menghapus tugas');
      return;
    }

    if (!taskId) {
      toast.error('ID tugas tidak ditemukan');
      return;
    }

    setLoading(true);

    try {
      // Use calendar integration if task data is provided
      if (taskData) {
        await deleteTaskWithCalendar(user.uid, taskId, taskData);
        
        if (taskData.googleCalendar && taskData.googleCalendarEventId) {
          toast.success('Tugas dan event calendar berhasil dihapus 📅');
        } else {
          toast.success('Tugas berhasil dihapus');
        }
      } else {
        // Fallback to regular delete
        await deleteTask(user.uid, taskId);
        toast.success('Tugas berhasil dihapus');
      }
      
      onDelete();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Gagal menghapus tugas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={loading}>
          <Trash className="h-4 w-4 mr-2" />
          {loading ? 'Menghapus...' : 'Hapus'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Tugas ini akan dihapus secara
            permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
