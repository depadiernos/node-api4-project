// code away!
const server = require("./server")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });

server.use("/api/users", userRouter)
server.use("/api/users/:id/posts/:postId", postRouter)

server.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).json({message: "an internal error occurred."})
})