const Sequelize = require("sequelize");

const sequelize = require("../utils/dataBase");

const Users = sequelize.define("users", {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allownull: false,
    validate: {
      isAlpha: true,
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allownull: false,
    validate: {
      isAlpha: true,
      notEmpty: true,
    },
  },
  personalId: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
});

module.exports = {
  Users: Users,
};
