var mysql = require('mysql');
var connect = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'matcha',
	database: 'matcha_db'
});
module.exports = connect;