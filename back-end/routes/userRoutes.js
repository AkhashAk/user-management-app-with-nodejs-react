const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:emailID", userController.getUser);

router.post("/", userController.createNewUser);

router.put("/:emailID", userController.updateUser);

router.delete("/:emailID", userController.deleteUser);

module.exports = router;