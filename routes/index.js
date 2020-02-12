const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).render('home'));

router.get('/dashboard', (req, res) => {
    if (req.session.user)
      res.status(200).render('dashboard');
    else
      res.status(401).send('login for this');
});

module.exports = router;