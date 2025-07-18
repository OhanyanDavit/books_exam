const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.getById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author } = req.body;
  const newBook = await Book.create({ title, author });
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const updated = await Book.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Book not found' });
  res.json(updated);
};

exports.deleteBook = async (req, res) => {
  await Book.delete(req.params.id);
  res.status(204).end();
};
