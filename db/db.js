const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "blog_app"
});

mySqlConnection.connect(err => {
    if (err) console.log(err);
    console.log("Database Connected!");
});

module.exports = mySqlConnection;