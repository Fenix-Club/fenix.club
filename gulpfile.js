var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    merge      = require('merge-stream'),
    plumber    = require('gulp-plumber'),
    mbf        = require('main-bower-files'),
    concat     = require('gulp-concat'),
    jshint     = require('gulp-jshint'),
    stylish    = require('jshint-stylish'),
    less       = require('gulp-less-sourcemap'),
    sourcemaps = require('gulp-sourcemaps'),
    removeUst  = require('gulp-remove-use-strict'),
    argv       = require('yargs').argv,
    livereload = require('gulp-livereload'),
    postcss    = require('gulp-postcss'),
    autoprefixer= require('autoprefixer-core'),
    template    = require('gulp-template'),
    gulpif      = require('gulp-if'),
    injectReload= require('gulp-inject-reload'),
    path = require('path'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHtml = require('gulp-minify-html');


var onError = function (err) {
  gutil.beep();
  gutil.log(err);
};

var ENV = argv.e !== undefined ? argv.e : 'dev';

gulp.task("compile_public", function() {
  var git = require('git-rev');
  git.log(function(log_arr) {
    var last_commit = log_arr[0];
    merge(
      gulp.src(['app/scripts/**/*.js', 'app/scripts/*.js'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('fenixclub.js'))
        .pipe(gulp.dest('./build/scripts'))
        .pipe(livereload({auto:false})),
      gulp.src(['app/assets/**', '!app/assets/index.html']).pipe(gulp.dest('./build')),
      gulp.src(['app/assets/index.html'])
        .pipe(template({
          timestamp: +(new Date()),
          time: (new Date()).toISOString(),
          git_hash: last_commit[0],
          git_message: last_commit[1],
          env: process.env.ENV || 'devel'
        }))
        .pipe(gulpif(argv.livereload, injectReload()))
        .pipe(gulp.dest('./build')),
      gulp.src(['app/assets/templates/**/*.html'])
      .pipe(minifyHtml({
        empty: true
      }))
      .pipe(templateCache('templates.js', {
        root: 'templates/',
        standalone: true
      }))
      .pipe(gulp.dest('./build/scripts'))
    );
  });
});

gulp.task("compile_bower", function() {
  return merge(
    gulp.src(mbf(), { base: 'app/bower_components'})
      .pipe(concat('vendor-full.js'))
      .pipe(gulp.dest('build/scripts'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(rename('vendor.js'))
      .pipe(gulp.dest('build/scripts')),
    gulp.src(['app/bower_components/**/*'])
      .pipe(gulp.dest('./build/bower_components')) // copy all of them until we figure out something better
    );
});

gulp.task('compile_bootstrap', function() {
    // moves all neseceary files
    return merge(

        gulp.src('bower_components/bootstrap/dist/js/*')
        .pipe(gulp.dest('./build/vendor/js')),

        gulp.src('bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./build/vendor/fonts'))
    );
});

gulp.task("compile_less", function() {
    return merge(
      gulp.src('app/vendor/**/*.less').pipe(less()).pipe(concat('vendor.css')).pipe(gulp.dest('build/styles')),
      gulp.src('app/styles/fenixclub.less')
        .pipe(less())
        .pipe(postcss([autoprefixer({
          browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Safari >= 7']
        })]))
        .pipe(gulp.dest('./build/styles'))
        .pipe(livereload({auto:false}))
    );
});


gulp.task('compile', ['compile_less', 'compile_public', 'compile_bower', 'compile_bootstrap']);

gulp.task("watch", function() {
  gulp.watch(['app/styles/**/*.less','app/styles/*', 'app/styles/**/*'], ['compile_less']);
  gulp.watch(['app/scripts/**/*.js', 'app/assets/**/*'], ['compile_public']);
  gulp.watch(['app/bower_components/**/*', ['compile_bower']]);

    livereload.listen();

    gulp.start(['compile']);
});
