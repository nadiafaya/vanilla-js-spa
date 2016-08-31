var home = (function() {

	var photoListElement = document.querySelector('.photo-list');

	var renderPhotoList = function() {
		clearPhotoList();
		photoList = data.getPhotoList();
		photoList.forEach(renderPhotoItem);
	};

	var clearPhotoList = function() {
		photoListElement.innerHTML = '';
	};

	var renderPhotoItem = function(photoItem) {
		var photoItemView = views.getPhotoItemView(photoItem);
		photoListElement.appendChild(photoItemView);
	};

	return {
		init: function() {
			renderPhotoList();
		}
	};
})();