const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

router.post("/create-post", PostController.createPost);
router.get("/find-post/:id", PostController.readPost);
router.post("/update-post", PostController.updatePost);
router.delete("/delete-post/:id", PostController.deletePost);

module.exports = router;
