'use strict';

const gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    nodemon = require('gulp-nodemon'),

    runSequence = require('run-sequence'),
    rimraf = require('rimraf'),
    webpack = require('webpack-stream');

//Delete the entire folder and recreate
gulp.task('clean', (cb) => {
    return rimraf('./dist', cb);
});

/**
 * Build Express server
 */
gulp.task('build:server', function () {
    var tsProject = tsc.createProject('server/tsconfig.json');
    var tsResult = gulp.src('server/src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/server'));
});


gulp.task('build:client', function () {
    return gulp.src(['client/**/*.ts', 'client/**/*.tsx'])
        .pipe(webpack(require('./config/webpack.config.js')))
        .pipe(gulp.dest('dist/client'));
});

gulp.task("clientResources", () => {
    return gulp.src(["client/**/*", "!**/*.ts", "!**/*.tsx", "!client/typings", "!client/typings/**", "!client/*.json", "!client/dist", "!client/dist/**"])
        .pipe(gulp.dest("dist/client"));
});


gulp.task("serverResources", () => {
    return gulp.src(["server/src/bin/**"])
        .pipe(gulp.dest("dist/server/bin"));
});


gulp.task("compile", () => {
    return gulp.src(['client/**/*.ts', 'client/**/*.tsx'])
        .pipe(webpack(require('./config/webpack.config.js')))
        .pipe(gulp.dest('dist/client'));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {

    gulp.watch(['client/**/*.ts', 'client/**/*.tsx'], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });

    gulp.watch(["client/**/*.html", "client/**/*.css"], ['clientResources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });

    gulp.watch(["server/src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});




/**
 * Start the express server with nodemon
 */
gulp.task('start', function () {
    nodemon({
            script: 'dist/server/bin/www',
            ext: 'html js',
            ignore: ['ignored.js']
        })
        .on('restart', function () {
            console.log('restarted!');
        });
});



gulp.task("build", function (callback) {
    runSequence('clean', 'build:server', 'build:client', 'clientResources', 'serverResources', callback);
});


gulp.task('default', function () {
    runSequence('clean', 'build:server', 'build:client', 'clientResources', 'serverResources', 'watch', 'start');
});