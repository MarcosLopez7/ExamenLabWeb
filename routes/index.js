var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inteligent Videogame Reviews', veces: req.session.views['/'].toString() });
  console.log(req.cookies);
  console.log('================');
  console.log(req.session);
});

router.post('/login', function(req, res, next){
  console.log(req.body);
});

module.exports = router;
