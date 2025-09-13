import { createAuthor } from '../models/Author';
import { createBook } from '../models/Book';

export const seedData = () => {
  const authors = [
    createAuthor('J.K. Rowling'),
    createAuthor('George Orwell'),
    createAuthor('Harper Lee')
  ];

  const books = [
    createBook('Harry Potter and the Philosopher\'s Stone', authors[0].id, 1997),
    createBook('Harry Potter and the Chamber of Secrets', authors[0].id, 1998),
    createBook('1984', authors[1].id, 1949),
    createBook('Animal Farm', authors[1].id, 1945),
    createBook('To Kill a Mockingbird', authors[2].id, 1960)
  ];

  return { authors, books };
};
