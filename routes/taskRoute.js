const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// router.get('/', taskController.getAllTask);
router.get('/update/:id', taskController.updateTaskPage);
router.get('/create', taskController.createTaskPage);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);

module.exports = router;