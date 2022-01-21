// ****************************
// 1. Déclaration des variables
// ****************************
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// ****************************
// 2. Mes tâches
// ****************************

// Remplace la moulinette de SASS
gulp.task('sassification', function(){
  return gulp.src('dev/css/*.scss')
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename("/styles.min.css"))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('prod/css'));
});

gulp.task('htmlification', function(){
  return gulp.src('dev/*.html')
  .pipe(gulp.dest('prod/'));
})

gulp.task('imgification', function(){
  return gulp.src('dev/img/*')
  .pipe(gulp.dest('prod/img/'));
})

gulp.task('jsification', function() {
  return gulp.src('dev/js/*.js')
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.extname = ".min.js";
  }))
  .pipe(gulp.dest('prod/js/'));
})

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "prod/"
      }
  });
});

// ****************************
// 3. Exécution des tâches
// ****************************
gulp.task('observation', 
  gulp.parallel('imgification' , 'browser-sync', 'sassification', 'htmlification', 'jsification', function() {
    gulp.watch('dev/css/**/*.scss', gulp.series('sassification'));
    gulp.watch('dev/*.html', gulp.series('htmlification'));
    gulp.watch('dev/js/*.js', gulp.series('jsification'));
    gulp.watch('prod/**/*').on('change', browserSync.reload);
  }));

gulp.task('default', gulp.series('observation'));