var gulp = require('gulp');
var fs = require('fs');
var gutil = require("gulp-util");
var webpack = require('webpack');
var path = require('path');
var nodemon= require('nodemon');
var shell = require('gulp-shell')

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
    './src/server/server.js'
  ],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  output: {
    libraryTarget: "commonjs",
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

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('compile-dev-server', function(done) {
  webpack(serverWebpackOptions).run(onBuild(done));
});
gulp.task('watch-dev-server', function() {
  var firstStart = false;
  webpack(serverWebpackOptions).watch(100, function(err, stats) {
    onBuild()(err, stats);
    if(firstStart === true) {
      nodemon.restart();
    }
    firstStart = true;
  });
});

gulp.task('run-dev-server', ['watch-dev-server'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'app'),
    ignore: ['*'],
    watch: ['dist/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
});

gulp.task('test-server', ['compile-dev-server'], shell.task([
  './node_modules/.bin/mocha tests/server'
]));
