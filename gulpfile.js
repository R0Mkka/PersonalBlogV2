var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });

    gulp.watch('./sass/*.scss', gulp.series('sass'));
    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch('./dist/bundle.js').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});