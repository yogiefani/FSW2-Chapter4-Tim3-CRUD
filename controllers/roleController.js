const { role } = require("../models");

const getAllRoles = async (req, res) => {
  try {
    let roleData = await role.findAll();
    res.status(200).json({
      status: "Succeed",
      message: "Get all roles successfully",
      isSuccess: true,
      data: roleData,
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

async function getRoleById(req, res) {
  const id = req.params.id;
  try {
    let roleData = await role.findByPk(id);
    if (!roleData) {
      return res.status(404).json({
        status: "Failed",
        message: "Can't find spesific id role",
        isSuccess: false,
        data: null,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully obtained role data",
      isSuccess: true,
      data: { roleData },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to get role data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        status: false,
        message: "name, description are required!",
      });
    }

    const newRole = await role.create({
      name,
      description,
    });

    return res.status(201).json({
      status: true,
      message: "Create New Role Successfully!",
      data: newRole,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching roles",
      error: err.message,
    });
  }
};

async function deleteRole(req, res) {
  const id = req.params.id;
  try {
    let roleData = await role.findByPk(id);
    if (!roleData) {
      return res.status(404).json({
        status: "Failed",
        message: "Can't find spesific id role",
        isSuccess: false,
        data: null,
      });
    }

    await roleData.destroy();

    res.status(200).json({
      status: "Success",
      message: "Successfully delete role data",
      isSuccess: true,
      data: { roleData },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to delete role data",
      isSuccess: false,
      data: null,
      error: error.message,
    });
  }
}

module.exports = { getAllRoles, getRoleById, createRole, deleteRole };
