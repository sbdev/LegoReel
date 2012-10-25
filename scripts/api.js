
define(['util'], function(util) {

	'use strict';

	/**
	http://api.flickr.com/services/rest/?
	method=flickr.photosets.getPhotos&
	api_key=f38f22bdf3850cabe0fc79a88aff214e&
	photoset_id=72157627991527122&
	format=json&
	nojsoncallback=1"
	per_page (Optional)
	page (Optional)
	media
	*/

	var apiKey = '5b7ed26a7c0c3b67e3a1a28c141c5c19';

	var api = {

		endPoint: 'http://api.flickr.com/services/rest/',

		send: function(method, params, onSuccess, onError) {

			params = util.extend({
				api_key: apiKey,
				method: method,
				format: 'json',
				per_page: 10,
				page: 1,
				media: 'photos',
				nojsoncallback: 1,
			}, params);

			var client = new XMLHttpRequest();

			client.onerror = function() {
				onError && onError( new Error( client.statusText || 'Network error' ) );
			};
			client.onload = function() {
				try {
					// client.status === 0 is actually valid (XHR bug)
					if (client.status && client.status !== 200) return this.onerror();
					var content = client.responseText;
				} catch(e) {
					return this.onerror();
				}
				onSuccess( JSON.parse(content) );
			};

			// compose query string
			var query = Object.keys(params).map(function(k){
				return k + '=' + encodeURIComponent(params[k]);
			}).join('&');

			client.open('GET', this.endPoint + '?' + query, true);
			client.send();

		},

		getPhotoSet: function(filter, onSuccess, onError) {

			this.send('flickr.photosets.getPhotos', {

				photoset_id: filter.id,
				page: filter.page || 1

			}, function(data){

				data.photoset.photo.forEach( function(photo){
					// i.e. http://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg
					photo.url = 'http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_b.jpg';
					photo.url = photo.url.replace('{farm}',photo.farm);
					photo.url = photo.url.replace('{server}',photo.server);
					photo.url = photo.url.replace('{id}',photo.id);
					photo.url = photo.url.replace('{secret}',photo.secret);
					photo.ownername = data.photoset.ownername; //Handlebars backtracking has issues
				});

				onSuccess(data);
				
			}, onError);

		}

	};

	return api;

});