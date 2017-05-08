# Quick Start
```
// 各ツールをインストール
$ npm install

// モックサーバの起動
$ npm run mock

// ビュワーの起動
$ npm run aglio 

// APIテストの起動
$ npm run dredd
```

## 各ファイルの説明

- document.md : API Blueprint形式で書かれたドキュメント
- dredd.yml : dreddのテスト時に行うコンフィグファイル。hook処理のスクリプト指定やログレベル、テスト対象のURLなどを指定する。基本は `dredd init` で作成する。詳しくは公式のドキュメント参照
- hook : dreddのテスト時に行えるhook処理の例。認証処理などがまとめてありますので`dredd.yml`などで指定していただければ使用できます。
- package.json : インストールするnodeのモジュールとか起動方法などがまとめてあります。詳しくはnpmの公式ドキュメントなどを読んでいただければ。

