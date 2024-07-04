const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", PostController.getAllPosts);

/**
 * @swagger
 * /post/create-post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *                 example: "Sample Post Title"
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 example: "This is the content of the post."
 *               userId:
 *                 type: string
 *                 description: ID of the user who created the post
 *                 example: "60c72b2f9b1e8a001c8e4cdd"
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create-post", PostController.createPost);

/**
 * @swagger
 * /post/find-post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: The post ID
 *           example: "60c72b2f9b1e8a001c8e4cdd"
 *         required: true
 *     responses:
 *       200:
 *         description: A post object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: string
 *                   description: ID of the user who created the post
 *       404:
 *         description: Post not found
 */
router.get("/find-post/:id", PostController.readPost);

/**
 * @swagger
 * /post/update-post:
 *   post:
 *     summary: Update a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the post to update
 *                 example: "60c72b2f9b1e8a001c8e4cdd"
 *               title:
 *                 type: string
 *                 description: New title of the post
 *                 example: "Updated Post Title"
 *               content:
 *                 type: string
 *                 description: New content of the post
 *                 example: "Updated content of the post."
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid input or post not found
 */
router.post("/update-post", PostController.updatePost);

/**
 * @swagger
 * /post/delete-post/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: The post ID
 *           example: "60c72b2f9b1e8a001c8e4cdd"
 *         required: true
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/delete-post/:id", PostController.deletePost);

module.exports = router;
