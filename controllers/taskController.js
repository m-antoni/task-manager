const Task = require('../models/Task');

// Create Task
const createTask = async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send();
    }
}

// Get Tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (e) {
        res.status(400).send();
    }
}

// Get Single Task
const getSingleTask = async (req, res) => {
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
}


// Update Task
const updateTask = async (req, res) => {

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
}

// Archive Task
const archiveTask = async (req, res) => {
    
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
}


const homePage = async (req, res) => {

    const data = {
        title: 'Home page'
    }

    res.render('home', data)
}


module.exports = { createTask, getTasks, getSingleTask, updateTask, archiveTask, homePage };