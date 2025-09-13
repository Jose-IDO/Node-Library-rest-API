import { Request, Response, NextFunction } from 'express';
import { getAuthorById } from '../models/Author';

export const validateBookPayload = (req: Request, res: Response, next: NextFunction) => {
  const { title, authorId, year } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!authorId || typeof authorId !== 'number') {
    return res.status(400).json({ error: 'Author ID is required and must be a number' });
  }

  if (!year || typeof year !== 'number' || year < 1000 || year > new Date().getFullYear() + 10) {
    return res.status(400).json({ error: 'Year is required and must be a valid year' });
  }

  const author = getAuthorById(authorId);
  if (!author) {
    return res.status(400).json({ error: 'Author not found' });
  }

  next();
};

export const validateAuthorPayload = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  next();
};
