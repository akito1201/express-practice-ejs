const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_practice_development'
});

module.exports = con