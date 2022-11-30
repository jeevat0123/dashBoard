var mysql = require('mysql2');
const logger = require('../controllers/logger');

// -----DB-Connection
var connection = mysql.createConnection({
    // host: "192.168.0.125",   // Live DB
    host: "192.168.0.72",       // Dev DB
    user: "root",
    password: "abcd1234",
    database: "Finance_Dashboard"
});
// -----DB-Connection

connection.connect(function(err) {
    if (err) {
        logger.error(`DataBase Connection : ${err}`)
        throw err;
    }
});

module.exports = connection;
