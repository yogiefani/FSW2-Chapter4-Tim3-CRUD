const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/', roleController.createRole);
router.patch('/:id', roleController.updateRole);

module.exports = router;