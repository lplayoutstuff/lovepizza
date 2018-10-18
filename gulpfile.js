var gulp = require('gulp'),
    njkRender = require('gulp-nunjucks-render'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    newer = require('gulp-newer'),
    debug = require('gulp-debug'),
    imagemin = require('gulp-imagemin');

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        open: false,
        notify: false,
        server: {
            baseDir: "build"
        }
    });
});

// Build Variables
// -------------------------------------

var envDev = true;

// Paths
// -------------------------------------
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img',
        libs: 'build/libs/',
        fonts: 'build/fonts/',
        assets: 'build/'
    },
    src: {
        html: 'src/*.njk',
        js: 'src/js/*.js',
        style: 'src/style/*.scss',
        img: 'src/img/**/*.*',
        libs: 'src/libs/**/*.*',
        fonts: 'src/fonts/**/*.*',
        assets: 'src/assets/**/*.*'

    },
    watch: {
        html: 'src/**/*.njk',
        js: 'src/js/**/*.{js,json}',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: 'build'
};
// Build HTML
// -------------------------------------
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(debug({title: 'html'}))
        .pipe(njkRender({
            path: 'src/partials'
        }))
        .pipe(gulp.dest(path.build.html));
});


// Build CSS
// -------------------------------------
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(gulpif(envDev, newer(path.build.js)))
        .pipe(gulpif(envDev, sourcemaps.init()))
        .pipe(sass({
            errLogToConsole: true,
            includePaths: "node_modules"
        }).on('error', sass.logError))
        .pipe(gulpif(envDev, sourcemaps.write("./maps")))
        .pipe(gulpif(!envDev, prefixer({
            browsers: ['last 4 versions', 'ie >= 9', '> 1%'],
            cascade: false
        })))
        .pipe(debug({title: 'css'}))
        .pipe(gulp.dest(path.build.css));
});

// Build Images
// -------------------------------------
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulpif(envDev, newer(path.build.img)))
        .pipe(debug({title: 'image'}))
        .pipe(gulp.dest(path.build.img));
});

// Build Images Compress
// -------------------------------------
gulp.task('image:compress', function () {
    gulp.src(path.src.img)
        .pipe(debug({title: 'image compress'}))
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.img));
});

// Build JS
// -------------------------------------
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulpif(envDev, newer(path.build.js)))
        //.pipe(gulpif(!envDev, uglify()))
        .pipe(debug({title: 'js'}))
        .pipe(gulp.dest(path.build.js));
});

// Build Fonts
// -------------------------------------
gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulpif(envDev, newer(path.build.fonts)))
        .pipe(debug({title: 'fonts'}))
        .pipe(gulp.dest(path.build.fonts));
});

// Build Libs
// -------------------------------------
gulp.task('libs:build', function () {
    gulp.src(path.src.libs)
        .pipe(gulpif(envDev, newer(path.build.libs)))
        .pipe(debug({title: 'libs'}))
        .pipe(gulp.dest(path.build.libs))
});

// Build Assets
// -------------------------------------
gulp.task('assets:build', function () {
    gulp.src(path.src.assets)
        .pipe(gulpif(envDev, newer(path.build.assets)))
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest(path.build.assets))
});

// Build All
// -------------------------------------
gulp.task('build', [
    'html:build',
    'style:build',
    'image:build',
    'js:build',
    'fonts:build',
    'libs:build',
    'assets:build'
]);

// Watcher
// -------------------------------------
gulp.task('watch', function () {
    gulp.watch([path.watch.html], function () {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function () {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function () {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.img], function () {
        gulp.start('image:build');
    });
});

// Clean Build
// -------------------------------------
gulp.task('clean', function () {
    return gulp.src(path.clean, {read: false})
        .pipe(clean({force: true}));
});

// Production
// -------------------------------------
gulp.task('production', ['clean'], function () {
    envDev = false;
    gulp.start('build');
});

// Default
// -------------------------------------
gulp.task('default', ['build', 'watch']);
