const Task = require('../models/Task');
const { createTaskSchema } = require('../helpers/validationSchema');
const moment = require('moment');
const { auth } = require('../middlewares/auth');

// Create Task
const createTask = async (req, res) => {

    const error_msg = [];
    const params = req.body;

    const { error } = createTaskSchema.validate(params, { abortEarly: false });
    
    if(error){
        error.details.map(err => error_msg.push(err.message));
        return res.render('create-task', { errors: error_msg, title: params.title, description: params.description });    
    }

    try {
        const task = new Task(params);
        await task.save();
        res.redirect('/home/tasks');
    } catch (e) {
        res.status(400).render('create-task', { error_msg: 'Something went wrong.' });
    }
}


// PAGES HERE HBS FILES
const homePage = async (req, res) => {
    console.log(res.user)
    res.render('home', { title: 'Home page' });
}


const createTaskPage = async (req, res) => {
   res.render('create-task'); 
}

const editTaskPage = async (req, res) => {

    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        res.render('edit-task', { task });
        
    } catch (e) {
        console.log(e)
    }
}

const deleteTask = async (req, res) => {
   
    const _id = req.params.id;
    // console.log(req.header('jwt'))

    try {
        
        await Task.findByIdAndRemove(_id);
        res.json({ redirect: '/home/tasks' });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }

}

const updateTask = async (req, res) => {
    
    // console.log(_id, req.body)
    const _id = req.params.id;
    const { title, description } = req.body;
    try {

        await Task.findByIdAndUpdate( _id, { title, description }, { new: true });
  
        res.send({ redirect: '/home/tasks' });

    } catch (e) {
        console.log(e);
    }
}



const tasksPage = async (req, res) => {
    
    const tasks = await Task.find().sort({ created_at: 'desc' });

    try {

        // const all_tasks = tasks.map(task => { created_at:  moment.format(task.created_at) } );  
        // console.log(all_tasks)
        res.render('tasks', { tasks });
    } catch (e) {
        console.log(e);
        res.render('tasks', { error: 'Something went wrong.' })
    }

}


module.exports = { createTask, homePage, createTaskPage, tasksPage, editTaskPage, deleteTask, updateTask };