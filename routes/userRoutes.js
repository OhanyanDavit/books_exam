const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/create-admin', authMiddleware, roleMiddleware('admin'), userController.createAdmin);

module.exports = router;
