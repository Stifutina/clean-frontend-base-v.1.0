const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpEslint = require('gulp-eslint');
const gulpUglify = require('gulp-uglify');

function eslint() {
    return gulp.src('src/js/*.js')
        .pipe(gulpEslint())
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failAfterError());
}

function babel() {
    return gulp.src('src/js/*.js')
        .pipe(gulpBabel({
            presets: ['@babel/env'],
        }))
        .pipe(gulp.dest('dist/js'));
}

function uglify() {
    return gulp.src('dist/js/*.js')
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/js'));
}


gulp.task('eslint', eslint);
gulp.task('babel', babel);
gulp.task('uglify', uglify);


gulp.task('default', gulp.series('eslint', 'babel', 'uglify'));
