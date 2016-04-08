/**
 * Created by marcoslopez7 on 8/04/16.
 */

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2664300191",
    database: "Labwebapps"
});

var Usuario = function (data){
    this.data;
}

User.prototype.data = {};

User.prototype.saveData = function (){
    con.query('INSERT INTO Usuario SET ?', this.data, function(err, res){
        if (err) throw err;

        console.log("insertado id: " + res.insertId);
    });
}

User.findByLogin = function(){

}
