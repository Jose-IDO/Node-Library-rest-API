export interface Book {
  id: number;
  title: string;
  authorId: number;
  year: number;
}

let books: Book[] = [];
let nextBookId = 1;

export const createBook = (title: string, authorId: number, year: number): Book => {
  const book: Book = {
    id: nextBookId++,
    title,
    authorId,
    year
  };
  books.push(book);
  return book;
};

export const getAllBooks = (): Book[] => {
  return books;
};

export const getBookById = (id: number): Book | undefined => {
  return books.find(book => book.id === id);
};

export const updateBook = (id: number, title: string, authorId: number, year: number): Book | undefined => {
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex].title = title;
    books[bookIndex].authorId = authorId;
    books[bookIndex].year = year;
    return books[bookIndex];
  }
  return undefined;
};

export const deleteBook = (id: number): boolean => {
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return true;
  }
  return false;
};

export const getBooksByAuthorId = (authorId: number): Book[] => {
  return books.filter(book => book.authorId === authorId);
};
