var app = app || {};

app.navigation = (function() {
	var pages = {};
	var currentPage = {};

	var init = function() {
		pages = getPages();
		showPage('home');
	};

	var getPages = function() {
		var allPages = {};
		var allPageElements = document.querySelectorAll('[page-id]');
		allPageElements.forEach(function(pageElement) {
			var pageId = pageElement.getAttribute('page-id');
			allPages[pageId] = pageElement;
		});
		return allPages;
	};

	var hidePage = function(pageId) {
		currentPage = null;
		pages[pageId].style.display = 'none';
	};

	var showPage = function(pageId) {
		currentPage = pages[pageId];
		currentPage.style.display = 'block';
	};

	init();

	return {
		goTo: function(pageId) {
			// hide current page

			// show page
		}
	};
})();