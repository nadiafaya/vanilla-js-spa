var app = app || {};

app.home = (function() {

	var photoListElement = document.querySelector('.photo-list');
	var photoCountElement = document.querySelector('.photo-count');

	var renderPhotoList = function() {
		clearPhotoList();
		photoList = app.data.getPhotoList();
		app.utils.array.forEach(photoList, renderPhotoItem);
	};

	var clearPhotoList = function() {
		photoListElement.innerHTML = '';
	};

	var renderPhotoItem = function(photoItem) {
		var photoItemView = app.views.getPhotoItemView(photoItem);
		photoListElement.appendChild(photoItemView);
	};

	var updatePhotoCount = function() {
		photoList = app.data.getPhotoList();
		photoCountElement.innerText = photoList.length;
	};

	var updateView = function() {
		renderPhotoList();
		updatePhotoCount();
	};

	return {
		init: function() {
			updateView();
			app.data.onPhotoListChange(updateView);
		}
	};
})();