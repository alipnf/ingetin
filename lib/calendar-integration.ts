import { createTask, updateTask, deleteTask, TaskInput } from './firebase/task';
import { toast } from 'sonner';

export type CalendarEvent = {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup';
      minutes: number;
    }>;
  };
};

export class GoogleCalendarService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async createEvent(event: CalendarEvent): Promise<string | null> {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: this.accessToken,
          action: 'create',
          data: { event },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.eventId || null;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async updateEvent(
    eventId: string,
    event: Partial<CalendarEvent>
  ): Promise<void> {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: this.accessToken,
          action: 'update',
          data: { eventId, event },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw new Error('Failed to update calendar event');
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: this.accessToken,
          action: 'delete',
          data: { eventId },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw new Error('Failed to delete calendar event');
    }
  }
}

export function createCalendarEventFromTask(task: {
  title: string;
  description?: string;
  deadline: string;
}): CalendarEvent {
  const deadlineDate = new Date(task.deadline);

  const startDate = new Date(deadlineDate);
  startDate.setDate(startDate.getDate() - 1);
  startDate.setHours(23, 55, 0, 0);

  const endDate = new Date(deadlineDate);
  endDate.setHours(0, 0, 0, 0);

  return {
    summary: `📝 ${task.title}`,
    description: task.description || 'Task deadline reminder',
    start: {
      dateTime: startDate.toISOString(),
      timeZone: 'Asia/Jakarta',
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: 'Asia/Jakarta',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 60 },
      ],
    },
  };
}

export async function createTaskWithCalendar(
  userId: string,
  taskData: TaskInput
): Promise<{ taskId: string; calendarEventId?: string }> {
  // If Google Calendar is not enabled, create task normally
  if (!taskData.googleCalendar) {
    const taskId = await createTask(userId, taskData);
    return { taskId };
  }

  try {
    const accessToken = localStorage.getItem('google_access_token');
    if (!accessToken) {
      toast.error('Google access token tidak ditemukan. Silakan login ulang.');
      const taskId = await createTask(userId, {
        ...taskData,
        googleCalendar: false,
      });
      return { taskId };
    }

    const calendarService = new GoogleCalendarService(accessToken);
    const calendarEvent = createCalendarEventFromTask(taskData);
    const eventId = await calendarService.createEvent(calendarEvent);

    const taskWithCalendar = {
      ...taskData,
      googleCalendarEventId: eventId || undefined,
    };

    const taskId = await createTask(userId, taskWithCalendar);

    return {
      taskId,
      calendarEventId: eventId || undefined,
    };
  } catch (error) {
    console.error('Calendar integration failed:', error);
    toast.error('Gagal menambahkan ke Google Calendar');

    const taskId = await createTask(userId, {
      ...taskData,
      googleCalendar: false,
    });

    return { taskId };
  }
}

export async function updateTaskWithCalendar(
  userId: string,
  taskId: string,
  oldData: TaskInput,
  newData: Partial<TaskInput>
): Promise<void> {
  try {
    await updateTask(userId, taskId, newData);

    const accessToken = localStorage.getItem('google_access_token');
    if (!accessToken || !oldData.googleCalendarEventId) {
      return;
    }

    const calendarService = new GoogleCalendarService(accessToken);

    if (newData.googleCalendar === false && oldData.googleCalendarEventId) {
      await calendarService.deleteEvent(oldData.googleCalendarEventId);
      await updateTask(userId, taskId, { googleCalendarEventId: undefined });
      return;
    }

    if (oldData.googleCalendar && newData.googleCalendar !== false) {
      const updatedTask = { ...oldData, ...newData };
      const updatedEvent = createCalendarEventFromTask(updatedTask);

      await calendarService.updateEvent(
        oldData.googleCalendarEventId,
        updatedEvent
      );
    }
  } catch (error) {
    console.error('Calendar sync failed during update:', error);
    toast.error('Tugas diperbarui, tapi gagal sync dengan Google Calendar');
  }
}

export async function deleteTaskWithCalendar(
  userId: string,
  taskId: string,
  taskData: { googleCalendar: boolean; googleCalendarEventId?: string }
): Promise<void> {
  try {
    await deleteTask(userId, taskId);

    if (taskData.googleCalendar && taskData.googleCalendarEventId) {
      const accessToken = localStorage.getItem('google_access_token');
      if (accessToken) {
        const calendarService = new GoogleCalendarService(accessToken);
        await calendarService.deleteEvent(taskData.googleCalendarEventId);
      }
    }
  } catch (error) {
    console.error('Calendar cleanup failed during delete:', error);
    toast.error('Tugas dihapus, tapi gagal menghapus dari Google Calendar');
  }
}

export function hasCalendarAccess(): boolean {
  return !!localStorage.getItem('google_access_token');
}

export function clearCalendarAccess(): void {
  localStorage.removeItem('google_access_token');
}
