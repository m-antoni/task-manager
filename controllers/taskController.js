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
        return res.status(404).json({ errors: error_msg });    
    }

    // Check duplicate task
    const duplicate = await Task.findOne({ user_id: req.authID, title: params.title });
    if(duplicate){
        error_msg.push(`"${duplicate.title}" is already on the task list`);
        return res.status(404).json({ errors: error_msg });    
    }
    
    try {

        const data = {
            user_id: req.authID,
            title: params.title,
            description: params.description
        }

        const task = new Task(data);
        await task.save();
        
        res.status(201).json({ redirect: '/home/tasks' });
    } catch (e) {
        console.log(e)
    }
}

// Update Task
const updateTask = async (req, res) => {

    console.log(req.body)

    const _id = req.params.id;
    const error_msg = [];
    const params = req.body;

    const { error } = createTaskSchema.validate(params, { abortEarly: false });
    
    if(error){
        error.details.map(err => error_msg.push(err.message));
        return res.status(404).json({ errors: error_msg });    
    }

    try {

        await Task.findByIdAndUpdate( _id, params, { new: true });
        res.status(200).json({ redirect: '/home/tasks' });

    } catch (e) {
        console.log(e);
    }
}



/* PAGES HERE HBS FILES */

const tasksPage = async (req, res) => {
    
    try {
        const _tasks = await Task.find({ user_id: req.authID }).sort({ created_at: 'desc' });

        const tasks = _tasks.map(task => {
            const newTask = {};
            newTask['_id'] = task._id;
            newTask['completed'] = task.completed;
            newTask['title'] = task.title;
            newTask['description'] = task.description;
            newTask['created_at'] = moment(task.created_at).format(`lll`);

            return newTask;
        })

        res.render('tasks', { tasks });

    } catch (e) {
        console.log(e);
    }

}

const homePage = async (req, res) => {
    // console.log(res.user)
    res.render('home', { title: 'Home page' });
}

const aboutPage = async (req, res) => {
    // console.log(res.user)
    res.render('about', { title: 'About page' });
}



const createTaskPage = async (req, res) => {
   res.render('create-task'); 
}

const editTaskPage = async (req, res) => {
    const _id = req.params.id;

    try {
        const single_task = await Task.findById(_id);

        const task = { ...single_task };
        
        task['_id'] = single_task._id;
        task['completed'] = single_task.completed;
        task['title'] = single_task.title;
        task['description'] = single_task.description;
        task['created_at'] = moment(task.created_at).format(`lll`);

        res.render('edit-task', { task });
    } catch (e) {
        console.log(e)
    }
}

const deleteTask = async (req, res) => {
   
    const _id = req.params.id;
    try {
        
        await Task.findByIdAndRemove(_id);
        res.json({ redirect: '/home/tasks' });

    } catch (e) {
        console.log(e);
        res.json({ error: e })
    }
}


module.exports = { createTask, homePage, createTaskPage, tasksPage, editTaskPage, deleteTask, updateTask, aboutPage };