const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Task = require('../models/Task');
const User = require('../models/User');

const app = express();
const PORT = process.env.PORT || 3000;

const dbURI = process.env.MONGO_ATLAST_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));


app.use(express.json());


// post user
app.post('/users', (req, res) => {
    
    const user = new User(req.body);

    user.save().then(data => {
        res.status(201).send(data);
    })
    .catch(e => res.status(400).send(e))
})

// get users
app.get('/users', (req, res) => {

    const users = User.find();

    users.then(data => res.status(200).send(data))
        .catch(e => res.status(400).send({ message: "No User Found"}));
})


// get single user
app.get('/users/:id', (req, res) => {

    const user = User.findById(req.params.id)

    user.then(user => res.status(200).send(user))
        .catch(e => res.status(400).send({ mesage: 'No User Found!' }))
});


// post task
app.post('/tasks', (req, res) => {
    
    console.log(req.body)
    const tasks = new Task(req.body);

    tasks.save().then(tasks => res.status(201).send(tasks))
        .catch(e => res.status(400).send({ message: 'Someting went wrong...'}));
})


// get tasks
app.get('/tasks', (req, res) => {
    
    const tasks = Task.find();
    
    tasks.then(tasks => res.status(200).send(tasks))
         .catch(e => res.status(400).send({ message: 'No Tasks Found!' }))
});


// get single task
app.get('/tasks/:id', (req, res) => {
    
    const task = Task.findById(req.params.id);
    
    task.then(task => res.status(200).send(task))
        .catch(e => res.status(400).send({ message: 'No Task Found!' }))
})





