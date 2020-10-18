const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const mongoDBAtlast = process.env.MONGO_ATLAST_URI;

mongoose.connect(mongoDBAtlast, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(PORT)
        console.log(`Server is running on ${PORT}`)
    })
    .catch(err => {
        console.log(err)
    });

