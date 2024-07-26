import { Router, Request, Response } from 'express';
import { TaskManager } from '../tasks/taskManager';

const router = Router();
const taskManager = new TaskManager();

router.post('/', (req: Request, res: Response) => {
  const { url, method, headers, body, schedule } = req.body;
  const task = taskManager.addTask(url, method, headers, body, schedule);
  const { cronJob, ...taskWithoutCronJob } = task;
  res.status(201).json(taskWithoutCronJob);
});

router.get('/', (req: Request, res: Response) => {
  const tasks = taskManager.listTasks().map(task => {
    const { cronJob, ...taskWithoutCronJob } = task;
    return taskWithoutCronJob;
  });
  res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
  const task = taskManager.getTask(req.params.id);
  if (task) {
    const { cronJob, ...taskWithoutCronJob } = task;
    res.json(taskWithoutCronJob);
  } else {
    res.status(404).send('Task not found');
  }
});

router.put('/:id', (req: Request, res: Response) => {
  const { url, method, headers, body, schedule } = req.body;
  const updated = taskManager.updateTask(req.params.id, url, method, headers, body, schedule);
  if (updated) {
    const task = taskManager.getTask(req.params.id);
    if (task) {
      const { cronJob, ...taskWithoutCronJob } = task;
      res.json(taskWithoutCronJob);
    }
  } else {
    res.status(404).send('Task not found');
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const deleted = taskManager.deleteTask(req.params.id);
  if (deleted) {
    res.send('Task deleted');
  } else {
    res.status(404).send('Task not found');
  }
});

export default router;
