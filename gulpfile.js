var gulp = require('gulp');
var less = require('gulp-less');


gulp.task('default', ['less']);

// Watch less files
gulp.task('watch', function() {
  gulp.watch('less/*.less', ['less']);
})

// Less compiling
gulp.task('less', function() {
  return gulp.src('less/*.less')
    .pipe(less({
      paths: ['bower_components/']
    }))
    .pipe(gulp.dest('css/'))
});


