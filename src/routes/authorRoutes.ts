import express from 'express';
import { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } from '../models/Author';

const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  const author = createAuthor(name.trim());
  res.status(201).json(author);
});

router.get('/', (req, res) => {
  const authors = getAllAuthors();
  res.status(200).json(authors);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid author ID' });
  }

  const author = getAuthorById(id);
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.status(200).json(author);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid author ID' });
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  const author = updateAuthor(id, name.trim());
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.status(200).json(author);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid author ID' });
  }

  const deleted = deleteAuthor(id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.status(204).send();
});

export { router as authorRoutes };
