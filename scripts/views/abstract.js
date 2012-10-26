define(['util'], function(util) {

	'use strict';

	var View = function(){
		// Abstract
	};

	View.prototype = {

		/**
		 * Creates the container and compile the template
		 * @method init
		 * @param  {Object} options
		 * @param  {Object} options.element The DOM element that contains this view
		 * @param  {String} options.template The Handlebars template
		 * @param  {String} options.id The className that will be assigned to the container
		 */
		init: function(options){
			options||(options={});

			this.el = options.element || document.createElement('div');
			this.el.classList.add('view');
			this.el.classList.add(this.id);

			this.templateSrc = options.template || this.el.innerHTML;
			this.template = util.Handlebars.compile(this.templateSrc);
			this.states = options.states || [];

			// hidden at startup
			if (!options.show) this.el.classList.add('hidden');

			// apply template
			this.render();
		},

		/**
		 * Render the template and attach events (NOTE: would use delegation if too many!)
		 * @method render
		 * @param  {Object} data The data returned by the API
		 */
		render: function(data){

			this.data = data || {};
			this.el.innerHTML = this.template(this.data);
			this.attachEvents();

		},

		/**
		 * Bind event and view methods
		 * @method attachEvents
		 * @return {[type]}
		 */
		attachEvents: function(){
			// implement for each view
		},

		/**
		 * Returns the container element
		 * @method getElement
		 * @return {Object} The DOM element
		 */
		getElement: function(){
			return this.el;
		},

		/**
		 * Set the container display:none
		 * @method remove
		 */
		remove: function(){
			this.el.classList.add('removed');
		},

		/**
		 * Make the container visible (animated)
		 * @method show
		 */
		show: function(){
			this.el.classList.remove('hidden');
		},

		/**
		 * Make the container invisible and set display:none
		 * Trigger a callback once done animating
		 * @param  {Function} onTransitionEnd Function to call once animation is over
		 */
		hide: function(onTransitionEnd){

			var self = this;

			util.onTransitionEnd( this.el, function(){
				self.remove();
				onTransitionEnd && onTransitionEnd();
			});
			this.el.classList.add('hidden');

		}

	};

	return View;

});