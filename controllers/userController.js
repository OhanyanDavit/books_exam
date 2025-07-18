const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  const users = await User.getAll();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== Number(id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const user = await User.getById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { name, email, role } = req.body;
  if (req.user.role !== 'admin' && role && role !== 'user') {
    return res.status(403).json({ message: 'Cannot assign role' });
  }

  const newUser = await User.create({ name, email, role: role || 'user' });
  res.status(201).json(newUser);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== Number(id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const updatedUser = await User.update(id, req.body);
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await User.delete(req.params.id);
  res.status(204).end();
};
