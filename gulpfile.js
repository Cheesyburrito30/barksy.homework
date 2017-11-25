const gulp = require('gulp')
const connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

const vendors = ['angular']

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 8000,
        livereload: true
    })
})

gulp.task('html', function () {
    gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./**/*.html'], ['html']);
    gulp.watch(['./app/*.js'], ['browserify'])
    gulp.watch(['./app/**/*.js'], ['browserify'])
});

gulp.task('browserify', function() {
    // grabs single JS entry point
    return browserify('./app/app.module.js')
    // bundles
        .bundle()
        .pipe(source('app.module.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(connect.reload())
})

gulp.task('default', ['browserify', 'connect', 'watch']);