const Users = require("./../db/model/user");
const jwt = require("jsonwebtoken");

const { secretKey } = require("./../constants");

// const secretKey = "asdasdsd";

function auth(req, res) {
  const { name } = req.query;
  Users.findOne({ where: { name } })
    .then((userDb) => {
      const token = "Bearer " + jwt.sign({ name }, secretKey);

      if (userDb) {
        Users.update({ token }, { where: { name } })
          .then(() => {
            return res.status(200).json({ token });
          })
          .catch((err) => console.log("err", err));
      } else {
        const newUser = {
          name,
          token,
        };

        Users.create(newUser)
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((errSave) => console.log(err));
      }
    })
    .catch((err) => console.log("err", err));
}

module.exports = auth;
