const express  = require("express");
const router = express.Router;

const userRouter = require("../routes/user")
// const postRouter = require("../routes/post")
// const commenttRouter = require("../routes/comment")

app.use("/", userRouter)
// app.use("/post", postRouter)
// app.use("/comment", commenttRouter)

module.exports = router;