var app = app || {};

(function() {

	var invalidFields = [];
	var form = document.querySelector('[page-id="photo-form"] form');
	var formFields = {
		file: form.querySelector('#file'),
		description: form.querySelector('#description')
	};

	var init = function() {
		app.utils.element.addEventListener(form, 'submit', onSubmit);
		app.navigation.onPageChange('photo-form', pageChanged);
	};

	var onSubmit = function(event) {
		event.preventDefault();

		if (formIsValid()) {
			savePhoto();
		} else {
			showErrors();
		}
	};

	var pageChanged = function(pageId, pageParams) {
		if (pageParams) {
			setPhotoItem(pageParams);
		}
	};

	var formIsValid = function() {
		invalidFields = form.querySelectorAll('.form-control:invalid');
		return !invalidFields.length;
	};

	var savePhoto = function() {
		app.data.savePhotoItem(getPhotoItem());
		app.navigation.goTo('home');
		clearForm();
	};

	var showErrors = function() {
		app.utils.array.forEach(invalidFields, function(invalidField) {
			var formGroup = app.utils.element.closestElementByClass(invalidField, 'form-group');
			app.utils.element.addClass(formGroup, 'has-error');
		});
	};

	var getPhotoItem = function() {
		return {
			photoURL: formFields.file.value,
			description: formFields.description.value
		};
	};

	var setPhotoItem = function(photoItem) {
		formFields.file.value = photoItem.photoURL || "";
		formFields.description.value = photoItem.description || "";
	};

	var clearForm = function() {
		for (var field in formFields){
			formFields[field].value = '';
		}
	};

	init();

})();