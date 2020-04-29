const sequelize = require("./../connect");
const Sequelize = require("sequelize");
const Message = sequelize.define(
  "message",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },

    message: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Message;
