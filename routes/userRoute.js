const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id/edit', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// router.get('/update/:id', taskController.updateTaskPage);
router.get('/create', userController.createUserPage);

module.exports = router;