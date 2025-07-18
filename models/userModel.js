const pool = require('../config/db');

const User = {
  async getAll() {
    const res = await pool.query('SELECT id, name, email, role FROM users ORDER BY id');
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },

  async getByEmail(email) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  },

  async create({ name, email, role = 'user' }) {
    const res = await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, role]
    );
    return res.rows[0];
  },

  async update(id, { name, email, role }) {
    const res = await pool.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, name, email, role',
      [name, email, role, id]
    );
    return res.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  },
};

module.exports = User;
