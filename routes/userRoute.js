const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require('../middlewares/uploadMiddleware');


router.get("/create", userController.createUserPage);
router.get('/update/:id', userController.updateUserPage);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", upload.single("photoProfile"), userController.createUser);
router.patch("/:id/edit",upload.single("photoProfile"), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
