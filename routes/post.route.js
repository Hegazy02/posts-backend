const router = require("express").Router();
const postController = require("../controllers/post.controller");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.get("/user/:id", postController.getMyPosts);
router.post("/", postController.createPost);
router.post("/:id/comments", postController.createComment);
router.post("/:id/like", postController.addLike);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
