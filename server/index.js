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

const client = {};

app.ws("/", function (ws, req) {
  const { name } = req.query;

  const id = Math.random();
  ws.id = id;
  client[id] = name;

  Message.findAll().then((data) =>
    ws.send(JSON.stringify({ mes: data, client }))
  );

  expressWs
    .getWss()
    .clients.forEach((el) => el.send(JSON.stringify({ client })));

  ws.on("message", function (msg) {
    const body = JSON.parse(msg);
    const newMessage = { ...body };

    console.log("client", client);

    Message.create(newMessage).then((mes) => {
      expressWs
        .getWss()
        .clients.forEach((el) =>
          el.send(JSON.stringify({ mes: [mes], client }))
        );
    });
  });

  ws.on("close", () => {
    delete client[ws.id];
    // expressWs.getWss().clients.forEach((el) => console.log("el", el));
    expressWs
      .getWss()
      .clients.forEach((el) => el.send(JSON.stringify({ client })));
  });
});

app.listen(port, () => console.log(`Server start, port ${port}`));
