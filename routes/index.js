const express  = require("express");
const router = express.Router;

const postRouter = require("../routes/post")

app.use("/post", postRouter)


module.exports = router;