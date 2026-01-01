const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();
app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected");
} catch (error) {
    console.error(error.message);
    process.exit(1);
};

app.listen(8000, () => console.log("Server running on port 8000"));