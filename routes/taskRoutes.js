const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

router.get('/home', auth, taskController.homePage);

// api
router.post('/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getSingleTask );
router.put('/tasks/:id', taskController.updateTask );
router.put('/tasks/archive/:id', taskController.archiveTask );

module.exports = router;