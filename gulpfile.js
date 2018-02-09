// Port#
const PORT = '8000';

// Imports
var gulp   = require('gulp'),
    exec   = require('child_process').exec,
    watch  = require('gulp-watch'),
    riot   = require('gulp-riot'),
    minify = require('gulp-minify'),
    sass   = require('gulp-sass'),
    plumber   = require('gulp-plumber'),
    livereload   = require('gulp-livereload'),
    rename = require('gulp-rename');

// Start localhost
gulp.task('startWebServer', (cb) => {
  var root = process.cwd();
  exec('c:\\xampp\\php\\php.exe -S localhost:' + PORT + ' -t ' + root, (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('The web server has started.');
  cb();
});

// Stop localhost
gulp.task('stopWebServer', (cb) => {
  exec('FOR /F "tokens=5 delims= " %P IN (\'netstat -ano ^| findstr :' + PORT + ' ^| findstr /i LISTENING\') DO TaskKill.exe /F /PID %P', (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('The web server has stopped.');
  cb();
});

// Watchers
gulp.task('watch', (cb) => {
  livereload.listen();

  // Watching HTML files for any changes
  watch('./**/*.html', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(livereload());
  });
  console.log('Watching your HTML files.');

  // Compile a Riot.js tag file
  watch('_src/tag/*.tag', (e) => {
    gulp.src(e.path)
    .pipe(riot({
      compact: true
    }))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('_assets/tag'));
  });
  console.log('Watching your Riot.js tag files.');

  // Compile an SCSS file
  watch('_src/scss/*.scss', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('_assets/css'))
    .pipe(livereload());
  });
  console.log('Watching your SCSS files.');

  // Minify a JS file
  watch('_src/js/*.js', (e) => {
    gulp.src(e.path)
    .pipe(plumber())
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('_assets/js'))
    .pipe(livereload());
  });
  console.log('Watching your JS files.');

  cb();
});

// Say hello
gulp.task('sayHello', function() {
  console.log("Hi, I'm always with you!");
});

// run -> gulp (for default tasks)
gulp.task('default', ['startWebServer', 'watch']);
