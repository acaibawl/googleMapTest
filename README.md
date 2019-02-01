## このプロジェクトの目的

下に列挙した技術、フレームワークを触ってみたかった
* Ajax
* なんでもいいからAPI
* JSON
* Node.jsのexpress

## 動作確認方法

1. npm i  
package.jsonで指定してるモジュールを用意する
1. npm start  
./bin/www.jsが起動してwebサーバーが動く
1. http://localhost:3000/map と http://localhost:3000/mapchange にアクセスするとGoogleMapを配置した画面が開く。  
mapchangeではAjax通信でJSONを受け取り、マップ部分だけを更新している

## 既知の不具合等

* Google Mapsを描画する度に「このページではGoogleマップが正しく読み込まれませんでした」と表示される。　ひとまずマップを表示できてはいるが、Googleのデベロッパー登録？をしてないからなのか、APIの呼び出し方が正しくないのかもしれないが、Google Mapsを使いこなすのが目的でもないのでひとまず放置しています
