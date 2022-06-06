define({
	getStyle: function (obj, attr) {
		return window.getComputedStyle ? window.getComputedStyle(obj, null)[attr] : obj.currentStyle[attr];
	}
});