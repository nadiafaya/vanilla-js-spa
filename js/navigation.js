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
		allPageElements.forEach(function(pageElement) {
			var pageId = pageElement.getAttribute('page-id');
			allPages[pageId] = pageElement;
		});
		return allPages;
	};

	var initNavLinks = function() {
		var navLinks = document.querySelectorAll('[nav-link]');
		navLinks.forEach(function(navLink){
			navLink.addEventListener('click', navLinkClicked);
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