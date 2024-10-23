const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.get("/create", roleController.roleCreateForm);
router.get("/update/:id", roleController.roleUpdateForm);

router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);

router.post("/", roleController.createRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
module.exports = router;
