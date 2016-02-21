var gulp = require('gulp');
var fs = require('fs');
var gutil = require("gulp-util");
var webpack = require('webpack');
var path = require('path');
var nodemon= require('nodemon');
var shell = require('gulp-shell')
var serverConfig = require('./webpack.config.server');
var clientProdConfig = require('./webpack.config.client.prod');

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

gulp.task('copy-sever-layout', function() {
  return gulp.src(['./src/server/emailTemplates/**/*'])
    .pipe(gulp.dest('./dist/emailTemplates'))
});

gulp.task('copy-client-layout', function() {
  return gulp.src(['./src/client/index.html'])
    .pipe(gulp.dest('./dist/client'))
});
/**
 * compile ES6 client files
 */
gulp.task('compile-client', ['copy-client-layout'], function(done) {
  webpack(clientProdConfig, function(err, stats) {
    if(err) console.log(err);
    gutil.log("[webpack]", stats.toString({}));
    done();
  });
});

/**
 * compile ES6 server files
 */
gulp.task('compile-server', ['copy-sever-layout'], function(done) {
  webpack(serverConfig).run(onBuild(done));
});

/**
 * compile production ES6 server and client  files
 */
gulp.task('compile-production', ['compile-client', 'compile-server']);


/**
 * development compile dev server which also run client dev
 */
gulp.task('watch-dev-server', ['copy-client-layout', 'copy-sever-layout'], function() {
  var firstStart = false;
  webpack(serverConfig).watch(100, function(err, stats) {
    onBuild()(err, stats);
    if(firstStart === true) {
      nodemon.restart();
    }
    firstStart = true;
  });
});
/**
 * compile ES6 server files watch on changes and run server
 */
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

gulp.task('run-dev-client', function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'devServer'),
    ignore: ['*'],
    watch: ['dist/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
});

/**
 * compile server and run tests
 */
gulp.task('test-server', ['compile-server'], shell.task([
  './node_modules/.bin/mocha  --check-leaks --timeout 3000 tests/server'
]));
gulp.task('coverage-test-server', ['compile-dev-server'], shell.task([
  './node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha tests/server --print both --recursive'
]));





