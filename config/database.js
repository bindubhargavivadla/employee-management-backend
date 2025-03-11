const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql',
  logging: true 
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL successfully!'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
