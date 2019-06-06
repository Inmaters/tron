var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

const scssFiles = [
    './src/scss/style.scss',
    './src/scss/mixins.scss',
]

gulp.task('sass', function () {
    return gulp.src(scssFiles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(csso())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./public/css'));
});

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}
gulp.task('watch', watch);


