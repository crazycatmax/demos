define(["tools", "direction"], function (tools, dirt) {
  const keyboardMap = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };
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
      dirt[direction](game);
      tools.judge(game);
      if (game.endflag) {
        tools.initial(game);
        tools.start(game);
        return;
      }
      if (!tools.myEquals(game.p, game.previous)) {
        tools.randomNext(game);
      }
      tools.display(game);
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
