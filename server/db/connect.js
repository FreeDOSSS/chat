const Sequelize = require("sequelize"); //Подключаем библиотеку

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/test_db.db",
  logging: false,
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

module.exports = sequelize;
