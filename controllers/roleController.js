const {Roles} = require('../models')

const roleCreateForm = async (req, res) => {
    try {
        res.status(200).render('roles/create', {
            title: 'Create New Role'
        });
    } catch (err) {
        console.error('Error showing create form:', err);
        res.status(500).redirect('/roles');
    }
}

const roleUpdateForm = async (req, res) => {
    try {
        const role = await Roles.findByPk(req.params.id);
        if (!role) {
            return res.status(404).redirect('/roles');
        }
        res.status(200).render('roles/update', {
            title: 'Edit Role',
            role
        });
    } catch (err) {
        console.error('Error showing edit form:', err);
        res.status(500).redirect('/roles');
    }
}

const createRole = async (req, res) => {
    try {
        const { name, description } = req.body

        if(!name || !description) {
            return res.status(400).render('roles/create', {
                title: 'Create New Role',
                error: 'Name and description are required!',
                formData: req.body
            });
        }

        await Roles.create({
            name,
            description
        });

        res.status(201).redirect('/roles');
    } catch (err) {
        console.error('Error creating role:', err);
        res.status(500).render('roles/create', {
            title: 'Create New Role',
            error: 'Failed to create role',
            formData: req.body
        });
    }
}

const updateRole = async (req, res) => {
    try {
        const getId = req.params.id
        const {name, description} = req.body

        const roleToUpdate = await Roles.findByPk(getId);

        if (!roleToUpdate) {
            return res.status(404).redirect('/roles');
        }

        await roleToUpdate.update({
            name,
            description
        });

        res.status(200).redirect('/roles');
    } catch (err) {
        console.error('Error updating role:', err);
        res.status(500).redirect(`/roles/update/${req.params.id}`);
    }
}

module.exports = { 
    createRole, 
    updateRole,
    roleCreateForm,
    roleUpdateForm
};