define({
  $: function (selector) {
    return document.querySelector(selector);
  },
  getStyle: function (obj, attr) {
    return window.getComputedStyle
      ? window.getComputedStyle(obj, null)[attr]
      : obj.currentStyle[attr];
  },
  setStyle: function (dom, attr, val) {
    dom.style[attr] = val;
  },
  setLeft: function (dom, pixel) {
    dom.style.left = pixel === "" ? "" : pixel + "px";
  },
  setTop: function (dom, pixel) {
    dom.style.top = pixel === "" ? "" : pixel + "px";
  },
});
