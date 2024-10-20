const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require('../middlewares/uploadMiddleware');


router.get("/create", userController.createUserPage);
// router.get('/update/:id', taskController.updateTaskPage);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", upload.single("photoProfile"), userController.createUser);
router.patch("/:id/edit", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
