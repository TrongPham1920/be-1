const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send({
      code: 0,
      data: users,
      mess: "Lấy danh sách người dùng thành công",
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Create a new User
exports.createUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      address,
      avatar,
      fullName,
      phone,
      dateOfBirth,
    } = req.body;

    let user = await User.findOne({
      $or: [{ userName }, { email }, { phone }],
    });

    if (user) {
      return res
        .status(400)
        .send({ code: 1, mess: "Username hoặc email hoặc phone Đã tồn tại" });
    }

    const newUser = new User({
      userName,
      email,
      password,
      address,
      avatar,
      fullName,
      phone,
      dateOfBirth,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    res
      .status(201)
      .send({ code: 0, data: newUser, mess: "Tạo user thành công" });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Read a User by ID
exports.readUser = async (req, res) => {
  try {
    const Id = req.params.id;

    if (!Id) {
      return res
        .status(400)
        .send({ code: 1, mess: "Thiếu thông tin id người dùng" });
    }

    const user = await User.findById(Id).populate("posts").exec();

    if (!user) {
      return res
        .status(404)
        .send({ code: 1, mess: `Không tìm thấy UserID ${Id}` });
    }

    res.send({
      code: 0,
      data: user,
      mess: `Thông tin tài khoản ${user?.userName}`,
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Update a User by ID
exports.updateUser = async (req, res) => {
  try {
    const {
      id,
      email,
      password,
      address,
      avatar,
      fullName,
      phone,
      dateOfBirth,
    } = req.body;

    if (!id) {
      return res
        .status(400)
        .send({ code: 1, mess: "Thiếu thông tin id người dùng" });
    }

    const updatedFields = {};
    if (phone) updatedFields.phone = phone;
    if (fullName) updatedFields.fullName = fullName;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;
    if (address) updatedFields.address = address;
    if (avatar) updatedFields.avatar = avatar;
    if (dateOfBirth) updatedFields.dateOfBirth = dateOfBirth;

    const user = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .send({ code: 1, mess: `Không tìm thấy UserID ${id}` });
    }

    res.send({
      code: 0,
      data: user,
      mess: "Cập nhật thông tin người dùng thành công",
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};

// Delete a User by ID
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .send({ code: 1, mess: "Thiếu thông tin id người dùng" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .send({ code: 1, mess: `Không tìm thấy UserID ${id}` });
    }

    res.send({
      code: 0,
      data: user,
      mess: `Xóa user ${id} thành công`,
    });
  } catch (error) {
    res.status(400).send({ code: 1, mess: error?.message });
  }
};
