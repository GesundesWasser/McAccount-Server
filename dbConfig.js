// dbConfig.js
const mysql = require('mysql');

// MySQL connection configuration
const connection = mysql.createConnection({
    host: '45.88.109.142',
    port: 45,
    user: 'user',
    password: 'milka4444!',
    database: 'dev'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
