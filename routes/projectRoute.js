const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllUsers);
router.get('/:id', projectController.getUserById);
router.post('/', projectController.createUser);
router.patch('/:id', projectController.updateUser);
router.delete('/:id', projectController.deleteUser);

module.exports = router;