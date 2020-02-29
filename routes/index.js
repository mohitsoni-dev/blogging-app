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
    } else {
        res.status(401).send('login for this');
    }
});

router.get('/blog/:id', function(req, res) {
    const searchSql = "SELECT * FROM blogs WHERE id = ?";
    mySqlConnection.query(searchSql, [req.params.id], (err, blog) => {
        if (err) {
            res.status(500).redirect('/dashboard');
        } else {
            if (req.session.user) {
                let user = req.session.user;
                res.render('showblog', {blog: blog, user: user}); 
            } else {
                res.send('Please login to see blogs!!');
            }
        }
    });
});

router.delete('/blogs/:id', function(req, res){
    if (req.session.user) {
        mySqlConnection.query('DELETE FROM blogs WHERE id = ?', [req.params.id], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/dashboard');
            }
        });        
    } else {
        res.render('/users/login');
    }
});

module.exports = router;