import express from 'express';
import { authorRoutes } from './routes/authorRoutes';
import { bookRoutes } from './routes/bookRoutes';
import { loggerMiddleware } from './middleware/logger';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
