const Sequelize = require("sequelize");
const database = require("../utils/dataBase");

const Logs = database.define("logs", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    refrences: {
      model: "Users",
      key: "userId",
    },
    validate: {
      notEmpty: true,
      isNumeric: true,
      isInt: true,
    },
  },
  timeStamp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isInside: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    primaryKey: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = {
  Logs: Logs,
};
