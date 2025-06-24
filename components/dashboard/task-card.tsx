import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { TaskCardProps } from '@/types/task-card';
import { DeleteTask, AddTask } from './index';
import { updateTask } from '@/lib/firebase/task';
import { useUserStore } from '@/store/user-store';
import { toast } from 'sonner';

export interface TaskCardPropsWithId extends TaskCardProps {
  id: string;
}

export function TaskCard({
  id,
  title,
  description,
  deadline,
  link,
  status,
  googleCalendar,
  googleCalendarEventId,
  onStatusChange = () => {},
  onEdit,
  onDelete,
}: TaskCardPropsWithId) {
  const { user } = useUserStore();

  const handleStatusChange = async (newStatus: string) => {
    if (!user?.uid) {
      toast.error('Anda harus login untuk mengubah status');
      return;
    }

    if (newStatus === 'semua') return;

    try {
      await updateTask(user.uid, id, { 
        status: newStatus as 'belum' | 'proses' | 'selesai' 
      });
      toast.success('Status tugas berhasil diperbarui');
      
      // Call the callback if provided
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Gagal memperbarui status tugas');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg sm:text-xl break-words">
          {title}
        </CardTitle>
        <CardDescription className="text-sm break-words">
          {description || 'Tidak ada deskripsi.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-medium min-w-[80px]">Deadline:</span>
          <span className="break-words">{deadline}</span>
        </div>

        {link && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-medium min-w-[80px]">Link:</span>
            <a
              href={link}
              className="underline text-blue-500 hover:text-blue-700 break-all"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          </div>
        )}

        {googleCalendar && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-medium min-w-[80px]">Google Calendar:</span>
            <span className="text-green-600 font-medium">✓ Ditambahkan</span>
          </div>
        )}

        {/* Status Select */}
        <div className="flex flex-col gap-1.5">
          <span className="font-medium">Status:</span>
          <Select defaultValue={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="belum">Belum dikerjakan</SelectItem>
              <SelectItem value="proses">Sedang dikerjakan</SelectItem>
              <SelectItem value="selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
        <AddTask
          mode="edit"
          task={{ id, title, description, deadline, link, status, googleCalendar, googleCalendarEventId }}
          onSave={onEdit}
        />
        <DeleteTask 
          taskId={id}
          taskData={{
            googleCalendar: googleCalendar || false,
            googleCalendarEventId: googleCalendarEventId,
          }}
          onDelete={onDelete} 
        />
      </CardFooter>
    </Card>
  );
}
