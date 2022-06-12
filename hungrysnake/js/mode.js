define(["tools"], function (tools) {
  const { getStyle, setLeft, setTop } = tools;
  
  // 傻瓜模式,无边界,可以碰自己
  function foolMode(game) {
    const snakeHead = game.snake.parts[0];
    const headPos = {
      leftMin: 0,
      topMin: 0,
      leftMax: game.box.offsetWidth - game.snake.width,
      topMax: game.box.offsetHeight - game.snake.width,
      left: parseInt(getStyle(snakeHead, "left")),
      top: parseInt(getStyle(snakeHead, "top")),
    };
    const crashAction = {
      right: headPos.left > headPos.leftMax, // 碰右边界,
      left: headPos.left < headPos.leftMin, // 碰左边界,
      down: headPos.top > headPos.topMax, // 碰下边界,
      up: headPos.top < headPos.topMin, // 碰上边界,
    };
    if (crashAction.right) {
      setLeft(snakeHead, headPos.leftMin);
      return;
    }
    if (crashAction.left) {
      setLeft(snakeHead, headPos.leftMax);
      return;
    }
    if (crashAction.down) {
      setTop(snakeHead, headPos.topMin);
      return;
    }
    if (crashAction.up) {
      setTop(snakeHead, headPos.topMax);
      return;
    }
  }
  return {
    foolMode,
  };
});
