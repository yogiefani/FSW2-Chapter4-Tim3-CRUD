const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.get("/create", roleController.roleCreateForm);
router.get("/update/:id", roleController.roleUpdateForm);

router.post("/", roleController.createRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
module.exports = router;
