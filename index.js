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
<<<<<<< HEAD
	named = require('vinyl-named'),
	plumber = require('gulp-plumber');
=======
	accept = require('check-args'),
	// logging = require('gastropod').Logging
	named = require('vinyl-named');
>>>>>>> develop

var Logging = require('gastropod/src/core/logging'),
	ErrorHandler = Logging.ErrorHandler,
	Logger = Logging.Logger;

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

<<<<<<< HEAD
	var logger = new Logger('scripts:webpack'),
	var source = path.join(Config.source.root,
=======
		source = buildPath(Config.source.root,
>>>>>>> develop
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
			.pipe(logger.incoming())
			.pipe(plumber(ErrorHandler('Webpack')))
			.pipe(named())
			// .pipe(logger.incoming())
			// .pipe(plumber(logging.ErrorHandler('JS:Webpack')))
			.pipe(webpack(WebpackConfig))
<<<<<<< HEAD
			.pipe(logger.outgoing())
			.on('error', function handleError(err){ Logger.log(err); this.emit('end'); })
			.pipe(gulp.dest(target))
			.on('end', function(){ Logger.log("Finished"); })
=======
			// .pipe(logger.outgoing())
			.pipe(gulp.dest(target));
>>>>>>> develop

	});

	debug('task registered');
}
