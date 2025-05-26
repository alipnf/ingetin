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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  component = 'input',
  required = false,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id}>{label}</Label>
      {component === 'textarea' ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
