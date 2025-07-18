const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/rentals', rentalRoutes);
app.use('/maintenance', maintenanceRoutes);

module.exports = { app };
