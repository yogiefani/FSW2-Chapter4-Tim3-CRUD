const {Roles} = require('../models')

const createRole = async (req, res) => {
    try{
        const { name, description } = req.body

        if(!name || !description ){
            return res.status(404).json({
                status: false,
                "message": "name and description are required!"
            })
        }

        const newRole = await Roles.create({
            name,
            description
        })

        return res.status(201).json({
            status: true,
            message: "Create New Roles Successfully!",
            data: newRole
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching roles",
            error: err.message,
        });
    }
}

const updateRole = async (req, res) => {
    try{
        const getId = req.params.id
        const {name, description} = req.body

        const roleToUpdate = await role.findByPk(getId);

        if (!roleToUpdate) {
            return res.status(404).json({
                status: false,
                message: "role not found!",
            });
        }

        const updateRole = await roleToUpdate.update({
            name,
            description
        })

        res.status(200).json({
            status: true,
            message: "Update Role Successfully!",
            data: updateRole
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching roles",
            error: err.message,
        });
    }
}

module.exports = { createRole, updateRole};