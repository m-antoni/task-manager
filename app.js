const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Models
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database connection
const DB_URI = process.env.MONGO_ATLAST_URI;
mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error));

// Routes
app.use(userRoutes);
app.use(taskRoutes);
