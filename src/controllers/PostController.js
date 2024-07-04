const express = require("express");
const Post = require("../models/postModel");
const user = require("../models/userModel");

// Create a new Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });

    await newPost.save();

    if (newPost.userId) {
      const updatedUser = await user.findByIdAndUpdate(
        newPost.userId,
        {
          $push: {
            posts: newPost._id,
          },
        },
        { new: true }
      );
      console.log(updatedUser);
    } else {
      res.status(300).send("Không tìm thấy id user");
    }

    res.send({
      code: 0,
      data: newPost,
      mess: `Tạo Post ${newPost?.id} thành công`,
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Read a Post by ID
exports.readPost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).send({ code: 1, mess: "Thiếu thông tin id Post" });
    }

    const post = await Post.findById(id)
      .populate({
        path: "userId",
        select:
          "-password -status -createdAt -updatedAt -posts -__v -avatar -_id",
      })
      .exec();

    if (!post) {
      return res
        .status(404)
        .send({ code: 1, mess: `Không tìm thấy Post ${id}` });
    }

    res.send({
      code: 0,
      data: post,
      mess: `Thông tin Post ${post?.title}`,
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Update a Post by ID
exports.updatePost = async (req, res) => {
  try {
    const { id, title, content } = req.body;

    if (!id) {
      return res.status(404).send({ code: 1, mess: "Thiếu thông tin id Post" });
    }

    const updatedFields = {};
    if (content) updatedFields.content = content;
    if (title) updatedFields.title = title;

    const post = await Post.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res
        .status(404)
        .send({ code: 1, mess: `Không tìm thấy PostId ${id}` });
    }

    res.send({
      code: 0,
      data: post,
      mess: `Cập nhật thông tin Post ${post?.title}`,
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Delete a Post by ID
exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ code: 1, mess: "Thiếu thông tin id Post" });
    }

    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      const updatedUser = await user.findByIdAndUpdate(
        post.userId,
        {
          $pull: { posts: id },
        },
        { new: true }
      );
    } else {
      return res
        .status(404)
        .send({ code: 1, mess: `Không tìm thấy PostId &{id}` });
    }

    res.send({
      code: 0,
      data: post,
      mess: `Xóa Post ${id} thành công`,
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "userId",
      select:
        "-password -status -createdAt -updatedAt -posts -__v -avatar -_id",
    });

    res.send({
      code: 0,
      data: posts,
      mess: "Lấy danh sách bài viết thành công",
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};
