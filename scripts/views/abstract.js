define(['util'], function(util) {

	'use strict';

	var View = function(){
		// Abstract
	};

	View.prototype = {

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

		render: function(data){

			this.model = data || {};
			this.el.innerHTML = this.template(this.model);
			this.attachEvents();

		},

		attachEvents: function(){
			// implement for each view
		},

		getElement: function(){
			return this.el;
		},

		remove: function(){
			this.el.classList.add('removed');
		},

		show: function(){
			this.el.classList.remove('hidden');
		},

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