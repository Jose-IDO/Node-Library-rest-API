import request from 'supertest';
import { app } from './app';

describe('Library API', () => {
  describe('GET /authors', () => {
    it('returns list of authors', async () => {
      const res = await request(app).get('/authors');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
    });
  });

  describe('GET /authors/:id', () => {
    it('returns author when id exists', async () => {
      const res = await request(app).get('/authors/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
    });

    it('returns 404 when author not found', async () => {
      const res = await request(app).get('/authors/99999');
      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });

    it('returns 400 for invalid id', async () => {
      const res = await request(app).get('/authors/not-a-number');
      expect(res.status).toBe(400);
    });
  });

  describe('POST /authors', () => {
    it('creates author and returns 201', async () => {
      const res = await request(app)
        .post('/authors')
        .send({ name: 'Test Author' })
        .set('Content-Type', 'application/json');
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test Author');
    });

    it('returns 400 when name is missing', async () => {
      const res = await request(app)
        .post('/authors')
        .send({})
        .set('Content-Type', 'application/json');
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/name/i);
    });
  });

  describe('PUT /authors/:id', () => {
    it('updates author and returns 200', async () => {
      const create = await request(app)
        .post('/authors')
        .send({ name: 'To Update' })
        .set('Content-Type', 'application/json');
      const id = create.body.id;

      const res = await request(app)
        .put(`/authors/${id}`)
        .send({ name: 'Updated Name' })
        .set('Content-Type', 'application/json');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Name');
      expect(res.body.id).toBe(id);
    });

    it('returns 404 when author not found', async () => {
      const res = await request(app)
        .put('/authors/99999')
        .send({ name: 'No One' })
        .set('Content-Type', 'application/json');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /books', () => {
    it('returns list of books', async () => {
      const res = await request(app).get('/books');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('authorId');
      expect(res.body[0]).toHaveProperty('year');
    });
  });

  describe('PUT /books/:id', () => {
    it('returns 409 when update would create duplicate title+author', async () => {
      const list = await request(app).get('/books');
      const firstBook = list.body[0];
      const anotherBook = list.body.find((b: { id: number }) => b.id !== firstBook.id);
      if (!anotherBook) return;

      const res = await request(app)
        .put(`/books/${anotherBook.id}`)
        .send({
          title: firstBook.title,
          authorId: firstBook.authorId,
          year: anotherBook.year,
        })
        .set('Content-Type', 'application/json');
      expect(res.status).toBe(409);
      expect(res.body.error).toMatch(/already exists/i);
    });
  });
});
