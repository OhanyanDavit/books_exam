const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

module.exports = { pool };
