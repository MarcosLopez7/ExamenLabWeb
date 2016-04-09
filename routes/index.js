var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
  auth: {
    api_key: 'key-bc3fc74a0194b1c7737292934e562968',
    domain: 'sandbox54f7765db7f94c3183147c6799191b52.mailgun.org'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2664300191",
  database: "Labwebapps"
});

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('index', {
    title: 'Inteligent Videogame Reviews',
    veces: req.session.views['/'].toString(),
    session: req.session.email
  });
  /*console.log(req.cookies);
  console.log('================');
  console.log(req.session);*/
});

router.post('/login', function(req, res, next){

  var usu = {
    email: req.body.username,
    pass: req.body.pass
  };

  var usuario = null;

  con.query('SELECT * FROM Usuario WHERE email = ? AND pass = ?', [usu.email, usu.pass],function(err,rows){
    if(err) throw err;

    usuario = rows[0];

    if (usuario != null) {
      if (!req.body.rem) {
        req.session.cookie.expires = false;
        console.log("What fart?\n");
      }
      req.session.email = usuario.email;
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

  nodemailerMailgun.sendMail({
    from: 'A01020023@itesm.mx',
    to: req.body.email, // An array if you have multiple recipients.
    subject: 'Bienvenido al sistema',
    text: 'Gracias ' + dataUser.nombre + ' por apoyar nuestro proyecto',
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });


  con.query('INSERT INTO Usuario SET ?', dataUser, function(err, res){
    if (err) throw err;

    console.log("insertado id: " + res.insertId);
  });

  res.send("Registro guardado");

});

module.exports = router;
