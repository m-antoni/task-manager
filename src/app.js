const express = require('express');
require('./db/mongoose');

// Models
const Task = require('../models/Task');
const User = require('../models/User');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


// post user
app.post('/users', async (req, res) => {
    
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send();
    }
})

// get users
app.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(400).send();
    }
})

// get single user
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user){
            return res.status(400).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
})

// update user
app.put('/users/:id', async (req, res) => {

    const _id = req.params.id;
    const body = req.body;
    // check params
    const updateParams = Object.keys(req.body);
    const allowedParams = ['name', 'phone', 'email', 'password'];
    const isValidParams = updateParams.every(update => allowedParams.includes(update));
    
    if(!isValidParams){
        return res.status(400).send({ message: 'Updates are not allowed.' });
    }

    try {
        const user = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true });

        if(!user){
            return res.status(400).send();
        }

        res.send(user)

    } catch (e) {
        res.status(400).send();
    }
});


//  archive user
app.put('/users/archive/:id', async (req, res) => {
    
    const _id = req.params.id;
    const archive = { archive: true };
    try {
        const user = await User.findByIdAndUpdate(_id, archive, { new: true, runValidators: true });

        if(!user){
            return res.status(400).send({ error: 'Something went wrong' })
        }

        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
});


// post task
app.post('/tasks', async (req, res) => {
    
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send();
    }
})

// get tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (e) {
        res.status(400).send();
    }
});

// get single task
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if(!task){
            return res.status(400).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
})

// update user
app.put('/tasks/:id', async (req, res) => {

    const _id = req.params.id;
    const body = req.body;
    // check params
    const updateParams = Object.keys(req.body);
    const allowedParams = ['title', 'description'];
    const isValidParams = updateParams.every(update => allowedParams.includes(update));
    
    if(!isValidParams){
        return res.status(400).send({ message: 'Updates are not allowed.' });
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, body, { new: true, runValidators: true });

        if(!task){
            return res.status(400).send();
        }

        res.send(task)

    } catch (e) {
        res.status(400).send();
    }
});


//  archive task
app.put('/tasks/archive/:id', async (req, res) => {
    
    const _id = req.params.id;
    const archive = { archive: true };
    try {
        const task = await Task.findByIdAndUpdate(_id, archive, { new: true, runValidators: true });

        if(!task){
            return res.status(400).send({ error: 'Something went wrong' })
        }

        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});