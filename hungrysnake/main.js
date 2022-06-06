require.config({
	baseUrl: 'js',
	paths: {}
});

require(['start', 'listen'], function (start, listen) {
	let o = {};

	start.init(o); //初始化游戏

	listen.init(o); //添加键盘鼠标事件

});