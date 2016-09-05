var app = app || {};

app.navigation = (function() {
	var pages = {};
	var currentPageId = '';

	var init = function() {
		pages = getPages();
		initNavLinks();
		showPage('home');
	};

	var getPages = function() {
		var allPages = {};
		var allPageElements = document.querySelectorAll('[page-id]');
		app.utils.array.forEach(allPageElements, function(pageElement) {
			var pageId = pageElement.getAttribute('page-id');
			allPages[pageId] = pageElement;
		});
		return allPages;
	};

	var initNavLinks = function() {
		var navLinks = document.querySelectorAll('[nav-link]');
		app.utils.array.forEach(navLinks, function(navLink){
			app.utils.element.addEventListener(navLink, 'click', navLinkClicked);
		});
	};

	var navLinkClicked = function(e) {
		var navToPageId = e.currentTarget.getAttribute('nav-link');
		app.navigation.goTo(navToPageId);
	};

	var hidePage = function(pageId) {
		currentPageId = '';
		pages[pageId].style.display = 'none';
	};

	var showPage = function(pageId) {
		currentPageId = pageId;
		pages[currentPageId].style.display = 'block';
	};

	init();

	return {
		goTo: function(pageId) {
			if (pageId) {
				// hide current page
				hidePage(currentPageId);
				// show page
				showPage(pageId);
			}
		}
	};
})();