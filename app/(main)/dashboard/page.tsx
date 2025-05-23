'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import ViewModeToggle from '@/components/dashboard/view-mode-toogle';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('list'); // 'list' atau 'kanban'

  return (
    <main className="container mx-auto min-h-screen justify-center px-5 md:px-3">
      <div className="flex items-center justify-items-center justify-between my-3">
        <h1 className="text-2xl font-semibold tracking-tight">Daftar Tugas</h1>

        <div className="flex gap-2">
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Tugas
          </Button>
        </div>
      </div>
    </main>
  );
}
