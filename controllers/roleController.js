const { role } = require("../models");
const createdEntity = "role";

const getAllRoles = async (req, res) => {
  try {
    const rolesData = await role.findAll({
      order: [["id", "ASC"]],
    });
    res.render("roles/index", {
      title: "Dashboard Admin",
      rolesData,
    });
  } catch (err) {
    res.render("error", {
      error: err.message,
    });
  }
};

async function getRoleById(req, res) {
  const id = req.params.id;
  try {
    const rolesData = await role.findByPk(id);
    res.render("roles/detail", {
      title: `role Profile ${rolesData.name}`,
      rolesData,
      layout: "layouts/template",
    });
  } catch (err) {
    res.render("error", {
      title: "Error",
      error: "Cannot find role data",
      layout: "layouts/template",
    });
  }
}

const roleCreateForm = async (req, res) => {
  try {
    res.status(200).render("roles/create", {
      title: "Create New Role",
      layout: "layouts/template",
    });
  } catch (err) {
    console.error("Error showing create form:", err);
    res.status(500).render("error", {
      title: "Error",
      error: "Failed to load create form",
      layout: "layouts/template",
    });
  }
};

const roleUpdateForm = async (req, res) => {
  try {
    const roleData = await role.findByPk(req.params.id);

    if (!roleData) {
      return res.status(404).render("error", {
        title: "Error",
        error: "Role not found",
        layout: "layouts/template",
      });
    }

    res.status(200).render("roles/update", {
      title: "Edit Role",
      roleData,
      layout: "layouts/template",
    });
  } catch (err) {
    console.error("Error showing edit form:", err);
    res.status(500).render("error", {
      title: "Error",
      error: "Failed to load update form",
      layout: "layouts/template",
    });
  }
};

const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).render("roles/create", {
        title: "Create New Role",
        error: "Name and description are required!",
        formData: req.body,
        layout: "layouts/template",
      });
    }

    await role.create({
      name,
      description,
    });

    res.status(201).redirect("/roles");
  } catch (err) {
    console.error("Error creating role:", err);
    res.status(500).render("roles/create", {
      title: "Create New Role",
      error: "Failed to create role",
      formData: req.body,
      layout: "layouts/template",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { name, description } = req.body;

    const roleData = await role.findByPk(roleId);

    if (!roleData) {
      return res.status(404).render("error", {
        title: "Error",
        error: "Role not found",
        layout: "layouts/template",
      });
    }

    await roleData.update({
      name,
      description,
    });

    res.status(200).redirect("/roles");
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).render("error", {
      title: "Error",
      error: "Failed to update role",
      layout: "layouts/template",
    });
  }
};

async function deleteRole(req, res) {
  const id = req.params.id;
  try {
    const rolesData = await role.findByPk(id);
    if (!rolesData) {
      return res.status(404).json({
        status: "Failed",
        message: "Can't find specific id role",
        isSuccess: false,
        data: null,
      });
    }

    await rolesData.destroy();

    res.redirect(`/roles?deleted=success&createdEntity=${createdEntity}`);
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

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  roleCreateForm,
  roleUpdateForm,
  deleteRole,
};
