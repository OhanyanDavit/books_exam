const pool = require('../config/db');

const Overdue = {
  async create(rental_id) {
    const res = await pool.query(
      `INSERT INTO overdue_records (rental_id) VALUES ($1) RETURNING *`,
      [rental_id]
    );
    return res.rows[0];
  },

  async exists(rental_id) {
    const res = await pool.query(
      `SELECT * FROM overdue_records WHERE rental_id = $1`,
      [rental_id]
    );
    return res.rows.length > 0;
  }
};

module.exports = Overdue;
