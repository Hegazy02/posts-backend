const mongoose = require("mongoose");
const { commentSchema } = require("./comment.js");
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
postSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.likesCount = ret.likes?.length || 0;
    delete ret.likes;
    return ret;
  },
});

module.exports = mongoose.model("Post", postSchema);
