const mysql = require('mysql');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (!err) {
    console.log('Connected');
  } else throw console.error('Error Connecting');
});

module.exports = connection;
