import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyTasks } from '@/data/dummy/tasks';
import { useState } from 'react';
import { TaskCardProps } from '@/types/task-card';
import { TaskCard } from './task-card';

export function ListView() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(dummyTasks);

  const tabs = [
    { label: 'Semua', value: 'semua' },
    { label: 'Belum dikerjakan', value: 'belum' },
    { label: 'Sedang dikerjakan', value: 'proses' },
    { label: 'Selesai', value: 'selesai' },
  ];

  const handleStatusChange = (taskIndex: number, value: string) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[taskIndex] = { ...newTasks[taskIndex], status: value };
      return newTasks;
    });
  };

  const handleEditTask = (taskIndex: number, updatedTask: TaskCardProps) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[taskIndex] = updatedTask;
      return newTasks;
    });
  };

  const handleDeleteTask = (taskIndex: number) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(taskIndex, 1);
      return newTasks;
    });
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
            {tasks
              .filter(
                (task) => tab.value === 'semua' || task.status === tab.value
              )
              .map((task, index) => (
                <TaskCard
                  key={index}
                  {...task}
                  onStatusChange={(value) => handleStatusChange(index, value)}
                  onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
                  onDelete={() => handleDeleteTask(index)}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
