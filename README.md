 
A RESTful API for managing a library system with authors and books. Built with TypeScript, Express.js, and in-memory storage.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:3000`

## Core Features

### Create New Author
**Endpoint:** POST /authors

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "J.K. Rowling"}'
```

**Response:**
```json
{
  "id": 1,
  "name": "J.K. Rowling"
}
```

### List All Authors
**Endpoint:** GET /authors

```bash
curl http://localhost:3000/authors
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "J.K. Rowling"
  },
  {
    "id": 2,
    "name": "George Orwell"
  }
]
```

### Get Author By ID
**Endpoint:** GET /authors/:id

```bash
curl http://localhost:3000/authors/1
```

**Response:**
```json
{
  "id": 1,
  "name": "J.K. Rowling"
}
```

### Update Author
**Endpoint:** PUT /authors/:id

```bash
curl -X PUT http://localhost:3000/authors/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Joanne Rowling"}'
```

**Response:**
```json
{
  "id": 1,
  "name": "Joanne Rowling"
}
```

### Delete Author
**Endpoint:** DELETE /authors/:id

```bash
curl -X DELETE http://localhost:3000/authors/1
```

**Response:**
```
204 No Content
```

### List Books By an Author
**Endpoint:** GET /authors/:id/books

```bash
curl http://localhost:3000/authors/1/books
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Harry Potter and the Philosopher's Stone",
    "authorId": 1,
    "year": 1997
  }
]
```

### Create New Book
**Endpoint:** POST /books

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Harry Potter and the Philosopher'\''s Stone", "authorId": 1, "year": 1997}'
```

**Response:**
```json
{
  "id": 1,
  "title": "Harry Potter and the Philosopher's Stone",
  "authorId": 1,
  "year": 1997
}
```

### List All Books
**Endpoint:** GET /books

```bash
curl http://localhost:3000/books
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Harry Potter and the Philosopher's Stone",
    "authorId": 1,
    "year": 1997
  },
  {
    "id": 2,
    "title": "1984",
    "authorId": 2,
    "year": 1949
  }
]
```

### Get Book By ID
**Endpoint:** GET /books/:id

```bash
curl http://localhost:3000/books/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Harry Potter and the Philosopher's Stone",
  "authorId": 1,
  "year": 1997
}
```

### Update Book
**Endpoint:** PUT /books/:id

```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Harry Potter and the Sorcerer'\''s Stone", "authorId": 1, "year": 1997}'
```

**Response:**
```json
{
  "id": 1,
  "title": "Harry Potter and the Sorcerer's Stone",
  "authorId": 1,
  "year": 1997
}
```

### Delete Book
**Endpoint:** DELETE /books/:id

```bash
curl -X DELETE http://localhost:3000/books/1
```

**Response:**
```
204 No Content
```

## Middleware

### Logger
Logs method and URL for every request:
```
GET /authors
POST /books
PUT /authors/1
DELETE /books/1
```

### Input Validation Middleware
Validates request payloads for POST and PUT operations:

**Author validation:**
- Name is required and must be a non-empty string

**Book validation:**
- Title is required and must be a non-empty string
- AuthorId is required and must be a number
- Year is required and must be a valid year
- Author must exist in the system

## Error Handling

### Invalid Data
**400 Bad Request**

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Response:**
```json
{
  "error": "Name is required"
}
```

### Not Found
**404 Not Found**

```bash
curl http://localhost:3000/authors/999
```

**Response:**
```json
{
  "error": "Author not found"
}
```

### Conflict (Duplicate Book)
**409 Conflict**

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Harry Potter and the Philosopher'\''s Stone", "authorId": 1, "year": 1997}'
```

**Response:**
```json
{
  "error": "Book with this title by this author already exists"
}
```

## Error Response Format

All error responses follow this format:
```json
{
  "error": "Error message"
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
