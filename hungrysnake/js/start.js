define(["tools", "constant", "gameover", "gamestate", "mode"], function (
  tools,
  dataMap,
  gameover,
  state,
  mode
) {
  const { $, getStyle, setLeft, setTop } = tools;
  const { gamePause, gameInit, foodRandom } = state;
  const { modeMap, directionMap } = dataMap;

  function init(game) {
    game.box = $(".box"); // 游戏区域
    game.head = $(".head"); // 蛇头
    game.mode = $(".mode"); // 模式信息
    game.foodInit = $(".food"); // 初始食物
    game.foodNow = game.foodInit; // 当前食物对象
    game.timer = null; // 定时器
    game.timerFlag = false; // 定时器标识符
    game.timerDis = 200; // 定时器间隔
    game.gameMode = modeMap.NORMAL; // 游戏模式 normal/foolish
    game.snake = {
      width: game.head.offsetWidth, // 身体格子宽度
      name: "Tommy", // 名字
      head: game.head, // 蛇头
      parts: [game.head], // 蛇身体格子数组
      direction: directionMap.LEFT, // 蛇头朝向
      lastFoot: {
        x: 0,
        y: 0,
      },
      // 向前移动一步
      move: function () {
        let i = 0;

        // 保存蛇尾巴的位置,如果蛇吃到食物，则食物添加到此位置
        const snakeTail = this.parts[this.parts.length - 1];
        this.lastFoot.x = getStyle(snakeTail, "left");
        this.lastFoot.y = getStyle(snakeTail, "top");

        // 移动蛇的身体，每一段的位置都是它前一段上次的位置
        for (i = this.parts.length - 1; i > 0; i--) {
          setLeft(this.parts[i], parseInt(getStyle(this.parts[i - 1], "left")));
          setTop(this.parts[i], parseInt(getStyle(this.parts[i - 1], "top")));
        }

        // 根据方向移动蛇头
        switch (this.direction) {
          case directionMap.RIGHT:
            setLeft(
              game.head,
              parseInt(getStyle(game.head, "left")) + this.width
            );
            break;
          case directionMap.LEFT:
            setLeft(
              game.head,
              parseInt(getStyle(game.head, "left")) - this.width
            );
            break;
          case directionMap.DOWN:
            setTop(
              game.head,
              parseInt(getStyle(game.head, "top")) + this.width
            );
            break;
          case directionMap.UP:
            setTop(
              game.head,
              parseInt(getStyle(game.head, "top")) - this.width
            );
            break;
          default:
        }

        switch (game.gameMode) {
          case "normal":
            // 游戏结束条件判断 => a.撞边界 b.撞自己
            if (gameover.over(game)) {
              alert("gameover!\n kid!\n try it again!");
              gamePause(game) && gameInit(game);
            }
            break;
          case "foolish":
            // 傻瓜模式,无边界,可以撞自己
            mode.foolMode(game);
            break;
          default:
        }

        // 遇食则怼
        this.eat(game.foodNow);
      },

      // 蛇吃到食物,身体增长一格,化食物为身体
      eat: function (food) {
        const headOnFood =
          getStyle(this.head, "left") == getStyle(food, "left") &&
          getStyle(this.head, "top") == getStyle(food, "top");
        if (headOnFood) {
          this.parts.push(food);
          setLeft(food, this.lastFoot.x);
          setLeft(food, this.lastFoot.y);
          game.foodNow = foodRandom(game);
        }
      },
    };
  }

  return {
    init,
  };
});
