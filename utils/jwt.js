const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  const payload = {
    id: user.id,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = { generateToken };
