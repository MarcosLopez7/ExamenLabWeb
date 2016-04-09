var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2664300191",
  database: "Labwebapps"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inteligent Videogame Reviews', veces: req.session.views['/'].toString() });
  console.log(req.cookies);
  console.log('================');
  console.log(req.session);
});

router.post('/login', function(req, res, next){

  var usu = {
    email: req.body.username,
    pass: req.body.pass
  };

  var usuario = null;

  con.query('SELECT * FROM Usuario WHERE email = ? AND pass = ?', [usu.email, usu.pass],function(err,rows){
    if(err) throw err;

    console.log('Data received from Db:\n');
    usuario = rows[0];

    if (usuario != null) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    };

  });

});

router.post('/registro', function(req, res, next){

  var dataUser = {
    id: 0,
    nombre: req.body.nombre,
    ap1: req.body.ap1,
    ap2: req.body.ap2,
    fechaNac: req.body.fecha,
    genero: req.body.gen,
    noCel: req.body.cel,
    noTel: req.body.tel,
    ext: req.body.ext,
    email: req.body.email,
    pass: req.body.pass
  };

  con.query('INSERT INTO Usuario SET ?', dataUser, function(err, res){
    if (err) throw err;

    console.log("insertado id: " + res.insertId);
  });

  res.send("Registro guardado");

});

module.exports = router;
