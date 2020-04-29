const router = require("express").Router();

const auth = require("./auth");
const isAuth = require("./isAuth");

router.use("/isauth", isAuth);
router.get("/auth", auth);

module.exports = router;
