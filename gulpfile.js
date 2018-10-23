const gulp = require('gulp')
const run = require('gulp-run-command').default

/**
 * HTML Compilation & Cleanup
 */
gulp.task('html:compile', run('eleventy'))

gulp.task('html:min', ['html:compile'], () => {
  return gulp.src('dist/**/*.html')
    .pipe(require('gulp-htmlmin')({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
})

gulp.task('html', ['html:compile', 'html:min'])

/**
 * CSS Processing & Cleanup
 */
gulp.task('css:compile', ['html:compile'], () => {
  return gulp.src('src/styles.css')
    .pipe(require('gulp-postcss')([
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest('dist'))
})

gulp.task('css:purge', ['html:compile', 'css:compile'], () => {
  return gulp.src('dist/styles.css')
    .pipe(require('gulp-purgecss')({
      content: ['dist/index.html'],
      extractors: [
        {
          extractor: class TailwindExtractor {
            static extract(content) {
              return content.match(/[A-z0-9-:\/]+/g) || [];
            }
          },
          extensions: ['css', 'html'],
        }
      ]
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('css:min', ['css:purge'], () => {
  return gulp.src('dist/styles.css')
    .pipe(require('gulp-cssmin')())
    .pipe(gulp.dest('dist'))
})

gulp.task('css', ['css:compile', 'css:purge', 'css:min'])

/**
 * Default (all tasks)
 */
gulp.task('default', ['html', 'css'])
