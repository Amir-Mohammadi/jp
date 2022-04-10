const Sequelize = require("sequelize");
const config = require('./config');
const mysql = require("mysql2");

// create db if it doesn't already exist
const { host, user, password, database } = config.database;
const connection = mysql.createConnection({ host, user, password });
connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

// connect to db
const sequelize = new Sequelize(database, user, password, { dialect: "mysql" });
connection.end();
module.exports = sequelize;
