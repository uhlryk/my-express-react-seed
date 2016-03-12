var gulp = require('gulp');
var fs = require('fs');
var gutil = require("gulp-util");
var sequence = require('gulp-sequence');
var webpack = require('webpack');
var path = require('path');
var nodemon= require('gulp-nodemon');
var shell = require('gulp-shell');
var serverConfig = require('./webpack.config.server');
var clientProdConfig = require('./webpack.config.client.prod');
var delPath = require('del');

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
gulp.task('_delete-dist', function(done) {
  delPath(['./dist/']).then(() => {
    done();
  });
});

gulp.task('_copy-server-layout', function(done) {
  var stream = gulp.src(['./src/server/emailTemplates/**/*', './src/server/views/**/*'], { 'base' : './src/server' })
    .pipe(gulp.dest('./dist/'));
  stream.on('end', function() {
    done();
  });
});

//it has only use for dev hmr compilation
gulp.task('_copy-client-layout', function(done) {
  var stream = gulp.src(['./src/client/index.html'])
    .pipe(gulp.dest('./dist/client'));
  stream.on('end', function() {
    done();
  });
});
/**
 * compile ES6 client files
 */
gulp.task('_compile-client', function(done) {
  webpack(clientProdConfig).run(onBuild(done));
});

/**
 * compile ES6 server files
 */
gulp.task('_compile-server', function(done) {
  webpack(serverConfig).run(onBuild(done));
});

gulp.task('_watch-server', function(done) {
  gulp.watch('./src/server/**/*.js', ['_compile-server']);
  gulp.watch('./src/server/**/*.ejs', function(done) {
    sequence(
      '_copy-server-layout',
      '_compile-server',
      done
    )
  });
  done();
});

/**
 * development compile frontend
 */
gulp.task('_watch-client', function(done) {

  gulp.watch('./src/client/**/*.js', ['_compile-client', '_compile-server']);
  gulp.watch('./src/client/**/*.jsx', ['_compile-client', '_compile-server']);
  done();
});

/**
 * compile ES6 server files watch on changes and run server
 */
gulp.task('_run-server', function(done) {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'app'),
    watch: ['dist/'],
  }).on('restart', function() {
    console.log('Restarted!');
  });
  done();
});

gulp.task('_run-dev-client', shell.task(['node devServer.js']));

gulp.task('_test', shell.task(['./node_modules/.bin/mocha  --check-leaks --timeout 3000 tests/server']));
gulp.task('_coverage-test-server', shell.task(['./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha tests/server --print both --recursive -- -u exports -R spec && open coverage/lcov-report/index.html']));
/**
 * compile server and run tests
 */
gulp.task('test',function(done) {
  sequence(
    '_delete-dist',
    '_copy-server-layout',
    '_compile-client',
    '_compile-server',
    '_test',
    done
  )
});
gulp.task('coverage', function(done){
  sequence(
    '_delete-dist',
    '_copy-server-layout',
    '_compile-client',
    '_compile-server',
    '_coverage-test-server',
    done
  )
});

/**
 * Create production ready application in dist directory. It is server and frontend app, where server serves frontend and backend render
 */
gulp.task('compile', function(done) {
  sequence(
    '_delete-dist',
    '_copy-server-layout',
    '_compile-client',
    '_compile-server',
    done
  )
});

/**
 * run everything for development, server and frontend are available in different ports, frontend with hot module reload
 */
gulp.task('dev-hot', function(done) {
  sequence(
    '_delete-dist',
    '_copy-server-layout',
    '_copy-client-layout',
    '_compile-client',
    '_compile-server',
    '_watch-server',
    '_run-server',
    '_run-dev-client',
    done
  )
});
/**
 * run everything for development, server serves frontend, server render frontend, no hot module reload
 */
gulp.task('dev-normal', function(done) {
  sequence(
    '_delete-dist',
    '_copy-server-layout',
    '_compile-client',
    '_compile-server',
    '_watch-client',
    '_watch-server',
    '_run-server',
    done
  )
});
