
define(['vendor/handlebars.amd'], function(Handlebars) {

	'use strict';

	/**
	 * usefull stuff
	 * @static
	 */
	var util = {

		Handlebars: Handlebars,

		extend: function(obj) {
		
			Array.prototype.slice.call(arguments, 1).forEach( function(source) {
				if (!source) return;
				for (var attr in source) {
					obj[attr] = source[attr];
				}
			});
	
			return obj;			
		},

		onTransitionEnd: function(el, callback){

			var eventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			};
			
			// tweak Modernizr prefix to match vendor transitionEnd name
			var eventName = eventNames[ Modernizr.prefixed('transition') ];
			var onEnd = function(){
				el.removeEventListener(eventName, onEnd);
				callback();
			};
			el.addEventListener( eventName, onEnd);
		}

	};

	return util;

});