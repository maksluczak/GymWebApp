require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const routes = require('./src/routes');
const auth = require('./src/routes/auth.js');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);
app.use('/auth', auth);

module.exports = app;