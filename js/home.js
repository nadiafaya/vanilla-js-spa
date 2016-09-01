var app = app || {};

app.home = (function() {

	var photoListElement = document.querySelector('.photo-list');

	var renderPhotoList = function() {
		clearPhotoList();
		photoList = app.data.getPhotoList();
		photoList.forEach(renderPhotoItem);
	};

	var clearPhotoList = function() {
		photoListElement.innerHTML = '';
	};

	var renderPhotoItem = function(photoItem) {
		var photoItemView = app.views.getPhotoItemView(photoItem);
		photoListElement.appendChild(photoItemView);
	};

	return {
		init: function() {
			renderPhotoList();
		}
	};
})();