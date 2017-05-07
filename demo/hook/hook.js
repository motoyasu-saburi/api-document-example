'use strict';

var hooks = require('hooks');
var assert = require('assert');
var db = require('./db_config_moderator');
var util = require('./util');

var stash = {};

// スキップするエンドポイント
var skipEndPoints = [
  'HogeController > Hoge > Hogeの取得',
];

//テストをスキップするエンドポイントに対してスキップ処理を行う
skipEndPoints.forEach(function(endpoint) {
  hooks.before(endpoint, function (transaction) {
    transaction.skip = true;
  });
});

// 最初の処理が始まる前の初期化
hooks.beforeAll(function (transactions, done) {
  stash['session'] = util.getSession('SESSION_NAME');
  done();
});

// 全ての処理が終了したら行う後処理
hooks.afterAll(function (transactions, done) {
  done();
});

// 全ての処理が行われる直前で毎回行う処理
hooks.beforeEach(function (transaction) {
  //セッションを設定する
  if(stash['session'] != undefined){
    stash['session'] = util.getSession("SESSION_NAME");
    transaction.request['headers']['Cookie'] = stash["session"];
  };
  transaction = initialProcessingForAgentApi(transaction);
});

//API ドキュメントに書かれているデータとは別のデータを流し込んでテストを行う
hooks.before('HogeController > Hoge > Hogeの投稿', function (transaction) {
  var adjustedJson = JSON.parse(transaction.request.body);
  adjustedJson.emails[0] = "test_user@example.com"; //test用のメールアドレスを流し込む
  transaction.request.body = JSON.stringify(adjustedJson);
});

// JSONの比較とSQLによるデータの確認
hooks.after('HogeController > Hoge > Hogeの投稿', function (transaction) {
  //API ドキュメントに書かれている予想される戻り値
  var expectedObj = JSON.parse(transaction.expected.body);
  //APIサーバから返された実際のJSON値
  var actualObj = JSON.parse(transaction.real.body);
  assert.deepEqual(expectedObj, actualObj);
  // SQLを発行してデータが入ったかどうかの確認
  var query = 'select * from hoge where hoge = ' + expectedObj.hoge;
  db.query(query, (err, results, rows) => {
    if (err) throw err;
    assert(results[0].HOGE != null);
    assert(results[0].HOEG_ID != expectedObj.hoge);
  });
});
