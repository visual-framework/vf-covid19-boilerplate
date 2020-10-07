const gulp  = require('gulp');
const browserSync = require('browser-sync').create();
var   fractalBuildMode;
const deploy      = require('gulp-gh-pages');
// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

// Pull in some optional configuration from the package.json file, a la:
// "vfConfig": {
//   "vfName": "My Component Library",
//   "vfNameSpace": "myco-",
//   "vfComponentPath": "./src/components",
//   "vfComponentDirectories": [
//      "vf-core-components",
//      "../node_modules/your-optional-collection-of-dependencies"
//     NOTE: Don't forget to symlink: `cd components` `ln -s ../node_modules/your-optional-collection-of-dependencies`
//    ],
//   "vfBuildDestination": "./build",
//   "vfThemePath": "@frctl/mandelbrot"
// },
// all settings are optional
// todo: this could/should become a JS module
const fs = require('fs');
const path = require('path');
const fileinclude = require('gulp-file-include');
const config = JSON.parse(fs.readFileSync('./package.json'));
const vfCoreConfig = JSON.parse(fs.readFileSync(require.resolve('@visual-framework/vf-core/package.json')));
config.vfConfig = config.vfConfig || [];
global.vfName = config.vfConfig.vfName || "Visual Framework 2.0";
global.vfNamespace = config.vfConfig.vfNamespace || "vf-";
global.vfComponentPath = config.vfConfig.vfComponentPath || path.resolve('.', __dirname + '/components');
global.vfBuildDestination = config.vfConfig.vfBuildDestination || __dirname + '/temp/build-files';
global.vfThemePath = config.vfConfig.vfThemePath || './tools/vf-frctl-theme';
global.vfVersion = vfCoreConfig.version || 'not-specified';
const componentPath = path.resolve('.', global.vfComponentPath).replace(/\\/g, '/');
const componentDirectories = config.vfConfig.vfComponentDirectories || ['vf-core-components'];
const buildDestionation = path.resolve('.', global.vfBuildDestination).replace(/\\/g, '/');

// The directory the site will be deployed to (if any)
const deployDirectory = config.vfConfig.vfDeployDirectory || "vf-covid19-boilerplate";

// Tasks to build/run vf-core component system
require('./node_modules/\@visual-framework/vf-core/gulp-tasks/_gulp_rollup.js')(gulp, path, componentPath, componentDirectories, buildDestionation);

// Watch folders for changess
gulp.task('watch', function() {
  gulp.watch(['./src/components/**/*.scss', '!./src/components/**/package.variables.scss'], gulp.parallel('vf-css'));
  gulp.watch(['./src/components/**/*.js'], gulp.parallel('vf-scripts'));
  gulp.watch(['./src/pages/**/*'], gulp.series('pages', 'fileinclude'));
  gulp.watch(['./build/**/*'], gulp.series('browser-reload'));
});

gulp.task('set-to-development', function(done) {
  process.argv.push('--serve');
  fractalBuildMode = 'server';
  done();
});

gulp.task('set-to-static-build', function(done) {
  process.argv.push('--quiet');
  fractalBuildMode = 'dataobject'; // run fractal in server mode as there's no need for static html assets
  done();
});

gulp.task('fileinclude', function(done) {
  gulp.src('./src/pages/**/*')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(buildDestionation));
  done();
});


// Run build-assets, but only after we wait for fractal to bootstrap
// @todo: consider if this could/should be two parallel gulp tasks
gulp.task('build-assets', function(done) {
  global.vfBuilderPath   = __dirname + '/build/vf-core-components';
  // global.vfDocsPath      = __dirname + '/node_modules/\@visual-framework/vf-build-assets--extensions/fractal/docs';
  global.vfOpenBrowser   = false; // if you want to open a browser tab for the component library
  global.fractal         = require('@visual-framework/vf-core/fractal.js').initialize(fractalBuildMode,fractalReadyCallback); // make fractal components are available gloablly

  function fractalReadyCallback(fractal) {
    global.fractal = fractal; // save fractal globally
    console.log('Done building Fractal');
    done();
  }
});

// Copy pages to the build directory
gulp.task('pages', function(){
  return gulp.src('./src/pages/**/*')
    .pipe(gulp.dest(buildDestionation));

});

// Serve locally
gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
          baseDir: './build',
          index: deployDirectory+'/index.html'
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
  gulp.parallel('pages','vf-css','vf-scripts','vf-component-assets'),
  'set-to-static-build',
  'fileinclude',
  'build-assets'
));

// Build and watch things during dev
gulp.task('dev', gulp.series(
  'vf-clean',
  gulp.parallel('pages','vf-css','vf-scripts','vf-component-assets'),
  'set-to-development',
  'fileinclude',
  'build-assets',
  'browser-sync',
  gulp.parallel('watch','vf-watch')
));

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe(deploy())
});
