const gulp = require('gulp');

const gulpClean = require('gulp-clean');

/* JS */
const gulpBabel = require('gulp-babel');
const gulpEslint = require('gulp-eslint');
const gulpUglify = require('gulp-uglify');

/* CSS */
const gulpScssLint = require('gulp-scss-lint');
const gulpSass = require('gulp-sass');
const gulpAutoprefixer = require('gulp-autoprefixer');

/* HTML */
const gulpPug = require('gulp-pug');

/* SERVE */
const gulpBrowserSync = require('browser-sync').create();

function clean() {
    return gulp.src('dist', { read: false })
        .pipe(gulpClean());
}

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

function scssLint() {
    return gulp.src('src/slyle/*.scss')
        .pipe(gulpScssLint({
            config: 'lint.yml',
        }))
        .pipe(gulpScssLint.failReporter());
}


function scssCss() {
    return gulp.src(['src/style/*.scss'])
        .pipe(gulpSass({
            outputStyle: 'compressed',
        }))
        .pipe(gulp.dest('dist/style'));
}

function autoprefixer() {
    return gulp.src('dist/style/*.css')
        .pipe(gulpAutoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(gulp.dest('dist/style/'));
}

function browserSync() {
    gulpBrowserSync.init({
        server: {
            baseDir: './',
        },
    });

    gulp.watch('src/style/*.scss', ['sass']);
    /* gulp.watch('app/!*.html').on('change', browserSync.reload); */
}

function pug() {
    return gulp.src('src/content/**/*.pug')
        .pipe(gulpPug({}))
        .pipe(gulp.dest('dist/'));
}

gulp.task('clean', clean);
gulp.task('eslint', eslint);
gulp.task('babel', babel);
gulp.task('uglify', uglify);
gulp.task('scsslint', scssLint);
gulp.task('scsscss', scssCss);
gulp.task('autoprefixer', autoprefixer);
gulp.task('pug', pug);

gulp.task('serve', gulp.series('clean', 'eslint', 'babel', 'uglify', 'scsslint', 'scsscss', 'autoprefixer'), browserSync);
gulp.task('default', gulp.series('clean', 'eslint', 'babel', 'uglify', 'scsslint', 'scsscss', 'autoprefixer', 'pug'));
