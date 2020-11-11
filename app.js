const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const path = require('path');

// Models
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const DB_URI = process.env.MONGO_ATLAST_URI;
mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error));

// Middleware
app.use(express.json());


// Set static pages
const publicPathDirectory = path.join(__dirname, './public');
app.use(express.static(publicPathDirectory));

// Template Engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');



// Routes
app.use(userRoutes);
app.use(taskRoutes);
app.use(cookieParser());




// // example cookie parser
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('set-Cookie', 'newUser=true');
//     res.cookie('newUser', false);
//     // secure: true  for https
//     res.cookie('isArchive', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//     res.send('You got cookies')
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     res.json(cookies);
// })