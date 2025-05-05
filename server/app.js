require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db');

const cityRoutes = require('./src/routes/cityRoutes');
const countryRoutes = require('./src/routes/countryRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/city', cityRoutes);
app.use('/country', countryRoutes);

module.exports = app;