'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');

gulp.task('default', ['clean', 'min', 'serve']);

gulp.task('clean', function() {
  del('./dist/**/*');
});

gulp.task('concat', ['templates'], function() {
  return gulp.src([
    './src/directives/select.js',
    './src/services/selectHelpers.js',
    './dist/angular-bootstrap-select.tpl.js'
  ])
  .pipe(concat('angular-bootstrap-select.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('templates', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(templateCache('angular-bootstrap-select.tpl.js', {
      root: 'angular-bootstrap-select',
      module: 'angular-bootstrap-select',
      templateHeader: 'angular.module(\'<%= module %>\'<%= standalone %>).run([\'$templateCache\', function($templateCache) {\n  ',
      templateBody: '$templateCache.put(\'<%= url %>\',\n    \'<%= contents %>\'\n  );',
      templateFooter: '\n}]);'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('min', ['concat'], function() {
  return gulp.src('./dist/angular-bootstrap-select.js')
    .pipe(uglify({ mangle: false }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'examples',
      routes: {
        '/bower_components': 'bower_components',
        '/dist': 'dist'
      },
      directory: true
    }
  });

  gulp.watch(['dist/**/*.js', 'examples/**/*'], {}, reload);
});
