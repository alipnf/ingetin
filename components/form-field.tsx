import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  component?: 'input' | 'textarea';
  required?: boolean;
};

export default function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  component = 'input',
  required = false,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id}>{label}</Label>
      {component === 'textarea' ? (
        <Textarea id={id} placeholder={placeholder} required={required} />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
