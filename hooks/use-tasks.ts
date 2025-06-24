import { useState, useEffect } from 'react';
import { subscribeToTasks, subscribeToTasksByStatus, Task } from '@/lib/firebase/task';
import { useUserStore } from '@/store/user-store';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToTasks(
      user.uid,
      (updatedTasks) => {
        setTasks(updatedTasks);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return {
    tasks,
    loading,
    error,
  };
};

export const useTasksByStatus = (status: 'belum' | 'proses' | 'selesai') => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToTasksByStatus(
      user.uid,
      status,
      (updatedTasks) => {
        setTasks(updatedTasks);
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching ${status} tasks:`, error);
        setError(`Failed to fetch ${status} tasks`);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.uid, status]);

  return {
    tasks,
    loading,
    error,
  };
}; 