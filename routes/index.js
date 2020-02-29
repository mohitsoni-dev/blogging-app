const express = require('express');
const mySqlConnection = require("../db/db");
const router = express.Router();

let blogQuotes = [
    ['“Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.”', 'Brian Clark'],
    ['“Blogging is a conversation, not a code.”', 'Mike Butcher'],
    ['“Blogging is like work, but without coworkers thwarting you at every turn.”', 'Scott Adams'] ,
    ['“A blog is only as interesting as the interest shown in others.”', 'Lee Odden'],
    ['“Blogging is just writing — writing using a particularly efficient type of publishing technology.”', 'Simon Dumenco'],
    ['“Blogging is a communications mechanism handed to us by the long tail of the Internet.”', 'Tom Foremski'],
    ['“Blogs are whatever we make them. Defining ‘Blog’ is a fool’s errand.”', 'Michael Conniff'],
    ['“The casual conversational tone of a blog is what makes it particularly dangerous”', ' Daniel B. Beaulieu'],
    ['“Not only are bloggers suckers for the remarkable, so are the people who read blogs.”', 'Seth Godin'],
    ['“Blogging is hard because of the grind required to stay interesting and relevant.”', 'Sufia Tippu'],
];


router.get('/', (req, res) => res.status(200).render('home', {blogQuotes: blogQuotes}));

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