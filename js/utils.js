var app = app || {};

app.utils = (function() {
	return {
		// Usage:
		// alert("I'm {age} years old!".supplant({ age: 29 }));
		// alert("The {a} says {n}, {n}, {n}!".supplant({ a: 'cow', n: 'moo' }));
		interpolate: function (s, o) {
    		return s.replace(/{([^{}]*)}/g, function (a, b) {
            	var r = o[b];
            	return typeof r === 'string' || typeof r === 'number' ? r : a;
        	});
		}
	};
})();