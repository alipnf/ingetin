'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('list'); // 'list' atau 'kanban'

  return (
    <main className="container mx-auto min-h-screen justify-center px-5 md:px-3">
      <div className="flex items-center justify-items-center justify-between my-3">
        <h1 className="text-2xl font-semibold tracking-tight">Daftar Tugas</h1>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {viewMode === 'list' ? (
                  <List className="h-4 w-4 mr-2" />
                ) : (
                  <LayoutGrid className="h-4 w-4 mr-2" />
                )}
                <span className="hidden xs:inline sm:inline">
                  {viewMode === 'list' ? 'Tampilan List' : 'Tampilan Kanban'}
                </span>{' '}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
                <span>Tampilan List</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setViewMode('kanban')}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Tampilan Kanban</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Tugas
          </Button>
        </div>
      </div>
    </main>
  );
}
