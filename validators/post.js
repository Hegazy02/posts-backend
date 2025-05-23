const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const commentSchema = Joi.object({
  text: Joi.string().required(),
});
module.exports = { postSchema, commentSchema };
