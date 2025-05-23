import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import FormField from '../form-field';

export default function AddTask() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Tugas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Tugas Baru</DialogTitle>
          <div className="mt-4 flex flex-col gap-4">
            <FormField
              id="judul"
              label="Judul Tugas"
              placeholder="Masukkan judul tugas"
            />

            <FormField
              id="deskripsi"
              label="Deskripsi (opsional)"
              placeholder="Tulis deskripsi jika ada"
              component="textarea"
            />

            <FormField
              id="link"
              label="Link (opsional)"
              type="url"
              placeholder="https://contoh.com"
            />

            <FormField id="tanggal" label="Deadline" type="date" />

            <div className="flex items-center space-x-2">
              <Checkbox id="google-calendar" />
              <Label htmlFor="google-calendar">
                Tambahkan ke Google Calendar
              </Label>
            </div>

            <p className="text-sm text-muted-foreground">
              Tugas akan otomatis ditambahkan ke Google Calendar Anda
            </p>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogTrigger asChild>
            <Button variant="outline">Batal</Button>
          </DialogTrigger>
          <Button type="submit">Tambah</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
