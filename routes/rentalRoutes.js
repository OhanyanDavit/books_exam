const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, rentalController.rentBook);

router.put('/:id/return', auth, rentalController.returnBook);

module.exports = router;
