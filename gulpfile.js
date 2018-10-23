const gulp = require('gulp')

gulp.task('css:compile', () => {
  return gulp.src('src/styles.css')
    .pipe(require('gulp-postcss')([
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', ['css:compile'])
