var views = (function() {
	
	var photoItemViewTemplate = document.querySelector('#photoItemView');

	return {
		getPhotoItemView: function(photoItem) {
			var templateHTML = photoItemViewTemplate.innerHTML;
			var interpolatedHTML = utils.interpolate(templateHTML, photoItem);
			var newElement = document.createElement('div');
			newElement.innerHTML = interpolatedHTML;
			return newElement.children[0]
		}
	};
})();