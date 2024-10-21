const express = require('express');
const router = express.Router();
const { Roles } = require('../models'); // Tambahkan ini untuk import model Roles
const roleController = require('../controllers/roleController');

// Route untuk list roles (yang ini boleh dihapus cuma buat cek halaman index)
router.get('/', async (req, res) => {
    try {
        const roles = await Roles.findAll();
        // Ubah dari json() ke render()
        res.render('roles/index', { 
            roles,
            title: 'Roles Management'
        });
    } catch (err) {
        console.error('Error fetching roles:', err);
        // Render error page atau tampilkan pesan error
        res.render('roles/index', {
            roles: [],
            title: 'Roles Management',
            error: 'Failed to fetch roles'
        });
    }
});

// Route untuk menampilkan form
router.get('/create', roleController.roleCreateForm);
router.get('/update/:id', roleController.roleUpdateForm);

// Route untuk aksi CRUD
router.post('/', roleController.createRole);
router.patch('/:id', roleController.updateRole);

module.exports = router;