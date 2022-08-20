const express = require("experss");
const app = express();
const port = 5000;
const router = require("./routes")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);

const { sequelize } = require("./models");
sequelize
.sync({ force:false })
.then(() => {
    console.log("데이터베이스 연결 성공");
})
.catch((err) => {
    console.log(err)
});

app.listen(post, () => {
    console.log(port, "포트로 서버가 열렸습니다.")
})

module.exports = router;