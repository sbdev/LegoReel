define(['util', 'views/abstract', 'text!templates/lightbox.html'],function(util, Abstract, template) {

	'use strict';

	var View = function(){
		this.init({
			template: template,
			states: ['loading']
		});
	};

	View.prototype = Object.create( Abstract.prototype );

	util.extend(View.prototype, {

		id: 'lightbox',

		render: function(data){

			var self = this;

			Abstract.prototype.render.call(this, data);
			if (!data) return;

			this.itemElements || (this.itemElements = this.el.getElementsByTagName('li'));
			this.currentIdx || (this.currentIdx = 0);

			var i = 0;
			data.photoset.photo.forEach(function(photo){
				// preload each photo in the set
				var img = new Image();
				img.onload = (function(idx){
					// set container LI to 'ready' once image is cached
					return function(){
						// add a random delay just to show the loading icon
						var delay = 5000 * Math.random() | 0;
						console.warn('artificial delay for img #' + idx, delay);
						setTimeout( function(){
							self.itemElements[idx].classList.add('ready');
						}, delay );
					};
				})(i++);
				img.src = photo.url;
			});

		},

		attachEvents: function(){

			this.el.querySelector('#prev').addEventListener('click', this.prev.bind(this) );
			this.el.querySelector('#next').addEventListener('click', this.next.bind(this) );

		},

		prev: function(){

			if (!this.itemElements.length) return;
			if (!this.currentIdx) this.currentIdx = this.itemElements.length - 1;

			this.currentIdx = (this.currentIdx - 1) % this.itemElements.length;
			var liElement = this.itemElements[ this.currentIdx ];

			liElement.offsetParent.style.left = (-1 * this.currentIdx * liElement.offsetWidth) + 'px';

		},

		next: function(){

			if (!this.itemElements.length) return;

			this.currentIdx = (this.currentIdx + 1) % this.itemElements.length;
			var liElement = this.itemElements[ this.currentIdx ];

			liElement.offsetParent.style.left = (-1 * this.currentIdx * liElement.offsetWidth) + 'px';

		}

	});


	/*
	var i = 0;
	var preCaching = function(){
		if (++i === data.photoset.photo.length) onSuccess();
	};
		photo.img = new Image();
		photo.img.onload = preCaching;
		photo.img.src = photo.url;
	*/


	return View;

});