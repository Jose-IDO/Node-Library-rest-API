import express from 'express';
import { authorRoutes } from './routes/authorRoutes';
import { loggerMiddleware } from './middleware/logger';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/authors', authorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
