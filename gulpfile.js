'use strict';

const gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = tsc.createProject("tsconfig.json"),
    runSequence = require('run-sequence'),
    rimraf = require('rimraf'),
    nodemon = require('gulp-nodemon');

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
    var tsProject = tsc.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/client'));
});
 
gulp.task("clientResources", () => {
    return gulp.src(["client/**/*", "!**/*.ts", "!client/typings", "!client/typings/**", "!client/*.json"])
        .pipe(gulp.dest("dist/client"));
});


gulp.task("serverResources", () => {
    return gulp.src(["server/src/bin/**"])
        .pipe(gulp.dest("dist/server/bin"));
});


gulp.task("libs", () => {
    return gulp.src([], {
            cwd: "node_modules/**"
        }) /* Glob required here. */
        .pipe(gulp.dest("dist/client/libs"));
});




gulp.task("compile", () => {
    let tsResult = gulp.src("client/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/client"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {

    gulp.watch(["client/**/*.ts"], ['compile']).on('change', function (e) {
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
    runSequence('clean', 'build:server', 'build:client', 'clientResources', 'serverResources', 'libs', callback);
});


gulp.task('default', function () {
    runSequence('clean', 'build:server', 'build:client', 'clientResources', 'serverResources', 'libs', 'watch', 'start');
});