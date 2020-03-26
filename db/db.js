const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12329497",
    password: "ZhwjIGSauF",
    database: "sql12329497",
    multipleStatements: true
});

mySqlConnection.connect(err => {
    if (err) console.log(err);
    else console.log("Database Connected!");
});

module.exports = mySqlConnection;