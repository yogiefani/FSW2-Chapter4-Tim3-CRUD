const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTaskPage);
router.get('/data', taskController.getAllTask);
router.get('/create', taskController.createTaskPage);
router.post('/', taskController.createTask);
router.get('/search', taskController.searchTaskByIdPage);
router.get('/detail/:id', taskController.getTaskByIdPage);
router.get('/:id', taskController.getTaskById);
router.get('/update/:id', taskController.updateTaskPage);
router.put('/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTaskById);

module.exports = router;