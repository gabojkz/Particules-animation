'use strict';

var gulp        = require('gulp'),
	pages		= require('gulp-gh-pages');

	gulp.task('build', function(){
		return gulp.src(['index.html', 'app.js', 'style.css'], {base:'./'})
		.pipe(gulp.dest('dist'));//send the files to dist
	});

	gulp.task('deploy',['build'], function(){
		return gulp.src("./dist/**/*")
		.pipe(pages());
	})