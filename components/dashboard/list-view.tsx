import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskCard } from './task-card';
import { useTasks } from '@/hooks/use-tasks';
import { convertTaskToTaskCard } from '@/lib/firebase/task';
import { TaskLoadingGrid } from './task-loading-skeleton';

export function ListView() {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <TaskLoadingGrid count={6} />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Belum ada tugas. Tambahkan tugas pertama Anda!</p>
      </div>
    );
  }

  const tabs = [
    { label: 'Semua', value: 'semua' },
    { label: 'Belum dikerjakan', value: 'belum' },
    { label: 'Sedang dikerjakan', value: 'proses' },
    { label: 'Selesai', value: 'selesai' },
  ];

  return (
    <Tabs defaultValue="semua" className="w-full">
      <TabsList className="flex flex-wrap gap-2 h-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter(
                (task) => tab.value === 'semua' || task.status === tab.value
              )
              .map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  {...convertTaskToTaskCard(task)}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
