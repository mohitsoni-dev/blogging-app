const express = require('express');
const mySqlConnection = require("../db/db");
const router = express.Router();

router.get('/', (req, res) => res.status(200).render('home'));

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
            // Select all blogs and print them:
            mySqlConnection.query("SELECT * FROM blogs", function (err, blogs, fields) {
                if (err) console.log(err);
                res.status(200).render('dashboard', {blogs: blogs});
            });
    }
    else
        res.status(401).send('login for this');
});

module.exports = router;