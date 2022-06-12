define(["gamestate", "constant"], function (state, dataMap) {
  const { gamePause, gamePlaying, gameInit } = state;
  const { keyboardMap, modeMap, directionMap } = dataMap;

  function init(game) {
    document.addEventListener(
      "keydown",
      function (event) {
        event = event || window.event;
        const isNotAlive =
          !game.timerFlag &&
          event.keyCode != keyboardMap.P &&
          event.keyCode != keyboardMap.S &&
          event.keyCode != keyboardMap.E;
        if (isNotAlive) return;

        switch (event.keyCode) {
          case keyboardMap.RIGHT:
            if (game.snake.direction !== directionMap.LEFT)
              game.snake.direction = directionMap.RIGHT;
            break;
          case keyboardMap.LEFT:
            if (game.snake.direction !== directionMap.RIGHT)
              game.snake.direction = directionMap.LEFT;
            break;
          case keyboardMap.DOWN:
            if (game.snake.direction !== directionMap.UP)
              game.snake.direction = directionMap.DOWN;
            break;
          case keyboardMap.UP:
            if (game.snake.direction !== directionMap.DOWN)
              game.snake.direction = directionMap.UP;
            break;
          case keyboardMap.P:
            game.timerFlag ? gamePause(game) : gamePlaying(game);
            break;
          case keyboardMap.S:
            game.timerFlag || gamePlaying(game);
            break;
          case keyboardMap.E:
            gamePause(game) && gameInit(game);
            break;
          case keyboardMap.SPEED_UP:
            if (game.timerFlag && gamePause(game)) {
              game.timerDis = game.timerDis / 2;
              gamePlaying(game);
            }
            break;
          case keyboardMap.SLOW_DOWN:
            if (game.timerFlag && gamePause(game)) {
              game.timerDis = game.timerDis * 2;
              gamePlaying(game);
            }
            break;
          case keyboardMap.MODE_CHANGE:
            game.gameMode =
              game.gameMode == modeMap.NORMAL
                ? modeMap.FOOLISH
                : modeMap.NORMAL;
            game.mode.innerHTML = "mode: " + game.gameMode;
            break;
          default:
            console.log(event.keyCode);
        }
      },
      false
    );
  }
  return {
    init,
  };
});
