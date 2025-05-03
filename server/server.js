require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const cityRoutes = require('./src/routes/cityRoutes');
const countryRoutes = require('./src/routes/countryRoutes');

connectDB();

const PORT = process.env.PORT || 8080;

const server = express();

server.use('/city', cityRoutes);
server.use('/country', countryRoutes);

server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
});