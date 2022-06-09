//配置文件
require.config({
	baseUrl: 'js'
});

require(['monitor', 'tools', 'start'], function (monitor, tools, start) {
	const game = {};

	//初始化游戏
	start.init(game);

	//监听键盘鼠标
	monitor.init(game);

	//启动游戏
	tools.start(game);
})