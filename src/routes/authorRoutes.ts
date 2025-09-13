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
  let authors = getAllAuthors();
  const { search, sort, page, limit } = req.query;

  if (search) {
    const searchTerm = (search as string).toLowerCase();
    authors = authors.filter(author => 
      author.name.toLowerCase().includes(searchTerm)
    );
  }

  if (sort) {
    const sortField = sort as string;
    if (sortField === 'name') {
      authors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortField === 'id') {
      authors.sort((a, b) => a.id - b.id);
    }
  }

  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedAuthors = authors.slice(startIndex, endIndex);

  res.status(200).json({
    authors: paginatedAuthors,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: authors.length,
      pages: Math.ceil(authors.length / limitNum)
    }
  });
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
