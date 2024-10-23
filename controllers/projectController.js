const { project } = require("../models");

const createdEntity = "Project";

const getAllProjects = async (req, res) => {
    try {
        const projects = await project.findAll();
        // res.status(200).json({
        //     status: "Succeed",
        //     message: "Get all projects successfully",
        //     isSuccess: true,
        //     data: projects,
        // });
        res.render("projects/create", {
            title: "Dashboard Admin Project",
            projects,
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

async function getProjectById(req, res) {
    const id = req.params.id;
    try {
        const project = await project.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find spesific id project",
                isSuccess: false,
                data: null,
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully obtained project data",
            isSuccess: true,
            data: { project },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get project data",
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }
}

const createProject = async (req, res) => {
    try{
        const { name, description } = req.body

        if(!name || !description){
            return res.status(404).json({
                status: false,
                "message": "name, or description are required!"
            })
        }

        const newProject = await project.create({
            name,
            description
        })
    return res.redirect(`/projects?created=success&createdEntity=${createdEntity}`);
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching projects",
            error: err.message,
        });
    }
}

const updateProject = async (req, res) => {
    try{
        const getId = req.params.id
        const {name, description} = req.body

        const projectToUpdate = await project.findByPk(getId);

        if (!projectToUpdate) {
            return res.status(404).json({
                status: false,
                message: "project not found!",
            });
        }

        const updateProject = await projectToUpdate.update({
            name,
            description
        })

        res.status(200).json({
            status: true,
            message: "Update Project Successfully!",
            data: updateProject
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching projects",
            error: err.message,
        });
    }
}

async function deleteProject(req, res) {
    const id = req.params.id;
    try {
        const project = await project.findByPk(id);
        if (!project) {
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

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };