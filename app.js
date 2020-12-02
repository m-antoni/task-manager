const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require("body-parser");

// Models
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// Database connection
const DB_URI = process.env.MONGO_ATLAST_URI;
mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error));

// Set static pages
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Template Engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(cookieParser());


// Routes
app.use(authRoutes);
app.use(taskRoutes);