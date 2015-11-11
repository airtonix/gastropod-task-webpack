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
	named = require('vinyl-named');


/**
 * Exportable
 */
module.exports = function (gulp, gastro){
	/**
	 * Constants
	 */
	var Config = gastro.Config;

	// var logger = new Logger('scripts:browserify'),
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
			.pipe(named())
			.pipe(webpack(WebpackConfig))
			.pipe(gulp.dest(target));

	});

	debug('task registered');
}
