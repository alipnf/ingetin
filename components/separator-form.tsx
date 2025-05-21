import { Separator } from '@/components/ui/separator';

export default function SeparatorForm({ children }: { children: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {children}
        </span>
      </div>
    </div>
  );
}
