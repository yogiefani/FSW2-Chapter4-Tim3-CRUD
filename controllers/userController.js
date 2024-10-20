const { user } = require("../models");

const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.render("users/index", {
            title: "Dashboard Admin",
            users,
        });
    } catch (err) {
        res.render("error", {
            error: err.message,
        });
    }
};

async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const User = await user.findByPk(id);
        res.render("users/detail", {
            title: `User Profile ${User.name}`,
            User,
            layout: "layouts/template",
        });
    } catch (err) {
        res.render("error", {
            title: "Error",
            error: "Cannot find user data",
            layout: "layouts/template",
        });
    }
}

async function createUserPage(req, res) {
    try {
        console.log("here")
      res.render("users/create", {
        title: "Create User",
        // layout: "layouts/template",
      });
    } catch (err) {
      res.render("error", {
        title: "Error",
        error: err.message,
        // layout: "layouts/template",
      });
    }
  }

  const createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const file = req.file; // Assuming you're using middleware like multer to handle file uploads

        // Validate required fields
        if (!name || !email || !phoneNumber || !file) {
            return res.status(400).json({
                status: false,
                message: "name, email, phoneNumber, and photoProfile are required!",
            });
        }

        // Process the uploaded file
        const split = file.originalname.split(".");
        const ext = split[split.length - 1];
        const filename = split[0];

        // Upload image to server (using ImageKit or your chosen service)
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `Profile-${filename}-${Date.now()}.${ext}`
        });

        console.log(uploadedImage);

        if (!uploadedImage) {
            return res.status(400).json({
                status: false,
                message: "Failed to add user data because the file is not defined",
                isSuccess: false,
                data: null,
            });
        }

        // Create a new user with the uploaded image URL
        const newUser = await user.create({
            name,
            email,
            phoneNumber,
            photoProfile: uploadedImage.url, // Assuming `url` contains the image URL from ImageKit
        });

        return res.status(201).json({
            status: true,
            message: "Create New User Successfully!",
            data: newUser,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while creating the user",
            error: err.message,
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const getId = req.params.id;
        const { name, email, phoneNumber, photoProfile } = req.body;

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
            phoneNumber,
            photoProfile,
        });

        res.status(200).json({
            status: true,
            message: "Update User Successfully!",
            data: updateUser,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
};

async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const User = await user.findByPk(id);
        if (!User) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find specific id user",
                isSuccess: false,
                data: null,
            });
        }

        await User.destroy();

        res.redirect("/dashboard?deleted=success");
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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createUserPage,
};
