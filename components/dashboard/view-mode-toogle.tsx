import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ViewModeToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  return (
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
  );
}
