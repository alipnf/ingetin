export type TaskCardProps = {
  id?: string;
  title?: string;
  description?: string;
  deadline?: string;
  link?: string;
  status?: string;
  googleCalendar?: boolean;
  googleCalendarEventId?: string; // ✨ Add this for Calendar integration
  onStatusChange?: (value: string) => void;
  onEdit?: (task: TaskCardProps) => void;
  onDelete?: () => void;
};
