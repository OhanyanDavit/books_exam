const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const auth = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');

router.post('/check-overdue', auth, requireRole('admin'), maintenanceController.checkOverdue);

module.exports = router;
