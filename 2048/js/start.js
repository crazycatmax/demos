define([], function () {
  // 格子颜色集合
  const colorMap = {
    0: "rgb(255, 255, 255)",
    2: "rgb(255, 255, 153)",
    4: "rgb(255, 204, 102)",
    8: "rgb(255, 153, 51)",
    16: "rgb(255, 102, 0)",
    32: "rgb(255, 51, 0)",
    64: "rgb(255, 0, 0)",
    128: "rgb(255, 100, 0)",
    256: "rgb(255, 200, 0)",
    512: "rgb(255, 250, 0)",
    1024: "rgb(200, 250, 0)",
    2048: "rgb(150, 250, 0)",
    4096: "rgb(100, 250, 0)",
    8192: "rgb(50, 250, 0)",
    16384: "rgb(0, 250, 0)",
    32768: "rgb(0, 255, 0)",
    65536: "rgb(0, 0, 0)",
  };

  const defaultPlayer = "gl",
    defaultN = 4,
    defaultScore = 0;

  function $(selector) {
    return document.querySelector(selector);
  }

  function emptyGrid() {
    return [[], [], [], []];
  }

  // 初始化格子
  function initGrid(game) {
    for (let i = 0; i < game.N; i++) {
      for (let j = 0; j < game.N; j++) {
        game.p[i][j] = 0;
        game.previous[i][j] = 0;
      }
    }
  }

  //   初始化游戏
  function init(game) {
    game.box = $(".box"); // 父盒子
    game.scoreText = $(".score"); // 得分标签
    game.recordText = $(".record"); // 纪录标签
    game.playerText = $(".player"); // 玩家标签
    game.score = defaultScore; //得分
    game.record = defaultScore; // 纪录
    game.recordFlag = false; // 是否处于新纪录中
    game.recordBy = defaultPlayer;
    game.player = defaultPlayer;
    game.N = defaultN; // 4*4游戏，行数和列数
    game.p = emptyGrid(); // 二维数组,存储16个小格子的上的数字
    game.previous = emptyGrid(); // 小格子的上数字的备份,用来判断是否需要生成下一个随机2
    game.endflag = true; // 游戏结束标志,默认为true
    game.colorMap = colorMap; // 颜色集合,以橙色为主

    // 载入纪录
    game.record = localStorage.getItem("record");
    game.recordBy = localStorage.getItem("recordBy");
    game.recordText.innerHTML =
      "record: " + game.record + " by " + game.recordBy; // 显示纪录

    // 输入玩家姓名
    game.player = prompt("请输入玩家名称,确保破纪录时榜上有名！");
    game.playerText.innerHTML = "player: " + game.player;

    initGrid(game);
  }

  return {
    init,
  };
});
