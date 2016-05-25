'use strict';
/**
 * System
 */
var path = require('path');

/**
 * Framework
 */
var webpack = require('webpack-stream'),
	debug = require('debug')('gastropod/addons/tasks/webpack'),
	named = require('vinyl-named'),
	accept = require('check-args'),
	plumber = require('gulp-plumber');

var Logging = require('gastropod').Logging,
	Config = require('gastropod/src/config'),
	Manifest = require('gastropod/src/core/assets/manifest'),
	logger = new Logging.Logger('Webpack'),
	ErrorHandler = new Logging.ErrorHandler('Webpack');

var buildPath = accept(String, String, String)
				.to(function(root, staticRoot, section){
					return path.join(root,
									 staticRoot,
									 section);
				});

/**
  * Project
  */
var DEFAULT_CONFIG = {};


/**
 * Exportable
 */
module.exports = function (gulp) {
	/**
	 * Constants
	 */
	var source = buildPath(Config.Store.source.root,
						   Config.Store.source.scripts,
						   Config.Store.filters.scripts.modules),

		target = buildPath(Config.Store.target.root,
						   Config.Store.target.static,
						   Config.Store.target.scripts),

		WebpackConfig = Config.Store.plugins.js.webpack || DEFAULT_CONFIG;

	gulp.task('webpack', function(done){

		debug('Starting');
		debug(' > source', source);
		debug(' > target', target);

		return gulp.src(source)
			.pipe(logger.incoming())
			.pipe(plumber(ErrorHandler))
			.pipe(named())
			.pipe(webpack(WebpackConfig))
			.pipe(gulp.dest(target))
			.pipe(logger.outgoing())

	});

	debug('task registered');
}
