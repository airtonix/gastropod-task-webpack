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
	accept = require('check-args'),
	// logging = require('gastropod').Logging
	named = require('vinyl-named');


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
module.exports = function (gulp, gastro){
	/**
	 * Constants
	 */
	var Config = gastro.Config,
		// logger = new logging.Logger('css:scss'),

		source = buildPath(Config.source.root,
						   Config.source.scripts,
						   Config.filters.scripts.modules),

		target = buildPath(Config.target.root,
						   Config.target.static,
						   Config.target.scripts),

		WebpackConfig = Config.plugins.js.webpack || DEFAULT_CONFIG;

	gulp.task('webpack', function(done){

		debug('Starting');
		debug(' > source', source);
		debug(' > target', target);

		return gulp.src(source)
			.pipe(named())
			// .pipe(logger.incoming())
			// .pipe(plumber(logging.ErrorHandler('JS:Webpack')))
			.pipe(webpack(WebpackConfig))
			// .pipe(logger.outgoing())
			.pipe(gulp.dest(target));

	});

	debug('task registered');
}
