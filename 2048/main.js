//配置文件
require.config({
	baseUrl:'js'
});

require(['listen','tools','start'],function(listen,tools,start){
	var game={};

	//初始化游戏
	start.init(game);

	//监听键盘鼠标
	listen.init(game);

	//启动游戏
	tools.start(game);
})