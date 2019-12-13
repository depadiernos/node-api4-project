const express = require("express");
const db = require("./userDb");
const postDb = require("../posts/postDb");
const {
  validateUser,
  validateUserId,
  validatePost
} = require("../middlewares");

const router = express.Router();

router.post("/", validateUser(), async (req, res, next) => {
  try {
    const user = { name: req.body.name };
    const addedUser = await db.insert(user);
    res.status(201).json(addedUser);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/posts", validatePost(), async (req, res, next) => {
  try {
    const post = { text: req.body.text, user_id: req.params.id };
    const addedPost = await postDb.insert(post);
    res.status(201).json(addedPost);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId(), (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", validateUserId(), async (req, res, next) => {
  try {
    const posts = await db.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateUserId(), async (req, res, next) => {
  try {
    const deletedUser = await db.remove(req.params.id);
    if (deletedUser) res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUser(), validateUserId(), async (req, res, next) => {
  try {
    const user = { name: req.body.name };
    const updatedUser = await db.update(req.params.id, user);
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }});

module.exports = router;
