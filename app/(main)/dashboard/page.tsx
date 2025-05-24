'use client';

import { useState } from 'react';
import ViewModeToggle from '@/components/dashboard/view-mode-toogle';
import AddTask from '@/components/dashboard/add-task';
import ListView from '@/components/dashboard/list-view';
import KanbanView from '@/components/dashboard/kanban-view';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('list'); // 'list' atau 'kanban'

  return (
    <main className="container mx-auto min-h-screen justify-center px-5 md:px-3">
      <div className="flex items-center justify-items-center justify-between my-3">
        <h1 className="text-2xl font-semibold tracking-tight">Daftar Tugas</h1>

        <div className="flex gap-2">
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          <AddTask />
        </div>
      </div>
      {viewMode === 'list' && <ListView />}
      {viewMode === 'kanban' && <KanbanView />}
    </main>
  );
}
