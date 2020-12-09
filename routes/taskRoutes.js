const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middlewares/auth');

// pages
router.get('/home', auth, taskController.homePage);
router.get('/home/tasks', taskController.tasksPage);
router.get('/home/create-task', taskController.createTaskPage);
router.get('/home/edit-task/:id', taskController.editTaskPage);

// api
router.post('/home/create-task', taskController.createTask);
router.delete('/home/delete-task/:id', taskController.deleteTask);
router.put('/home/update-task/:id', taskController.updateTask);
// router.put('/home/update-task/put/:id', taskController.updateTask);

module.exports = router;