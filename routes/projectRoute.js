const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.get('/update/:id', projectController.updateProjectPage);
router.put('/:id', projectController.updateProject);
// router.get('/:id', projectController.getUserById);
// router.patch('/:id', projectController.updateProject);
// router.delete('/:id', projectController.deleteProject);

module.exports = router;