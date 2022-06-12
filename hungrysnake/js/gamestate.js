define(["tools", "constant"], function (tools, dataMap) {
  const { setLeft, setTop, setStyle } = tools;
  const { directionMap } = dataMap;

  // 游戏运行
  function gamePlaying(game) {
    game.timerFlag = true;
    game.timer = setInterval(function () {
      game.snake.move();
    }, game.timerDis);
    game.head.classList.remove("animation");
    return true;
  }

  // 游戏暂停
  function gamePause(game) {
    game.timerFlag = false;
    clearInterval(game.timer);
    game.head.classList.add("animation");
    return true;
  }

  // 游戏初始化
  function gameInit(game) {
    // 还原蛇头位置
    setLeft(game.head, "");
    setTop(game.head, "");

    // 还原首个食物位置
    setLeft(game.foodInit, "");
    setTop(game.foodInit, "");

    // 还原蛇运动方向
    game.snake.direction = directionMap.LEFT;

    // 定时器间隔还原
    game.timerDis = 200;

    // 当前食物指向首个食物
    game.foodNow = game.foodInit;

    // 删除蛇身体只保留头部
    game.snake.parts.length = 1;
    for (let i = game.box.children.length - 1; i > 1; i--) {
      game.box.removeChild(game.box.children[i]);
    }
    return true;
  }

  // 随机生成食物  盒子宽高 => 600*400  食物宽高 => 20
  function foodRandom(game) {
    const leftRand =
      parseInt(Math.random() * (game.box.offsetWidth / game.snake.width)) *
      game.snake.width;
    const topRand =
      parseInt(Math.random() * (game.box.offsetHeight / game.snake.width)) *
      game.snake.width;
    const newFood = game.foodInit.cloneNode();
    setLeft(newFood, leftRand);
    setTop(newFood, topRand);
    setStyle(newFood, "opacity", 1 - game.snake.parts.length / 100);
    game.box.appendChild(newFood);
    return newFood;
  }

  return {
    gamePlaying,
    gamePause,
    gameInit,
    foodRandom,
  };
});
