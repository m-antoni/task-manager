const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getSingleTask );
router.put('/tasks/:id', taskController.updateTask );
router.put('/tasks/archive/:id', taskController.archiveTask );

module.exports = router;