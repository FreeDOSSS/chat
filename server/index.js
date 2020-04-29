const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const router = require("./src/router");
const sequelize = require("./db/connect");
const app = express();
const expressWs = require("express-ws")(app);
const port = 7000;

const Message = require("./db/model/message");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.ws("/", function (ws, req) {
  ws.send("Connected");

  ws.on("message", function (msg) {
    console.log("msg", msg);
  });
});

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => console.log(`Server start, port ${port}`));
