const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.MONGO_ATLAST_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

