const pool = require('../config/db');

const Rental = {
  async create({ user_id, book_id, due_date }) {
    const res = await pool.query(
      `INSERT INTO rentals (user_id, book_id, due_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, book_id, due_date]
    );
    return res.rows[0];
  },

  async getById(id) {
    const res = await pool.query('SELECT * FROM rentals WHERE id = $1', [id]);
    return res.rows[0];
  },

  async markReturned(id) {
    const res = await pool.query(
      `UPDATE rentals SET returned_at = NOW() WHERE id = $1 RETURNING *`,
      [id]
    );
    return res.rows[0];
  },

  async getActiveRentalByBook(book_id) {
    const res = await pool.query(
      `SELECT * FROM rentals WHERE book_id = $1 AND returned_at IS NULL`,
      [book_id]
    );
    return res.rows[0];
  },

  async getOverdueRentals() {
    const res = await pool.query(
      `SELECT * FROM rentals WHERE returned_at IS NULL AND due_date < NOW()`
    );
    return res.rows;
  },
};

module.exports = Rental;
