import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../models/Book';
import { validateBookPayload } from '../middleware/validation';

const router = express.Router();

router.post('/', validateBookPayload, (req, res) => {
  const { title, authorId, year } = req.body;
  const book = createBook(title.trim(), authorId, year);
  res.status(201).json(book);
});

router.get('/', (req, res) => {
  const books = getAllBooks();
  res.status(200).json(books);
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

router.put('/:id', validateBookPayload, (req, res) => {
  const id = parseInt(req.params.id);
  const { title, authorId, year } = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  const book = updateBook(id, title.trim(), authorId, year);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json(book);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  const deleted = deleteBook(id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(204).send();
});

export { router as bookRoutes };
