/**
 * LegoReel
 * @author  Stefano Bertacchi <stefano@touristway.com>
 */

(function(){

	'use strict';

	/**
	 * configure module loader
	 * text.js is required to load HTML templates as modules in this exercise
	 * templates will go through Handlebars compiler and become AMD modules
	 * all dependencies will go through RequireJS Optimizer for concat/minification
	 */
	require.config({
		baseUrl: './scripts',
		paths: {
			// base folder is /scripts
			text: 'vendor/text',
			templates: '../templates',
			views: 'views'
		}
	});

	/**
	 * track DOMContentLoaded as main.js is the only 
	 * synchronous resource around here
	 */
	var domReady = false;
	document.addEventListener('DOMContentLoaded',function(){
		domReady = true;
	});

	require(['app'], function(App) {

		var app = new App();

		var start = function() {
			// html comes with a loading screen that is being displayed until now
			var container = document.getElementsByClassName('container')[0];
			app.run( container );
		};

		if (domReady) return start();
		document.addEventListener( 'DOMContentLoaded', start );

	});

})();