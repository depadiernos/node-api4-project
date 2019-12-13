const userDb = require("../users/userDb");
const postDb = require("../posts/postDb");

const logger = () => (req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.method} - ${req.url}`);
  next();
};

const validateUserId = () => async (req, res, next) => {
  const userId = await userDb.getById(req.params.id);
  if (!userId) {
    return res.status(400).json({ message: "invalid user id" });
  }
  req.user = userId;
  next();
};

const validateUser = () => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }
  next();
};

const validatePost = () => (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" });
  }
  if (!req.body.text) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();
};

const validatePostId = () => async (req, res, next) => {
  const postId = await postDb.getById(req.params.postId);
  const userId = await userDb.getById(req.params.id);
  if (!userId) {
    return res.status(400).json({ message: "invalid user id" });
  } else if (!postId) {
    return res.status(400).json({ message: "invalid post id" });
  }
  req.post = postId;
  next();
};

module.exports = {
  logger,
  validatePost,
  validatePostId,
  validateUser,
  validateUserId
};
