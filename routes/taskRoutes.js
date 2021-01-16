const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth, checkUser } = require('../middlewares/auth');


router.get('*', checkUser);

// pages
router.get('/', taskController.homePage);
router.get('/home/about', taskController.aboutPage);

router.get('/home/tasks', auth, taskController.tasksPage);
router.get('/home/create-task', auth, taskController.createTaskPage);
router.get('/home/edit-task/:id', auth, taskController.editTaskPage);

// api
router.get('/home/get-tasks', auth, taskController.getTasks);
router.post('/home/create-task', auth, taskController.createTask);
router.put('/home/update-task/:id', auth, taskController.updateTask);
router.delete('/home/delete-task/:id', auth, taskController.deleteTask);

module.exports = router;