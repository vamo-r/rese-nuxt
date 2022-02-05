# Rese
飲食店予約アプリのフロントエンドリポジトリです。  
実際のアプリケーションは[こちら](https://rese.vercel.app/)からどうぞ。  
Dockerを使用して構築した為、動作確認がしたい方はDockerをご使用ください。  
同時にバックエンドリポジトリをクローンし、同様にDockerで立ち上げる必要があります。  
このリポジトリはVercelにデプロイしています。  
  
また、アカウントの削除機能は実装されていませんので、  
一度登録したアカウントは**削除できません！**  
ログイン画面からゲストユーザーにてログインできますので、そちらからご利用ください。  
  
バックエンドリポジトリは[こちら](https://github.com/vamo-r/rese-laravel)です。

## 構築環境
* Nuxt:v2.15.8

## ページ一覧
* 店舗一覧ページ（トップページ）
* ログインページ
* ユーザー登録ページ
* サンクスページ
* 店舗詳細ページ
* 予約完了ページ

## 使い方

```bash
git clone https://github.com/vamo-r/rese-nuxt.git
または
git clone git@github.com:vamo-r/rese-nuxt.git
```
```bash
cd rese-nuxt
```
```bash
docker compose up --build
```
```bash
npm install
```
```bash
docker compose exec web yarn dev
```
※CORSの関係上、バックエンドリポジトリをクローンしたままの状態ですと、  
http://localhost:3000/ でのみアクセスが可能です。  
http://127.0.0.1:3000/ ではアクセス出来ませんのでご承知ください。

## メモ
随時更新・修正していきます。

## 開発者 & ライセンス
* [vamo-r](https://twitter.com/vamo__r)