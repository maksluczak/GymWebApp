require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const routes = require('./src/routes')

connectDB();

const app = express();
app.use(express.json());

app.use('/', routes);

module.exports = app;