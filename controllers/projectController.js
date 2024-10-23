const { project } = require("../models");

const getAllProjects = async (req, res) => {
    try {
        const projects = await project.findAll();
        res.render("projects/index", {
            title: "Dashboard Admin",
            projects,
        });
    } catch (err) {
        res.render("error", {
            error: err.message,
        });
    }
};

async function getProjectById(req, res) {
    const id = req.params.id;
    try {
        const Project = await project.findByPk(id);
        const startAtDate = new Date(Project.startAt);
        const endAtDate = new Date(Project.endAt);
        const options = { 
            weekday: 'long', 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        const formattedStartAt = startAtDate.toLocaleDateString('en-GB', options).replace(',', '');
        const formattedEndAt = endAtDate.toLocaleDateString('en-GB', options).replace(',', '');
        res.render("projects/detail", {
            title: `Project Profile ${Project.name}`,
            Project,
            formattedStartAt,
            formattedEndAt,
            layout: "layouts/template",
        });
    } catch (err) {
        res.render("error", {
            title: "Error",
            error: "Cannot find project data",
            layout: "layouts/template",
        });
    }
}

const createProject = async (req, res) => {
    try{
        const { name, description, startAt, endAt } = req.body;

        if(!name || !description || !startAt || !endAt){
            return res.status(404).json({
                status: false,
                "message": "name, description, startAt, or endAt are required!"
            });
        }

        const newProject = await project.create({
            name,
            description,
            startAt,
            endAt
        });

        return res.status(201).json({
            status: true,
            message: "Create New Project Successfully!",
            data: newProject
        });

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
        const getId = req.params.id;
        const {name, description, startAt, endAt} = req.body;

        const projectToUpdate = await project.findByPk(getId);

        if (!projectToUpdate) {
            return res.status(404).json({
                status: false,
                message: "project not found!",
            });
        }

        const updateProject = await projectToUpdate.update({
            name,
            description,
            startAt,
            endAt
        });

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
                message: "Can't find specific id project",
                isSuccess: false,
                data: null,
            });
        }

        await project.destroy();

        res.redirect("/dashboard?deleted=success");
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to delete project data",
            isSuccess: false,
            data: null,
            error: error.message,
        });
    }
}

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };