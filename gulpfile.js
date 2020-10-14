const path = require('path');
const gulp  = require('gulp');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// Pull in optional configuration from the package.json file, a la:
const {componentPath, componentDirectories, buildDestionation} = require('@visual-framework/vf-config');

// Tasks to build/run vf-core component system
require('./node_modules/\@visual-framework/vf-core/gulp-tasks/_gulp_rollup.js')(gulp, path, componentPath, componentDirectories, buildDestionation);
require('./node_modules/\@visual-framework/vf-extensions/gulp-tasks/_gulp_rollup.js')(gulp, path, componentPath, componentDirectories, buildDestionation);

// Watch folders for changes
gulp.task('watch', function() {
  gulp.watch(['./src/components/**/*.scss', '!./src/components/**/package.variables.scss'], gulp.parallel('vf-css'));
  gulp.watch(['./src/components/**/*.js'], gulp.parallel('vf-scripts'));
  gulp.watch(['./src/pages/**/*'], gulp.parallel('build-assets', 'build-html'));
  gulp.watch(['./build/**/*'], gulp.series('browser-reload'));
});

gulp.task('build-html', function(done) {
  gulp.src('./src/pages/**/*.html') // important: only on html files
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(buildDestionation));
  done();
});

// Copy local assets to the build directory
gulp.task('build-assets', function() {
  return gulp.src(['./src/pages/**/*','!./src/pages/**/*.html'])
    .pipe(gulp.dest(buildDestionation));
});

// Serve locally
gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: buildDestionation,
      index: '/index.html'
    }
  });
  done();
});

gulp.task('browser-reload', function(done) {
  browserSync.reload();
  done();
});

// Let's build this sucker.
gulp.task('build', gulp.series(
  'vf-clean',
  gulp.parallel('build-assets','build-html','vf-css','vf-scripts','vf-component-assets')
));

// Build and watch things during dev
gulp.task('dev', gulp.series(
  'vf-clean',
  gulp.parallel('build-assets','build-html','vf-css','vf-scripts','vf-component-assets'),
  'browser-sync',
  gulp.parallel('watch','vf-watch')
));

