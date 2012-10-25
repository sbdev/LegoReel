
define(['util', 'api', 'views/loading', 'views/lightbox'], function(util, api, Loading, Lightbox) {

	'use strict';

	/**
	 * App
	 * @class
	 * @constructor
	 */
	var App = function(){
		this.init();
	};

	App.prototype = {

		/**
		 * create instances of the views, bind events
		 * @method init
		 */
		init: function() {

			this.views = {
				lightbox: new Lightbox(),
				loading: new Loading(),
			};

		},

		/**
		 * Wrap loading view, attach main view to DOM, start the app
		 * Dom is ready at this point.
		 * @method run
		 * @param  {Object} el The DOM element where app lives
		 */
		run: function(el){
			var self = this;

			// wrap the static loading screen into a View object
			this.views.loading.init({
				element: el.getElementsByClassName('loading')[0]
			});

			// go live
			el.appendChild( self.views.lightbox.getElement() );

			self.reset();


		},

		/**
		 * populate/refresh the main view
		 * @method reset
		 */
		reset: function() {

			var self = this;

			// show (or keep showing) spinner
			this.views.loading.show();

			api.getPhotoSet({

				// random photoSet and page (Legos!!!)
				id: '72157603923921085',
				page: 14

			}, function( data ){

				// as the AJAX data comes back prepare the main view
				self.views.lightbox.render( data );

				// hide loading screen
				self.views.loading.hide( function(){
					self.views.lightbox.show();
				});

			});


		}

	};

	return App;

});