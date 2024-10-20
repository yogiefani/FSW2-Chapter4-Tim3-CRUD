const { role } = require("../models"); // Make sure you import the 'role' model

const getAllRoles = async (req, res) => {
    try {
        const roles = await role.findAll(); // Fetch all roles
        res.json(roles); // Send roles as a JSON response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Send an error response
    }
};

module.exports = {
    getAllRoles,
};
