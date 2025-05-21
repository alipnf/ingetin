import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type FormFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
};

export default function FormField({
  id,
  label,
  type,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} required />
    </div>
  );
}
