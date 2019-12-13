const express = require("express");
const cors = require("cors");
const server = express();

const { logger } = require("./middlewares");

server.get("/", (req, res) => {
  res.send(`<h2>Hey ${process.env.COHORT}, let's write some middleware!</h2>`);
});

//custom middleware

server.use(cors());
server.use(express.json());
server.use(logger());

module.exports = server;
