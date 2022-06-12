define(["tools"], function (tools) {
  const { getStyle } = tools;

  // 游戏是否结束
  function over(game) {
    return whetherCrashSelf(game) || whetherCrashBoundry(game);
  }

  // 头部是否碰撞自己
  function whetherCrashSelf(game) {
    const { parts } = game.snake;
    const snakeHead = parts[0];
    let flag = false; // 默认没有碰撞自己
    for (const part of parts.slice(1)) {
      const horizontalCrashed = snakeHead.style.left === part.style.left;
      const verticalCrashed = snakeHead.style.top === part.style.top;
      if (horizontalCrashed && verticalCrashed) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  // 头部是否出界
  function whetherCrashBoundry(game) {
    let flag = false; // 默认未出界
    const headPos = {
      leftMin: 0,
      topMin: 0,
      leftMax: game.box.offsetWidth - game.snake.width,
      topMax: game.box.offsetHeight - game.snake.width,
    };
    const snakeHead = game.snake.parts[0];
    const crashBoundary = {
      right: parseInt(getStyle(snakeHead, "left")) > headPos.leftMax,
      left: parseInt(getStyle(snakeHead, "left")) < headPos.leftMin,
      down: parseInt(getStyle(snakeHead, "top")) > headPos.topMax,
      up: parseInt(getStyle(snakeHead, "top")) < headPos.topMin,
    };
    const crashed =
      crashBoundary.right ||
      crashBoundary.left ||
      crashBoundary.down ||
      crashBoundary.up;
    if (crashed) flag = true;
    return flag;
  }
  return {
    over,
  };
});
