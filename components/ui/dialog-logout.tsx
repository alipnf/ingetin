import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export function DialogLogout({ handleLogout }: { handleLogout: () => void }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      await handleLogout();
      setOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Keluar akun</DialogTitle>
          <DialogDescription>
            Yakin ingin keluar dari akun ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Batal
            </Button>
          </DialogClose>
          <Button onClick={onLogout} variant="destructive" disabled={loading}>
            {loading ? 'Memproses...' : 'Keluar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
