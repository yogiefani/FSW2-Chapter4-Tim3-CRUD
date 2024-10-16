const { user } = require("../models");

const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.status(200).json({
            status: "Succeed",
            message: "Get all users successfully",
            isSuccess: true,
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Internal server error",
            isSuccess: false,
            error: err.message,
        });
    }
};

async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await user.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find spesific id user",
                isSuccess: false,
                data: null,
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully obtained user data",
            isSuccess: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get user data",
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }
}

const createUser = async (req, res) => {
    try{
        const { name, email, phone, photoProfile } = req.body

        if(!name || !email || !phone || !photoProfile){
            return res.status(404).json({
                status: false,
                "message": "name, email, phone, or photoProfile are required!"
            })
        }

        const newUser = await user.create({
            name,
            email,
            phone,
            photoProfile
        })

        return res.status(201).json({
            status: true,
            message: "Create New User Successfully!",
            data: newUser
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
}

const updateUser = async (req, res) => {
    try{
        const getId = req.params.id
        const {name, email, phone, photoProfile} = req.body

        const userToUpdate = await user.findByPk(getId);

        if (!userToUpdate) {
            return res.status(404).json({
                status: false,
                message: "user not found!",
            });
        }

        const updateUser = await userToUpdate.update({
            name,
            email,
            phone,
            photoProfile
        })

        res.status(200).json({
            status: true,
            message: "Update User Successfully!",
            data: updateUser
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
}

async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const user = await user.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find spesific id user",
                isSuccess: false,
                data: null,
            });
        }

        await user.destroy();

        res.status(200).json({
            status: "Success",
            message: "Successfully delete user data",
            isSuccess: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to delete user data",
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };