var createError = require('http-errors');
//expressモジュールの読み込み
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const con =  require('./db/db.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

// 2行目で読み込んだものをexpress()で実行し、生成されたコードを格納（オブジェクトの作成）
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//useはアプリにミドルウェアをバインドするためのもの
//app.use('mount path', middleware)で要求されたパスのみにミドルウェアを適用させるように制限

//log出力のフォーマットはdevを使う
app.use(logger('dev'));
//jsonファイルを解析するメソッドを使う
app.use(express.json());
//urlエンコード方式は拡張せずに使う
app.use(express.urlencoded({ extended: false }));
//クッキーを解析するメソッドを使う
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to express_database');
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(セレクタ)は、対象要素の次に配置されている要素だけを取得するメソッド
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  //ローカルにおいて開発者にだけエラーを表示する
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//ここまでexpress()を読み込み、set(), use()などでアプリの機能を設定してきた
//それらを改めてモジュール化して外部ファイルと連携されるために最後にexportする
module.exports = app;
