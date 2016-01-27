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
	plumber = require('gulp-plumber');

var Logging = require('gastropod/src/core/logging'),
	ErrorHandler = Logging.ErrorHandler,
	Logger = Logging.Logger;

/**
 * Exportable
 */
module.exports = function (gulp, gastro){
	/**
	 * Constants
	 */
	var Config = gastro.Config;

	var logger = new Logger('scripts:webpack'),
	var source = path.join(Config.source.root,
						   Config.source.scripts,
						   Config.filters.scripts.modules),
		target = path.join(Config.target.root,
						   Config.target.static,
						   Config.target.scripts),
		WebpackConfig = Config.plugins.js.webpack;

	gulp.task('webpack', function(done){

		debug('Starting');
		debug(' > source', source);
		debug(' > target', target);

		return gulp.src(source)
			.pipe(logger.incoming())
			.pipe(plumber(ErrorHandler('Webpack')))
			.pipe(named())
			.pipe(webpack(WebpackConfig))
			.pipe(logger.outgoing())
			.on('error', function handleError(err){ Logger.log(err); this.emit('end'); })
			.pipe(gulp.dest(target))
			.on('end', function(){ Logger.log("Finished"); })

	});

	debug('task registered');
}
