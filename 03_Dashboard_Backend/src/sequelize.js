const { Sequelize } = require('sequelize');
var path = require("path");
require('dotenv').config();

console.log(process.env.DB_NAME);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.AWS_LINK,
    dialect: 'mysql'
  });
  
  try {
   sequelize.authenticate();
    console.log('avyantra_dev is connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = {sequelize : sequelize} ;