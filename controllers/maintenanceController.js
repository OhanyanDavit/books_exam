const Rental = require('../models/rentalModel');
const Overdue = require('../models/overdueModel');

exports.checkOverdue = async (req, res) => {
  try {
    const overdueRentals = await Rental.getOverdueRentals();

    let newOverdues = 0;

    for (const rental of overdueRentals) {
      const alreadyMarked = await Overdue.exists(rental.id);
      if (!alreadyMarked) {
        await Overdue.create(rental.id);
        newOverdues++;
      }
    }

    res.json({
      message: 'Overdue check complete',
      totalOverdueRentals: overdueRentals.length,
      newlyMarked: newOverdues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
