const express = require("express");
const router = express.Router();

const user = require("../routers/user");
const post = require("../routers/post");

router.use("/user", user);
router.use("/post", post);

module.exports = router;
