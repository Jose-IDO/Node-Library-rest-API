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
  let books = getAllBooks();
  const { search, author, year, sort, page, limit } = req.query;

  if (search) {
    const searchTerm = (search as string).toLowerCase();
    books = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm)
    );
  }

  if (author) {
    const authorId = parseInt(author as string);
    if (!isNaN(authorId)) {
      books = books.filter(book => book.authorId === authorId);
    }
  }

  if (year) {
    const yearNum = parseInt(year as string);
    if (!isNaN(yearNum)) {
      books = books.filter(book => book.year === yearNum);
    }
  }

  if (sort) {
    const sortField = sort as string;
    if (sortField === 'title') {
      books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortField === 'year') {
      books.sort((a, b) => a.year - b.year);
    } else if (sortField === 'author') {
      books.sort((a, b) => a.authorId - b.authorId);
    }
  }

  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedBooks = books.slice(startIndex, endIndex);

  res.status(200).json({
    books: paginatedBooks,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: books.length,
      pages: Math.ceil(books.length / limitNum)
    }
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  const book = getBookById(id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
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
