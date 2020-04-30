const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const router = require("./src/router");
const app = express();
const Message = require("./db/model/message");
const expressWs = require("express-ws")(app);
const port = process.env.PORT || 7000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.ws("/", function (ws, req) {
  Message.findAll().then((data) => ws.send(JSON.stringify(data)));

  ws.on("message", function (msg) {
    const body = JSON.parse(msg);
    const newMessage = { ...body };

    Message.create(newMessage).then((mes) => {
      expressWs
        .getWss()
        .clients.forEach((el) => el.send(JSON.stringify([mes])));
    });
  });
});

app.listen(port, () => console.log(`Server start, port ${port}`));
