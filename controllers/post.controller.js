const Post = require("../models/post.js");
const AppError = require("../utils/appError.js");
const { postSchema, commentSchema } = require("../validators/post.js");

const getPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      title = "",
      content = "",
      sortBy = "lastUpdated",
      order = "desc",
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {
      title: { $regex: title, $options: "i" },
      content: { $regex: content, $options: "i" },
    };

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ [sortBy]: order === "asc" ? 1 : -1 }),
      Post.countDocuments(filter),
    ]);

    res.status(200).json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) throw new AppError("Post not found", 404);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    console.log("req.user", req.user);
    const posts = await Post.find({ author: req.user._id });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);

    const userId = req.user._id;

    const post = new Post({
      ...req.body,
      author: userId,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { error } = commentSchema.validate(req.body);
    if (error) throw AppError(error.details[0].message, 400);

    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) throw AppError("Post not found", 404);
    const comment = {
      text: req.body.text,
      author: req.user._id,
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) throw new AppError("Post not found", 404);

    const hasLiked = post.likes.includes(userId);
    post.likes = hasLiked
      ? post.likes.filter((uid) => uid.toString() !== userId)
      : [...post.likes, userId];

    await post.save();
    res.status(200).json({ likes: post.likes.length, liked: !hasLiked });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) throw AppError("Post not found", 404);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Post.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw AppError("Post not found", 404);
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  getMyPosts,
  createPost,
  createComment,
  addLike,
  updatePost,
  deletePost,
};
