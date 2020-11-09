const express = require('express');
require('./db/mongoose');
const userRoutes = require('../routes/user.routes');
const taskRoutes = require('../routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`) );