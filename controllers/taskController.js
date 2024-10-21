const { tasks } = require("../models");
const createdEntity = "Task";


async function updateTaskPage(req, res) {
  try {
    const taskData = await tasks.findByPk(req.params.id);

    res.render("tasks/update", {
      title: `Update Task ${taskData.name}`,
      taskData,
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

async function createTaskPage(req, res) {
  try {
    res.render("tasks/create", {
      title: "Create Task",
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

async function createTask(req, res) {
  try {
    const { name, description, userId, projectId } = req.body;

    if (!name || !description || !userId || !projectId) {
      return res.render("error", {
        status: false,
        title: "Error",
        error: "name, description, userId, or projectId are required!",
      });
    }

    const newTask = await tasks.create({
      name,
      description,
      userId,
      projectId,
    });

    return res.redirect(`/dashboard?created=success&createdEntity=${createdEntity}`);
  } catch (err) {
    return res.render("error", {
      status: false,
      title: "Error",
      message: "An error occurred while fetching tasks",
      error: err.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const getId = req.params.id;
    const { name, description, userId, projectId } = req.body;

    const taskToUpdate = await tasks.findByPk(getId);

    if (!taskToUpdate) {
      return res.status(404).json({
        status: false,
        message: "Task not found!",
      });
    }

    const updateTask = await taskToUpdate.update({
      name,
      description,
      userId,
      projectId,
    });

    res.redirect(`/dashboard?updated=success&createdEntity=${updateTask.name}`);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching tasks",
      error: err.message,
    });
  }
}

module.exports = { createTask, updateTask, createTaskPage, updateTaskPage };
