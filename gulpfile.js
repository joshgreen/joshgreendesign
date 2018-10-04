/*
npm install --save-dev gulp gulp-sass browser-sync gulp-uglify pump gulp-babel gulp-uglifyes gulp-imagemin gulp-cache gulp-sourcemaps gulp-concat gulp-autoprefixer gulp-clean-css gulp-rename
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
var uglify = require('gulp-uglifyes');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');


// Css task
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/assets/css'))

    .pipe(browserSync.reload({
      stream: true
    }))
});


// Javascript task
gulp.task('scripts', function () {
  return gulp.src('src/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('web/assets/js'));
});

// Image task
gulp.task('images', function () {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('web/assets/img'))
});

// Browser sync
gulp.task('browserSync', function () {
  browserSync.init({
    proxy: 'http://joshgreendesign.local'
  });
});


// Watch task
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);
  // Other watchers
  gulp.watch('templates/**/*.*', browserSync.reload);
  gulp.watch('web/assets/js/**/*.js', browserSync.reload);
  gulp.watch('web/assets/img/**/*.+(png|jpg|jpeg|gif|svg)', browserSync.reload);
});


gulp.task('default', ['watch', 'browserSync', 'sass', 'scripts', 'images']);
