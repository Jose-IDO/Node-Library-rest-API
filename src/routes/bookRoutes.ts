import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../models/Book';
import { validateBookPayload } from '../middleware/validation';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

router.post('/', validateBookPayload, (req, res, next) => {
  try {
    const { title, authorId, year } = req.body;
    const book = createBook(title.trim(), authorId, year);
    res.status(201).json(book);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return next(createError(error.message, 409));
    }
    next(error);
  }
});

router.get('/', (req, res) => {
  const books = getAllBooks();
  res.status(200).json(books);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return next(createError('Invalid book ID', 400));
  }

  const book = getBookById(id);
  
  if (!book) {
    return next(createError('Book not found', 404));
  }

  res.status(200).json(book);
});

router.put('/:id', validateBookPayload, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { title, authorId, year } = req.body;
    
    if (isNaN(id)) {
      return next(createError('Invalid book ID', 400));
    }

    const book = updateBook(id, title.trim(), authorId, year);
    
    if (!book) {
      return next(createError('Book not found', 404));
    }

    res.status(200).json(book);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return next(createError(error.message, 409));
    }
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return next(createError('Invalid book ID', 400));
  }

  const deleted = deleteBook(id);
  
  if (!deleted) {
    return next(createError('Book not found', 404));
  }

  res.status(204).send();
});

export { router as bookRoutes };
