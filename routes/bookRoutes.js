const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');

router.get('/', auth, bookController.getAllBooks);
router.get('/:id', auth, bookController.getBookById);

router.post('/', auth, requireRole('admin'), bookController.createBook);
router.put('/:id', auth, requireRole('admin'), bookController.updateBook);
router.delete('/:id', auth, requireRole('admin'), bookController.deleteBook);

module.exports = router;
