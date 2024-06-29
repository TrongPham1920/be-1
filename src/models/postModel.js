const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    userId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("post", postSchema);
