const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization, "인증확인");
  cosnt[(authType, authToken)] = (authorization || "").split(" ");

  if (authType !== "Bearer") {
    res.status(401).json({
      error: "로그인 후 사용하세요.",
    });
    return;
  }
  try {
    jwt.verify(authToken, "plus_secret_key");

    async (error, decoded) => {
      if (error) {
        res.status(401).send({
          error: "이용에 문제가 있습니다.",
        });
        return;
      }
      let user = await User.findOne({ where: { userId: decoded.userId } });
      res.locals.user = user;
      next();
    };
  } catch (error) {
    res.status(401).send({
      error: "로그인 후 사용하세요.",
    });
    return;
  }
};
