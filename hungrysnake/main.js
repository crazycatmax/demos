require.config({
  baseUrl: "js",
  paths: {},
});

require(["start", "monitor"], function (start, monitor) {
  const game = {};

  start.init(game); //初始化游戏

  monitor.init(game); //添加键盘鼠标事件
});
