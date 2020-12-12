const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middlewares/auth');

// pages
router.get('/home', auth, taskController.homePage);
router.get('/home/tasks', auth, taskController.tasksPage);
router.get('/home/create-task', auth, taskController.createTaskPage);
router.get('/home/edit-task/:id', auth, taskController.editTaskPage);

// api
router.post('/home/create-task', auth, taskController.createTask);
router.put('/home/update-task/:id', auth, taskController.updateTask);
router.delete('/home/delete-task/:id', auth, taskController.deleteTask);

module.exports = router;