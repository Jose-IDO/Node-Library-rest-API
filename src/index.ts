import express from 'express';
import { authorRoutes } from './routes/authorRoutes';
import { bookRoutes } from './routes/bookRoutes';
import { loggerMiddleware } from './middleware/logger';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
