const gulp = require('gulp')
const run = require('gulp-run-command').default

/**
 * HTML Compilation & Cleanup
 */
gulp.task('html:compile', run('eleventy'))

gulp.task('html', ['html:compile'])

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

gulp.task('css', ['css:compile', 'css:purge'])

/**
 * Default (all tasks)
 */
gulp.task('default', ['html', 'css'])
