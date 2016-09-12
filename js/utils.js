var app = app || {};

app.utils = (function() {
	return {
		// Usage:
		// interpolate("I'm #age# years old!", { age: 29 });
		// interpolate("The #a# says #n#, #n#, #n#!", { a: 'cow', n: 'moo' });
		interpolate: function (string, object) {
    		return string.replace(/#([^#]*)#/g, function (match, key) {
            	var result = object[key];
            	return typeof result === 'string' || typeof result === 'number' ? result : match;
        	});
		},

		convertCamelToDash: function(string) {
			return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		},

		toJSON: function(string) {
			return string ? JSON.parse(string) : undefined;
		},

		element: {
			addClass: function(element, className) {
				if (!app.utils.element.hasClass(element, className)) {
					element.className += ' ' + className;
				}
			},

			hasClass: function(element, className) {
				var classList = element.className.split(' ');
				return app.utils.array.contains(classList, className);
			},

			closestElementByClass: function(element, className) {
				while(element = element.parentElement) {
					if (app.utils.element.hasClass(element, className)) {
						return element; 
					}
				}
			},

			addEventListener: function(element, event, listener) {
				if (element.addEventListener) {
					element.addEventListener(event, listener);
				} else if (element.attachEvent) {
					element.attachEvent('on' + event, listener);
				}
			},
			getData: function(element, key) {
				var value;
				if (element.dataset) {
					value = element.dataset[key];
				} else {
					value = element.getAttribute('data-' + app.utils.convertCamelToDash(key));
				}
				return app.utils.toJSON(value);
			},
			setData: function(element, key, value) {
				value = JSON.stringify(value);
				if (element.dataset) {
					element.dataset[key] = value;
				} else {
					return element.setAttribute('data-' + app.utils.convertCamelToDash(key), value);
				}
			}
		},

		array: {
			contains: function(array, element) {
				if (Array.prototype.indexOf) {
					return array.indexOf(element) !== -1;
				} else {
					for (var i = 0; i < array.length; i++) {
						if(array[i] === element) {
							return true; 
						}
					}
					return false;
				}
			},

			forEach: function(array, callback) {
				for (var i = 0; i < array.length; i++) {
					callback(array[i]);
				}
			}
		}
	};
})();