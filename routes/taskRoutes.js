const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middlewares/auth');

// pages
router.get('/home', taskController.homePage);
router.get('/home/tasks', taskController.tasksPage);
router.get('/home/create-task', taskController.createTaskPage);
router.get('/home/edit-task/:id', taskController.editTaskPage);

// api
router.post('/home/create-task', taskController.createTask);
router.put('/home/update-task/:id', taskController.updateTask);
router.delete('/home/delete-task/:id', taskController.deleteTask);


module.exports = router;