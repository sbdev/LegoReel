define(['util',	'views/abstract'], function(util, Abstract, template) {

	'use strict';

	var View = function(){
		// no initialization, reuse the static html embedded in index.html
	};

	View.prototype = Object.create( Abstract.prototype );

	View.prototype.id = 'loading';

	return View;

});