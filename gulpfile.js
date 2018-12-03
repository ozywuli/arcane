const path = require('path')
const gulp = require('gulp');

const autoprefixer = require('autoprefixer')
const babelify = require('babelify')
const browserify = require('browserify')
const browsersync = require('browser-sync').create()
const buffer = require('vinyl-buffer')
const notifier = require('node-notifier')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename');
const rimraf = require('rimraf')
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const util = require('gulp-util')
const tailwindcss = require('tailwindcss');

// Included paths
let includePaths = ['.', 'node_modules'];

gulp.task('clean', (cb) => {
    rimraf('./dist', cb)
})

/**
 * Show error
 * @desc Show error message
 * @access Private
 */
function showError(arg) {
    notifier.notify({
        title: 'Error',
        message: '' + arg,
        sound: 'Basso'
    })
    console.log(arg)
    this.emit('end');
}

gulp.task('build:scss', () => {
    return gulp.src(path.join('src', 'scss', 'arcane.scss'))
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: includePaths,
            onError: showError
        }).on('error', function(error) {
            showError(error);
            this.emit('end');
        }))
        .pipe(postcss([
            tailwindcss('./tailwind.js'),
            autoprefixer({
                browsers: [
                    'last 2 versions', 
                    'Firefox ESR', 
                    'Explorer >= 9', 
                    'Android >= 4.0', 
                    '> 2%'
                ]
            })
        ]))
        // .pipe(gulp.dest(path.join('examples', 'assets')))
        .pipe(gulp.dest(path.join('dist', 'css')))
        // .pipe(browsersync.stream({match: '**/*.css'}))
})

gulp.task('build:js', () => {
    return browserify({
            entries: path.join('src', 'js', `main.js`), 
            debug: false
        })
        .transform('babelify', {
            presets: ['env']
        })
        .bundle()
            .on('error', showError)
        .pipe(source(`main.js`))
        .pipe(buffer())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest(path.join('dist', 'js')))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
            .on('error', showError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.join('dist', 'js')))
        // .pipe(browsersync.stream({match: path.join('**','*.js')}))
})

gulp.task('build', gulp.series('clean', 'build:scss', 'build:js'));

gulp.task('watch', gulp.series('build', () => {
    // browsersync.init({
    //     open: false,
    //     notify: false,
    //     port: 9000,
    //     server: {
    //         baseDir: [
    //             path.join('tests'),
    //             path.join('examples', 'tests'),
    //             path.join('examples', 'pages'), 
    //             path.join('examples', 'assets'), 
    //             'dist'
    //         ],
    //         directory: true
    //     }
    // })

    gulp.watch(path.join('src', 'js', '*.js'), gulp.series('build:js'))
    gulp.watch(
        [
            path.join('src', 'scss', '**', '*.scss'),
            path.join('tailwind.js')
        ], 
        gulp.series('build:scss')
    )
    gulp.watch(path.join('examples', 'pages', '*.html'), browsersync.reload)
}));


gulp.task('default', gulp.series('watch'))

