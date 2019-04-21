const mysql = require('mysql');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack)
        return;
    }
    console.log('LMS-API is up!')
})

module.exports = db;