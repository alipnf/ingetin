export type TaskCardProps = {
  title?: string;
  description?: string;
  deadline?: string;
  link?: string;
  status?: string;
  onStatusChange?: (value: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
};
