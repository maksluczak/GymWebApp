require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 8080;

const server = express();

server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
});