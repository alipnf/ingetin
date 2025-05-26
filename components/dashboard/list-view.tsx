import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard from './task-card';
import { dummyTasks } from '@/data/dummy/tasks';

export default function ListView() {
  const tabs = [
    { label: 'Semua', value: 'semua' },
    { label: 'Belum dikerjakan', value: 'belum' },
    { label: 'Sedang dikerjakan', value: 'proses' },
    { label: 'Selesai', value: 'selesai' },
  ];

  const handleStatusChange = (value: string) => {
    console.log('Status changed to:', value);
  };

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
            {dummyTasks
              .filter(
                (task) => tab.value === 'semua' || task.status === tab.value
              )
              .map((task, index) => (
                <TaskCard
                  key={index}
                  {...task}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
