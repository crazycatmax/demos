define(["tools", "direction", "constant"], function (
  tools,
  directionAction,
  dataMap
) {
  const { judge, initial, start, myEquals, randomNext, display } = tools;
  const { keyboardMap } = dataMap;
  function $(selector) {
    return document.querySelector(selector);
  }
  function handlerEnter(e) {
    [".two", ".zero", ".four", ".eight"].forEach((selector, index) => {
      setTimeout(() => {
        $(selector).classList.add("animation");
      }, index * 100);
    });
  }
  function handlerLeave(e) {
    [".two", ".zero", ".four", ".eight"].forEach((selector) => {
      $(selector).classList.remove("animation");
    });
  }
  function init(game) {
    // 监听鼠标移入移除事件
    document.addEventListener("mouseenter", handlerEnter);
    document.addEventListener("mouseleave", handlerLeave);

    function directionHandler(direction) {
      directionAction[direction](game);
      judge(game);
      if (game.endflag) {
        initial(game);
        start(game);
        return;
      }
      if (!myEquals(game.p, game.previous)) {
        randomNext(game);
      }
      display(game);
    }

    //监听键盘事件
    document.addEventListener(
      "keyup",
      function (event) {
        switch (event.keyCode) {
          case keyboardMap.LEFT:
            directionHandler("left");
            break;
          case keyboardMap.UP:
            directionHandler("up");
            break;
          case keyboardMap.RIGHT:
            directionHandler("right");
            break;
          case keyboardMap.DOWN:
            directionHandler("down");
            break;
        }
      },
      false
    );
  }
  return {
    init,
  };
});
