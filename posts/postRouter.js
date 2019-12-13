const express = require("express");
const db = require("./postDb");
const {
  validatePost,
  validatePostId,
  validateUserId
} = require("../middlewares");

const router = express.Router({ mergeParams: true });

router.get("/", validatePostId(), (req, res, next) => {
  try {
    res.status(200).json(req.post);
  } catch (err) {
    next(err);
  }
});

router.delete("/", validatePostId(), async (req, res, next) => {
  try {
    const deletedPost = await db.remove(req.params.postId);
    if (deletedPost) res.status(200).json(req.post);
  } catch (err) {
    next(err);
  }
});

router.put("/", validatePost(), validatePostId(), async (req, res,next) => {
  try {
    const post = { text: req.body.text, user_id: req.params.id };
    const updatedPost = await db.update(req.params.postId, post);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
