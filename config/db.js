
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost", 
    user: "root",
    password: "",
    database: "aswe"
});

db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
    }
});

module.exports = db;
