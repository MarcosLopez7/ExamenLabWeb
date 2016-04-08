/**
 * Created by marcoslopez7 on 8/04/16.
 */
var express = require('express');
var Usuario = require('../models/usuario');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Inteligent Videogame Reviews' , veces: req.session.views['/login'].toString()});
    console.log(req.cookies);
    console.log('================');
    console.log(req.session);
});

module.exports = router;
