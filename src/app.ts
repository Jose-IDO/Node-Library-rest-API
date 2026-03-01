import express from 'express';
import { authorRoutes } from './routes/authorRoutes';
import { bookRoutes } from './routes/bookRoutes';
import { loggerMiddleware } from './middleware/logger';
import { errorHandler, notFound } from './middleware/errorHandler';
import { seedData } from './data/seedData';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

seedData();

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
