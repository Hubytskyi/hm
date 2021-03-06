const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const prefix      = require('gulp-autoprefixer');
const cp          = require('child_process');
const jade        = require('gulp-jade');

// const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/*
* Gulp Stuff
*/

gulp.task('jade', function(){
    return gulp.src('_jadefiles/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('_includes'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */

gulp.task('watch', function () {
    gulp.watch('assets/css/**', gulp.parallel('sass'));
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*'], gulp.parallel('jekyll-rebuild'));
    gulp.watch('_jadefiles/*.jade', gulp.parallel('jade'));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */

gulp.task('default', gulp.parallel('browser-sync', 'watch'));