import express from 'express';
import { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } from '../models/Author';
import { getBooksByAuthorId } from '../models/Book';
import { validateAuthorPayload } from '../middleware/validation';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

router.post('/', validateAuthorPayload, (req, res) => {
  const { name } = req.body;
  const author = createAuthor(name.trim());
  res.status(201).json(author);
});

router.get('/', (req, res) => {
  const authors = getAllAuthors();
  res.status(200).json(authors);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return next(createError('Invalid author ID', 400));
  }

  const author = getAuthorById(id);
  
  if (!author) {
    return next(createError('Author not found', 404));
  }

  res.status(200).json(author);
});

router.put('/:id', validateAuthorPayload, (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  
  if (isNaN(id)) {
    return next(createError('Invalid author ID', 400));
  }

  const author = updateAuthor(id, name.trim());
  
  if (!author) {
    return next(createError('Author not found', 404));
  }

  res.status(200).json(author);
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return next(createError('Invalid author ID', 400));
  }

  const deleted = deleteAuthor(id);
  
  if (!deleted) {
    return next(createError('Author not found', 404));
  }

  res.status(204).send();
});

router.get('/:id/books', (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return next(createError('Invalid author ID', 400));
  }

  const author = getAuthorById(id);
  if (!author) {
    return next(createError('Author not found', 404));
  }

  const books = getBooksByAuthorId(id);
  res.status(200).json(books);
});

export { router as authorRoutes };
