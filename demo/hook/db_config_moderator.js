'use strict';

var mysql = require('mysql');
var exec = require('child_process').execSync;

//DBの設定先
module.exports = mysql.createConnection({
  host : "127.0.0.1",
  user : "root",
  password : "",
  database: "database_name",
  port : 3306,
});

//データベースの初期化
module.exports.reset = function() {
  //exec("sh ./db_reset.sh");
}
