define({
  keyboardMap: Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  }),
  directionMap: Object.freeze({
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
  }),
  // 格子颜色集合
  colorMap: Object.freeze({
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
  }),
});
