FORMAT: 1A
HOST: http://localhost:3000

# Exampleプロジェクト

このファイルはAPI Blueprintを用いたAPIドキュメントになります。

# Group UserController

## ユーザ [/user{?id,query,private}]

### ユーザ情報の取得 [GET]

指定した条件でユーザの取得を行う

+ Parameters
    + id: `5` (required, number) - ユーザID
    + query (optional, string) - フリーワード検索
    + private (optional, boolean) - 公開設定

+ Response 200 (application/json)
    + Attributes (ResponseUserModel)

+ Response 401 (application/json)
Jsonを記載することもできる。
    + Body

            {
              "error": "authenticate error"
            }


# Data Structure

## ResponseUserModel
+ name: `API花子`(required, string) - 氏名
+ age: `25` (optional, number) - 年齢
+ accountName: `アカウント名` (required, string) - アカウント名
+ private: `false` (required, boolean) - 公開設定
