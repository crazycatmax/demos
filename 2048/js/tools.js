define(function () {
  // 游戏启动
  function start(game) {
    game.endflag = false;
    randomNext(game);
    randomNext(game);
    display(game);
  }

  // 在随机位置生成2
  function randomNext(game) {
    let row, vol;
    let flag = false;
    while (!flag) {
      row = parseInt(Math.random() * game.N);
      vol = parseInt(Math.random() * game.N);
      if (game.p[row][vol] == 0) {
        game.p[row][vol] = 2;
        flag = true;
      }
    }
  }

  // 判断游戏是否结束，a:数组任何一个元素都非零 b:数组元素与相邻元素都不一样
  function judge(game) {
    let count = 0; // 零元素计数
    let flag = true; // 数组元素与相邻元素均不一样标志,默认为true
    for (let i = 0; i < game.N; i++) {
      for (let j = 0; j < game.N; j++) {
        if (game.p[i][j] == 0) {
          ++count;
        }
        if (true) {
          //判断是否与相邻元素不一样
          flag = i > 0 ? flag && game.p[i][j] != game.p[i - 1][j] : flag; // 与上边相邻元素相比
          flag =
            i < game.N - 1 ? flag && game.p[i][j] != game.p[i + 1][j] : flag; // 与下边相邻元素相比
          flag = j > 0 ? flag && game.p[i][j] != game.p[i][j - 1] : flag; // 与左边相邻元素相比
          flag =
            j < game.N - 1 ? flag && game.p[i][j] != game.p[i][j + 1] : flag; // 与右边相邻元素相比
        }
      }
    }
    if (count == 0 && flag) {
      if (game.recordFlag) {
        window.localStorage.setItem("record", game.record);
        window.localStorage.setItem("recordBy", game.recordBy);
      }

      let conf = confirm("game over, kidd! \n try again!"); //游戏结束
      game.endflag = conf;
    }
  }

  // 判断俩数组内容是否完全一致
  function myEquals(a, b) {
    let flag = true;
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] != b[i][j]) {
          flag = false;
          return flag;
        }
      }
    }
    return flag;
  }

  // 展示函数，将数组的元素值填入对应的方格标签
  function display(game) {
    // for (let i = 0; i < N; i++) {
    // 	for (let j = 0; j < N; j++) {
    // 		document.write(a[i][j] + "\t");
    // 		previous[i][j] = a[i][j];
    // 	}
    // 	document.write('<br>');
    // }
    for (let i = 0; i < game.N; i++) {
      // 将数组元素值写入标签，并变色
      for (let j = 0; j < game.N; j++) {
        handle(i, j, game);
      }
    }
    game.scoreText.innerHTML = "score: " + game.score; // 显示分数
    if (game.score >= game.record && !game.recordFlag) {
      // 如果破掉纪录
      game.recordFlag = true;
      game.recordBy = game.player;
      alert(
        "congratulations! \n you are making a new record! \n make it higher!"
      );
    }
    if (game.recordFlag) {
      game.record = game.score;
      game.recordText.innerHTML =
        "record: " + game.record + " by " + game.recordBy; // 显示纪录
    }

    // 保存当前数组至备份数组
    for (let i = 0; i < game.p.length; i++) {
      for (let j = 0; j < game.p[i].length; j++) {
        game.previous[i][j] = game.p[i][j];
      }
    }
  }

  // 根据行列号，将数组元素值写入标签,并改变颜色
  function handle(i, j, game) {
    game.box.children[i * game.N + j].innerHTML =
      game.p[i][j] == 0 ? "" : game.p[i][j];
    game.box.children[i * game.N + j].style.backgroundColor =
      game.colorMap[game.p[i][j]] || "black"; //设置颜色
  }

  return {
    start,
    randomNext,
    judge,
    myEquals,
    display,
    handle,
  };
});
