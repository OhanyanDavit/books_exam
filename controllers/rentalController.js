const Rental = require('../models/rentalModel');
const Book = require('../models/bookModel');

exports.rentBook = async (req, res) => {
  const { book_id, due_date } = req.body;
  const user_id = req.user.id;

  const book = await Book.getById(book_id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.isavailable) return res.status(400).json({ message: 'Book is not available' });

  const activeRental = await Rental.getActiveRentalByBook(book_id);
  if (activeRental) return res.status(400).json({ message: 'Book already rented' });

  const rental = await Rental.create({ user_id, book_id, due_date });

  await Book.setAvailability(book_id, false);

  res.status(201).json(rental);
};

exports.returnBook = async (req, res) => {
  const rentalId = req.params.id;
  const user_id = req.user.id;

  const rental = await Rental.getById(rentalId);
  if (!rental) return res.status(404).json({ message: 'Rental not found' });

  if (req.user.role !== 'admin' && rental.user_id !== user_id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (rental.returned_at) {
    return res.status(400).json({ message: 'Book already returned' });
  }

  await Rental.markReturned(rentalId);

  await Book.setAvailability(rental.book_id, true);

  res.json({ message: 'Book returned successfully' });
};
