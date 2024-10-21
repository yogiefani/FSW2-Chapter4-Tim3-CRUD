const { user } = require("../models");
const imagekit = require("../lib/imagekit");
const createdEntity = "User";

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      order: [["id", "ASC"]]
    });
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
    res.render("users/create", {
      title: "Create User",
      layout: "layouts/template",
    });
  } catch (err) {
    res.render("error", {
      title: "Error",
      error: err.message,
      layout: "layouts/template",
    });
  }
}

async function updateUserPage(req, res) {
  try {
    const userData = await user.findByPk(req.params.id);

    res.render("users/update", {
      title: `Update User ${userData.name}`,
      userData,
      layout: "layouts/template",
    });
  } catch (err) {
    res.render("error", {
      title: "Error",
      error: err.message,
      layout: "layouts/template",
    });
  }
}

const createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, roleId } = req.body;
    const file = req.file;

    // Validate required fields
    // if (!name || !email || !phoneNumber || !file) {
    //     return res.status(400).json({
    //         status: false,
    //         message: "name, email, phoneNumber, and photoProfile are required!",
    //     });
    // }

    const split = file.originalname.split(".");

    const ext = split[split.length - 1];
    const filename = split[0];

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: `Profile-${filename}-${Date.now()}.${ext}`,
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

    const newUser = await user.create({
      name,
      email,
      phoneNumber,
      photoProfile: uploadedImage.url,
      roleId,
    });

    return res.redirect(
      `/dashboard?created=success&createdEntity=${createdEntity}`
    );
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
    const { name, email, phoneNumber, roleId } = req.body;
    const file = req.file;

    const userToUpdate = await user.findByPk(getId);

    if (!userToUpdate) {
      return res.status(404).json({
        status: false,
        message: "user not found!",
      });
    }

    let photoProfileUrl = userToUpdate.photoProfile;

    if (file) {
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];
      const filename = split[0];

      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `Profile-${filename}-${Date.now()}.${ext}`,
      });

      photoProfileUrl = uploadedImage.url;
    }

    const updatedUser = await userToUpdate.update({
      name,
      email,
      phoneNumber,
      photoProfile: photoProfileUrl,
      roleId,
    });

    res.redirect(
      `/dashboard?updated=success&createdEntity=${updatedUser.name}`
    );
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while updating the user",
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

    res.redirect(`/dashboard?deleted=success&createdEntity=${createdEntity}`);
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
  updateUserPage,
};
