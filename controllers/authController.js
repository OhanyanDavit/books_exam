const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

async function register(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.getByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user' 
  });

  const token = generateToken(newUser);
  res.status(201).json({ token });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.getByEmail(email);
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = generateToken(user);
  res.json({ token });
}

module.exports = { register, login };
