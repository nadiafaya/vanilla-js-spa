var app = app || {};

(function() {

	var invalidFields = [];
	var form = document.querySelector('[page-id="add-photo"] form');
	var formFields = {
		file: form.querySelector('#file'),
		description: form.querySelector('#description')
	};

	app.utils.element.addEventListener(form, 'submit', function(event) {
		event.preventDefault();

		if (formIsValid()) {
			addPhoto();
		} else {
			showErrors();
		}
	});

	var formIsValid = function() {
		invalidFields = form.querySelectorAll('.form-control:invalid');
		return !invalidFields.length;
	};

	var addPhoto = function() {
		app.data.addPhotoItem(getPhotoItem());
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

	var clearForm = function() {
		for (var field in formFields){
			formFields[field].value = '';
		}
	};

})();