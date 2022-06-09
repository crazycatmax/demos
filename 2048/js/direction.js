define([], function () {
  function left(game) {
    for (let i = 0; i < game.N; i++) {
      // 遍历每一行
      let count = 0;
      for (let j = 0; j < game.N - 1 - count; j++) {
        // 遍历前N列
        if (game.p[i][j] == 0) {
          // 排除空白格子s
          for (let k = j; k < game.N - 1 - count; k++) {
            game.p[i][k] = game.p[i][k + 1];
          }
          game.p[i][game.N - 1 - count] = 0;
          --j;
          ++count;
        } else {
          if (game.p[i][j] == game.p[i][j + 1]) {
            game.p[i][j] *= 2;
            game.score += game.p[i][j]; //加分
            for (let k = j + 1; k < game.N - 1 - count; k++) {
              game.p[i][k] = game.p[i][k + 1];
            }
            game.p[i][game.N - 1 - count] = 0;
          }
        }
      }
      for (let j = 0; j < game.N - 1; j++) {
        if (game.p[i][j] != 0 && game.p[i][j] == game.p[i][j + 1]) {
          //相邻的非零元素合并到一起，元素值加倍
          game.p[i][j] *= 2;
          game.score += game.p[i][j]; //加分
          for (let k = j + 1; k < game.N - 1 - count; k++) {
            game.p[i][k] = game.p[i][k + 1];
          }
          game.p[i][game.N - 1 - count] = 0;
          break;
        }
      }
    }
  }

  function up(game) {
    for (let j = 0; j < game.N; j++) {
      let count = 0;
      for (let i = 0; i < game.N - 1 - count; i++) {
        if (game.p[i][j] == 0) {
          for (let k = i; k < game.N - 1 - count; k++) {
            game.p[k][j] = game.p[k + 1][j];
          }
          game.p[game.N - 1 - count][j] = 0;
          --i;
          ++count;
        } else {
          if (game.p[i][j] == game.p[i + 1][j]) {
            game.p[i][j] *= 2;
            game.score += game.p[i][j];
            for (let k = i + 1; k < game.N - 1 - count; k++) {
              game.p[k][j] = game.p[k + 1][j];
            }
            game.p[game.N - 1 - count][j] = 0;
          }
        }
      }
      for (let i = 0; i < game.N - 1; i++) {
        if (game.p[i][j] != 0 && game.p[i][j] == game.p[i + 1][j]) {
          game.p[i][j] *= 2;
          game.score += game.p[i][j];
          for (let k = i + 1; k < game.N - 1 - count; k++) {
            game.p[k][j] = game.p[k + 1][j];
          }
          game.p[game.N - 1 - count][j] = 0;
          break;
        }
      }
    }
  }

  function down(game) {
    for (let j = 0; j < game.N; j++) {
      let count = 0;
      for (let i = game.N - 1; i > count; i--) {
        if (game.p[i][j] == 0) {
          for (let k = i; k > count; k--) {
            game.p[k][j] = game.p[k - 1][j];
          }
          game.p[count][j] = 0;
          ++i;
          ++count;
        } else {
          if (game.p[i][j] == game.p[i - 1][j]) {
            game.p[i][j] *= 2;
            game.score += game.p[i][j];
            for (let k = i - 1; k > count; k--) {
              game.p[k][j] = game.p[k - 1][j];
            }
            game.p[count][j] = 0;
          }
        }
      }
      for (let i = game.N - 1; i > 0; i--) {
        if (game.p[i][j] != 0 && game.p[i][j] == game.p[i - 1][j]) {
          game.p[i][j] *= 2;
          game.score += game.p[i][j];
          for (let k = i - 1; k > count; k--) {
            game.p[k][j] = game.p[k - 1][j];
          }
          game.p[count][j] = 0;
          break;
        }
      }
    }
  }

  function right(game) {
    for (let i = 0; i < game.N; i++) {
      let count = 0;
      for (let j = game.N - 1; j > count; j--) {
        if (game.p[i][j] == 0) {
          //
          for (let k = j; k > count; k--) {
            game.p[i][k] = game.p[i][k - 1];
          }
          game.p[i][count] = 0;
          ++j;
          ++count;
        } else {
          if (game.p[i][j] == game.p[i][j - 1]) {
            game.p[i][j] *= 2;
            game.score += game.p[i][j];
            for (let k = j - 1; k > count; k--) {
              game.p[i][k] = game.p[i][k - 1];
            }
            game.p[i][count] = 0;
          }
        }
      }
      for (let j = game.N - 1; j > 0; j--) {
        if (game.p[i][j] != 0 && game.p[i][j] == game.p[i][j - 1]) {
          game.p[i][j] *= 2;
          game.score += game.p[i][j];
          for (let k = j - 1; k > count; k--) {
            game.p[i][k] = game.p[i][k - 1];
          }
          game.p[i][count] = 0;
          break;
        }
      }
    }
  }

  return {
    left,
    right,
    up,
    down,
  };
});
