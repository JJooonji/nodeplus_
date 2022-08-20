const experss = require("express");
const router = experss.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

//회원가입
router.post("/signup", async (req, res) => {
  try {
    const { nickname, password, confirmPassword } = req.body;

    const regNickname = /^.{2,10}$/;
    const regPassword = /^.{4,20}$/;

    if (!regNickname.check(nickname)) {
      return res.status(400).send({ error: "닉네임 양식이 맞지 않습니다." });
    }
    if (!regPassword.check(password)) {
      return res.status(400).send({ error: "비밀번호 양식이 맞지 않습니다." });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ error: "비밀번호가 일치하지 않습니다." });
    }
    const existUsers = await User.findOne({
      where: {
        [Op.or]: { nickname },
      },
    });

    if (existUsers) {
      return res.status(400).send({
        error: "중복된 닉네임이 있습니다.",
      });
    }
    await User.create({ nickname, password });
    res.status(201).send({ message: "회원 가입에 성공하였습니다." });
  } catch (error) {
    res
      .status(401)
      .send({ errorMessage: "오류 발생! 관리자에게 문의해주세요." });
  }
});

//로그인
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({where: { nickname, password }})

  if(!user) {
    res.status(400).send({ error: "아이디 또는 비밀번호가 잘못되었습니다."})
  }

  const token = jwt.sign({ userId: user.userId}, "plus_secret_key")
  console.log(token, "로그인 완료")
});

module.exports = router;
