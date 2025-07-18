const pool = require('../config/db');

const Book = {
  async getAll() {
    const res = await pool.query('SELECT * FROM books ORDER BY id');
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return res.rows[0];
  },

  async create({ title, author }) {
    const res = await pool.query(
      'INSERT INTO books (title, author, isAvailable) VALUES ($1, $2, true) RETURNING *',
      [title, author]
    );
    return res.rows[0];
  },

  async update(id, { title, author }) {
    const res = await pool.query(
      'UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *',
      [title, author, id]
    );
    return res.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
  },

  async setAvailability(id, isAvailable) {
    await pool.query('UPDATE books SET isAvailable = $1 WHERE id = $2', [isAvailable, id]);
  },
};

module.exports = Book;
