var path = require('path');
var express = require('express');
var config = require('./webpack.config.client.dev');
var webpack = require('webpack');

var app = express();
var compiler = webpack(config);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './dist/views'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.render('index');
});

app.listen(3001, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://0.0.0.0:3001');
});
