const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpEslint = require('gulp-eslint');

function babel() {
  return gulp.src('src/js/*.js')
    .pipe(gulpBabel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))
}

function eslint() {
  return gulp.src('src/js/*.js')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
}


gulp.task('babel', babel);
gulp.task('eslint', eslint);


gulp.task('default', gulp.series('babel', 'eslint'));