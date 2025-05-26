import { Button } from '@/components/ui/button';
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
import { Trash } from 'lucide-react';
import { TaskCardProps } from '@/types/task-card';
import AddTask from './add-task';

export default function TaskCard({
  title,
  description,
  deadline,
  link,
  status,
  onStatusChange = () => {},
  onEdit,
  onDelete,
}: TaskCardProps) {
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

        {/* Status Select */}
        <div className="flex flex-col gap-1.5">
          <span className="font-medium">Status:</span>
          <Select defaultValue={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="semua">Semua</SelectItem>
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
          task={{ title, description, deadline, link, status }}
          onSave={onEdit}
        />
        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={onDelete}
          size="sm"
        >
          <Trash className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
}
