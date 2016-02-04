var gulp = require('gulp');
var fs = require('fs');
var gutil = require("gulp-util");
var webpack = require('webpack');
var path = require('path');

var node_modules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    node_modules[mod] = 'commonjs ' + mod;
  });

var serverWebpackOptions = {
  module: {
    loaders: [
      {
        test: /.js$/,
        loaders: ['babel?presets[]=es2015,presets[]=stage-0'],
        include: path.join(__dirname, 'src/server'),
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  entry: [
    './src/server/app.js'
  ],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'server.js'
  },
  target: 'node',
  eslint: {

  },
  node: {
    __filename: true,
    __dirname: false
  },
  resolve: {},
  externals: node_modules,
  debug: true,
  progress: false,
  emitError: true,
  emitWarning: true,
  failOnError: true,
  stats: {
    colors: true,
    reasons: true
  },
  devtool: 'source-map'
};



gulp.task('compile-server', function(done) {
  webpack(serverWebpackOptions, function(err, stats) {
    if(err) console.log(err);
    gutil.log("[webpack]", stats.toString({}));
    done();
  });
});

