var app = app || {};

app.navigation = (function() {
	var pages = {};
	var currentPageId = '';
	var onPageChangeListeners = {};

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

	var initNavLinks = function(element) {
		var navLinks = (element || document).querySelectorAll('[nav-link]');
		app.utils.array.forEach(navLinks, function(navLink){
			app.utils.element.addEventListener(navLink, 'click', navLinkClicked);
		});
	};

	var navLinkClicked = function(e) {
		var navPageId = e.currentTarget.getAttribute('nav-link');
		var navPageParam = app.utils.toJSON(e.currentTarget.getAttribute('nav-link-param'));
		app.navigation.goTo(navPageId, navPageParam);
	};

	var hidePage = function(pageId) {
		currentPageId = '';
		pages[pageId].style.display = 'none';
		setPageParams(pageId, {});
	};

	var showPage = function(pageId, pageParams) {
		currentPageId = pageId;
		pages[currentPageId].style.display = 'block';
		setPageParams(currentPageId, pageParams);
		notifyPageChanged(currentPageId);
	};

	var notifyPageChanged = function(pageId) {
		if (onPageChangeListeners[pageId]) {
			app.utils.array.forEach(onPageChangeListeners[pageId], function(callback) {
				callback(pageId, getPageParams(pageId));
			});
		}
	};

	var setPageParams = function(pageId, pageParams) {
		if (pageParams) {
			app.utils.element.setData(pages[pageId], 'pageParams', pageParams);
		}
	};

	var getPageParams = function(pageId) {
		return app.utils.element.getData(pages[pageId], 'pageParams');
	};

	init();

	return {
		initNavLinks: initNavLinks,
		goTo: function(pageId, pageParams) {
			if (pageId) {
				// hide current page
				hidePage(currentPageId);
				// show page
				showPage(pageId, pageParams);
			}
		},
		onPageChange: function(pageId, callback) {
			onPageChangeListeners[pageId] = onPageChangeListeners[pageId] || [];
			onPageChangeListeners[pageId].push(callback);
		}
	};
})();