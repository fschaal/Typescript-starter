'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const shell = require('gulp-shell');
const ts = require("gulp-typescript");

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
    return gulp.src(outDir, {
            read: false
        })
        .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task("compile", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
            noImplicitAny: true
        }));
    return tsResult.js.pipe(gulp.dest("build"));
});

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task([
    'npm run tsc-watch',
]))


/**
 * Build the project.
 */
gulp.task('build', ['tslint', 'compile'], () => {
    console.log('Building the project ...');
});



gulp.task('default', ['build']);