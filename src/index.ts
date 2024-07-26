import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`😀 Server running on http://localhost:${port}`);
});
