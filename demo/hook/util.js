'use strict';

var exec = require('child_process').execSync;
var request = require('sync-request');

module.exports = {
  // クッキーの文字列から対象となるcookieのみをkeyごとstring型で取得する
  getCookie: function(targetCookie, key) {
    var cookies = targetCookie.split('; ');
    for(var i = 0; targetCookie.length > i; i++) {
      if(cookies[i].substring(0, key.length) == key) return cookies[i];
    }
    return false;
  },

  //企業ユーザの認証が必要な箇所のセッション用クッキーを取得する
  getSession: function(cookieName) {
    var res = request('POST', 'http://localhost:3000/account/login', {
      'headers': {"Content-type": "application/json"},
      json: {
        email: "example@example.com",
        password: "password"
      }
    });
    if(res.statusCode != 200) return false;
    return this.getCookie(res.headers["set-cookie"][0], cookieName);
  }
}
