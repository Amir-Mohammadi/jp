const Sequelize = require("sequelize");

const sequelize = require("../utils/dataBase");

const Cards = sequelize.define("cards", {
  cardId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
      isNumeric: true
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    allownull: false,
    primaryKey: false,
    references: {
      model: "Users",
      key: "userId",
    },
    validate: {
      notEmpty: true,
      isNumeric: true
    },
  }
});

module.exports = {
  Cards: Cards
};

