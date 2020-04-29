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
  Message.findAll().then((data) => ws.send(JSON.stringify(data)));
  // Message.findAll().then((data) => console.log("data", JSON.stringify(data)));

  ws.on("message", function (msg) {
    const body = JSON.parse(msg);
    const newMessage = { ...body };

    Message.create(newMessage).then((mes) => {
      ws.send(JSON.stringify([mes]));
    });
  });

  // ws.
});

app.listen(port, () => console.log(`Server start, port ${port}`));
