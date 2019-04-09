// Port#
const PORT = '8000';

const scssPathSource = '_src/scss/*.scss';
const scssPathDestination = '_assets/css';
const jsPathSource = '_src/js/*.js';
const jsPathDestination = '_assets/js';

// Imports
var gulp = require('gulp'),
  exec = require('child_process').exec,
  watch = require('gulp-watch'),
  minify = require('gulp-minify'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps');

// Start localhost
gulp.task('startWebServer', (cb) => {
  var root = process.cwd();
  exec('c:\\xampp\\php\\php.exe -S localhost:' + PORT + ' -t ' + root, (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('                The web server has started: MATHEMATICS APP | ' + PORT + '');
  console.log('→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←')
  cb();
});

// Stop localhost
gulp.task('stopWebServer', (cb) => {
  exec('FOR /F "tokens=5 delims= " %P IN (\'netstat -ano ^| findstr :' + PORT + ' ^| findstr /i LISTENING\') DO TaskKill.exe /F /PID %P', (err, stdout, stderr) => {
    if (err) {
      return cb(err);
    }
  });
  console.log('==================================');
  console.log('The web server has stopped.');
  console.log('==================================');
  cb();
});

// Watchers
gulp.task('watch', (cb) => {
  livereload.listen();

  console.log('                Watching → HTML | JSON, Minifying + Watching → JS | SCSS files');
  console.log('→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←')

  watch('./**/*.html', (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(livereload());
  });

  watch('./**/*.json', (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(livereload());
  });

  watch(scssPathSource, (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(scssPathDestination))
      .pipe(livereload());
  });

  watch(jsPathSource, (e) => {
    gulp.src(e.path)
      .pipe(plumber())
      // .pipe(sourcemaps.init())
      // .pipe(minify({
      //   ext: {
      //     min: '.min.js'
      //   },
      //   noSource: true
      // }))
      // .pipe(sourcemaps.write('.'))
      // .pipe(gulp.dest(jsPathDestination))
      .pipe(livereload());
  });

  cb();
});

// Say hello
gulp.task('sayHello', function () {
  console.log("                Hi, I'm always with you!");
  console.log('→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←')
});

// run -> gulp (for default tasks)
// gulp.task('default', ['startWebServer', 'watch']);
gulp.task('default', gulp.series('startWebServer', 'watch'));