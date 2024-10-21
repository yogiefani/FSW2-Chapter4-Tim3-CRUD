const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTask);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTaskById);

module.exports = router;