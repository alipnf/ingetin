import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from './config-client';
import { TaskCardProps } from '@/types/task-card';

export type Task = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  link: string;
  status: 'belum' | 'proses' | 'selesai';
  googleCalendar: boolean;
  createdAt: Timestamp;
};

export type TaskInput = Omit<Task, 'id' | 'createdAt'>;

export const createTask = async (
  userId: string,
  taskData: TaskInput
): Promise<string> => {
  try {
    const tasksRef = collection(db, 'users', userId, 'tasks');
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (
  userId: string,
  taskId: string,
  taskData: Partial<TaskInput>
): Promise<void> => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, taskData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (
  userId: string,
  taskId: string
): Promise<void> => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const getTask = async (
  userId: string,
  taskId: string
): Promise<Task | null> => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      return {
        id: taskSnap.id,
        ...taskSnap.data(),
      } as Task;
    }
    return null;
  } catch (error) {
    console.error('Error getting task:', error);
    throw error;
  }
};

// Real-time listener for all tasks
export const subscribeToTasks = (
  userId: string,
  callback: (tasks: Task[]) => void,
  errorCallback?: (error: Error) => void
): (() => void) => {
  try {
    const tasksRef = collection(db, 'users', userId, 'tasks');
    const q = query(tasksRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasks: Task[] = [];
        snapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          } as Task);
        });
        callback(tasks);
      },
      (error) => {
        console.error('Error in tasks subscription:', error);
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up tasks subscription:', error);
    throw error;
  }
};

// Real-time listener for tasks by status
export const subscribeToTasksByStatus = (
  userId: string,
  status: 'belum' | 'proses' | 'selesai',
  callback: (tasks: Task[]) => void,
  errorCallback?: (error: Error) => void
): (() => void) => {
  try {
    const tasksRef = collection(db, 'users', userId, 'tasks');
    const q = query(
      tasksRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasks: Task[] = [];
        snapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          } as Task);
        });
        callback(tasks);
      },
      (error) => {
        console.error('Error in tasks by status subscription:', error);
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up tasks by status subscription:', error);
    throw error;
  }
};

export const convertTaskCardToInput = (taskCard: TaskCardProps): TaskInput => {
  return {
    title: taskCard.title || '',
    description: taskCard.description || '',
    deadline: taskCard.deadline || '',
    link: taskCard.link || '',
    status: (taskCard.status as 'belum' | 'proses' | 'selesai') || 'belum',
    googleCalendar: taskCard.googleCalendar || false,
  };
};

export const convertTaskToTaskCard = (task: Task): TaskCardProps => {
  return {
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    link: task.link,
    status: task.status,
    googleCalendar: task.googleCalendar,
  };
};
