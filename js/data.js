var app = app || {};

app.data = (function() {

	var photoList = [
		{
			photoURL: 'https://placekitten.com/320/320',
			description: 'This is a very interesting description'
		},
		{
			photoURL: 'https://placekitten.com/320/320',
			description: 'This is a very interesting description'
		}
	];

	var onPhotoListChangeListeners = [];

	var notifyPhotoListChanged = function() {
		app.utils.array.forEach(onPhotoListChangeListeners, function(callback) {
			callback(photoList);
		});
	};

	return {
		getPhotoList: function() {
			return photoList;
		},
		addPhotoItem: function(photoItem) {
			photoList.push(photoItem);
			notifyPhotoListChanged();
		},
		onPhotoListChange: function(callback) {
			onPhotoListChangeListeners.push(callback);
		}
	};
})();