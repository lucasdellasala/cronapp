import cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';
import { makeApiCall } from '../services/apiService';

interface Task {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
  schedule: string;
  cronJob: cron.ScheduledTask;
}

export class TaskManager {
  private tasks: Map<string, Task> = new Map();

  public addTask(
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    schedule: string
  ): Task {
    const id = uuidv4();
    const cronJob = cron.schedule(schedule, async () => {
      try {
        const response = await makeApiCall(url, method as any, headers, body);
        console.log(`Task ${id} executed successfully:`, response);
      } catch (error) {
        console.error(`Error executing task ${id}:`, error);
      }
    });
    const task = { id, url, method, headers, body, schedule, cronJob };
    this.tasks.set(id, task);
    return task;
  }

  public listTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  public getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  public updateTask(
    id: string,
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    schedule: string
  ): boolean {
    const task = this.tasks.get(id);
    if (task) {
      task.cronJob.stop();
      task.url = url;
      task.method = method;
      task.headers = headers;
      task.body = body;
      task.schedule = schedule;
      task.cronJob = cron.schedule(schedule, async () => {
        try {
          const response = await makeApiCall(url, method as any, headers, body);
          console.log(`Task ${id} executed successfully:`, response);
        } catch (error) {
          console.error(`Error executing task ${id}:`, error);
        }
      });
      return true;
    }
    return false;
  }

  public deleteTask(id: string): boolean {
    const task = this.tasks.get(id);
    if (task) {
      task.cronJob.stop();
      this.tasks.delete(id);
      return true;
    }
    return false;
  }
}
