const { Task } = require("../models");

// console.log(Task); // Tambahkan ini untuk memastikan Task terdefinisi

async function getAllTask(req, res) {
    try {
        const tasks = await Task.findAll();
        res.status(200).json ({
            status: "Success",
            message: "Success get all tasks data",
            isSuccess: true,
            data: {
                tasks
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

async function getTaskById(req, res) {
    const id = req.params.id;
    try {
        const task = await Task.findByPk(id);

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

async function deleteTaskById(req, res) {
    const id = req.params.id;
    try {
        const task = await Task.findByPk(id);

        if (Task) {
            await Task.destroy({
                where: {
                    id: id,
                },
            });

            res.status(200).json({
                statusCode: "200",
                message: "Success get Task data",
                isSuccess: true,
                data: { task },
            });
        } else {
            res.status(404).json({
                statusCode: "404",
                message: "Task Not Found!",
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: "500",
            message: "Failed to get Task data",
            isSuccess: false,
            error: error.message,
        });
    }
}

module.exports = {
    getAllTask, 
    getTaskById,
    deleteTaskById,
};
