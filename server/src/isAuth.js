const jwt = require("jsonwebtoken");
const Users = require("./../db/model/user");
const { secretKey } = require("./../constants");

function isAuth(req, res, next) {
  const token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secretKey, (err, decode) => {
    if (err) return res.status(401).json({ message: "Not authorized" });
    res.status(200).json({ valid: true });
    // const { name } = decode;

    // res.user.name = name;

    next();
  });
}

module.exports = isAuth;
