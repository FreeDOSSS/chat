const Sequelize = require("sequelize"); //Подключаем библиотеку

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/test_db.db",
  logging: false,
  // logging: console.log,
});

module.exports = sequelize;
