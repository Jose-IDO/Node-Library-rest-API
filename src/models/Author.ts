export interface Author {
  id: number;
  name: string;
}

let authors: Author[] = [];
let nextAuthorId = 1;

export const createAuthor = (name: string): Author => {
  const author: Author = {
    id: nextAuthorId++,
    name
  };
  authors.push(author);
  return author;
};

export const getAllAuthors = (): Author[] => {
  return authors;
};

export const getAuthorById = (id: number): Author | undefined => {
  return authors.find(author => author.id === id);
};

export const updateAuthor = (id: number, name: string): Author | undefined => {
  const authorIndex = authors.findIndex(author => author.id === id);
  if (authorIndex !== -1) {
    authors[authorIndex].name = name;
    return authors[authorIndex];
  }
  return undefined;
};

export const deleteAuthor = (id: number): boolean => {
  const authorIndex = authors.findIndex(author => author.id === id);
  if (authorIndex !== -1) {
    authors.splice(authorIndex, 1);
    return true;
  }
  return false;
};
