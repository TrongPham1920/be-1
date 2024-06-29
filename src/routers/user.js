const express = require("express");
const router = express.Router();
const UseController = require("../controllers/UserController");

router.post("/create-user", UseController.createUser);
router.get("/find-user/:id", UseController.readUser);
router.post("/update-user", UseController.updateUser);
router.delete("/delete-user/:id", UseController.deleteUser);

module.exports = router;
