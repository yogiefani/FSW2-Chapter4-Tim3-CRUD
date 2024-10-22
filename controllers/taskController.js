const { where } = require("sequelize");
const { tasks } = require("../models");
const createdEntity = "Task";

async function getAllTaskPage(req, res) {
  try {
    const allTasks = await tasks.findAll();
    res.render("tasks/index", {
        title: "Tasks",
        allTasks,
    });
  } catch (err) {
      res.render("error", {
          error: err.message,
      });
  }   
};

async function getAllTask(req, res) {
  try {
      const allTasks = await tasks.findAll();
      res.status(200).json ({
          status: "Success",
          message: "Success get all tasks data",
          isSuccess: true,
          data: {
              allTasks
          } 
      });
  } catch (error) {
      res.status(500).json({
          status: "Failed",
          message: "Failed get the task data",
          isSuccess: false,
          data: null,
          error: error.message
      });
  }    
};

async function getTaskByIdPage(req, res) {
  const id = req.params.id;
  
  try {
      const task = await tasks.findByPk(id);

      res.render("tasks/detail", {
        title: `Task Details - ${task.name}`,
        task,
        layout: "layouts/template",
      });

  } catch (error) {
    res.render("error", {
      title: "Error",
      error: err.message,
      layout: "layouts/template",
    });
  }
}

async function getTaskById(req, res) {
  const id = req.params.id;
  try {
      const task = await tasks.findByPk(id);

      if (!task) {
          return res.status(404).json ({
              status: "Failed",
              message: "Can't find specific Task ID",
              isSuccess: false,
              data: null,
          });
      }

      res.status(200).json({
          status: "Success",
          message: "Success get task data",
          isSuccess: true,
          data: {
              task
          }
      });
  } catch (error) {
      res.status(500).json ({
          status: "Failed",
          message: "Failed get task data",
          isSuccess: false,
          error: error.message
      })
  }
}

async function searchTaskByIdPage(req, res) {
  const id = parseInt(req.query.id, 10); // Ubah ke integer
  
  if (isNaN(id)) {
    // Jika bukan angka, tampilkan error
    return res.render("error", {
      title: "Error",
      error: "Invalid Task ID. Please enter a valid number.",
      layout: "layouts/template",
    });
  }

  try {
    const task = await tasks.findByPk(id);

    if (!task) {
      return res.render("error", {
        title: "Task Not Found",
        error: `No task found with ID: ${id}`,
        layout: "layouts/template",
      });
    }

    res.render("tasks/detail", {
      title: `Task Details - ${task.name}`,
      task,
      layout: "layouts/template",
    });
  } catch (error) {
    res.render("error", {
      title: "Error",
      error: error.message,
      layout: "layouts/template",
    });
  }
}

async function searchTaskById(req, res) {
  console.log("Query Parameters:", req.query); 

  const id = req.query.id;

  if (!id || isNaN(id)) {
      return res.status(400).json({
          status: "Failed",
          message: "Invalid Task ID. Please enter a valid numeric ID.",
          isSuccess: false,
          data: null,
      });
  }

  const taskId = parseInt(id);

  try {
      const task = await tasks.findByPk(taskId);

      if (!task) {
          return res.status(404).json({
              status: "Failed",
              message: `No task found with ID: ${taskId}`,
              isSuccess: false,
              data: null,
          });
      }

      res.status(200).json({
          status: "Success",
          message: "Task retrieved successfully",
          isSuccess: true,
          data: { task },
      });
  } catch (error) {
      console.error("Error in searchTaskById:", error.message);
      res.status(500).json({
          status: "Failed",
          message: "Failed to retrieve task",
          isSuccess: false,
          error: error.message,
      });
  }
}

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

    return res.redirect('/tasks');
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

async function deleteTaskById(req, res) {
  const id = req.params.id;
  try {
    const taskId = req.params.id;
    
    // Lakukan logika untuk menghapus task dari database
    await tasks.destroy({ where: { id: taskId } });

    req.flash('success', 'Task deleted successfully');
    res.redirect('/tasks'); // Atur ulang ke halaman tasks setelah penghapusan
  } catch (error) {
      console.error(error);
      req.flash('error', 'Failed to delete task');
      res.redirect('/tasks'); // Atur ulang ke halaman tasks jika terjadi kesalahan
  }
}

module.exports = { 
  getAllTaskPage,
  getAllTask,
  getTaskByIdPage,
  getTaskById,
  searchTaskByIdPage,
  searchTaskById,
  createTask,
  updateTask, 
  createTaskPage, 
  updateTaskPage,
  deleteTaskById 
};
