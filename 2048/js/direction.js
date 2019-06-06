// var break
define([],function(){
	function left(obj) {
		for (var i = 0; i < obj.N; i++) { // 遍历每一行
			var count = 0;
			for (var j = 0; j < obj.N - 1 - count; j++) { // 遍历前三列
				if (obj.p[i][j] == 0) { // 排除空白格子s
					for (var k = j; k < obj.N - 1 - count; k++) {
						obj.p[i][k] = obj.p[i][k + 1];
					}
					obj.p[i][obj.N - 1 - count] = 0;
					--j;
					++count;
				} else {
					if (obj.p[i][j] == obj.p[i][j + 1]) {
						obj.p[i][j] *= 2;
						obj.score += obj.p[i][j]; //加分
						for (var k = j + 1; k < obj.N - 1 - count; k++) {
							obj.p[i][k] = obj.p[i][k + 1];
						}
						obj.p[i][obj.N - 1 - count] = 0;
					}
				}
			}
			for (var j = 0; j < obj.N - 1; j++) {
				if (obj.p[i][j] != 0 && obj.p[i][j] == obj.p[i][j + 1]) { //相邻的非零元素合并到一起，元素值加倍
					obj.p[i][j] *= 2;
					obj.score += obj.p[i][j]; //加分
					for (var k = j + 1; k < obj.N - 1 - count; k++) {
						obj.p[i][k] = obj.p[i][k + 1];
					}
					obj.p[i][obj.N - 1 - count] = 0;
					break;
				}
			}
		}
	}

	function up(obj) {
		for (var j = 0; j < obj.N; j++) { //
			var count = 0;
			for (var i = 0; i < obj.N - 1 - count; i++) { //
				if (obj.p[i][j] == 0) { //
					for (var k = i; k < obj.N - 1 - count; k++) {
						obj.p[k][j] = obj.p[k + 1][j];
					}
					obj.p[obj.N - 1 - count][j] = 0;
					--i;
					++count;
				} else {
					if (obj.p[i][j] == obj.p[i + 1][j]) {
						obj.p[i][j] *= 2;
						obj.score += obj.p[i][j];
						for (var k = i + 1; k < obj.N - 1 - count; k++) {
							obj.p[k][j] = obj.p[k + 1][j];
						}
						obj.p[obj.N - 1 - count][j] = 0;
					}
				}
			}
			for (var i = 0; i < obj.N - 1; i++) {
				if (obj.p[i][j] != 0 && obj.p[i][j] == obj.p[i + 1][j]) { //相邻的非零元素合并到一起，元素值加倍
					obj.p[i][j] *= 2;
					obj.score += obj.p[i][j];
					for (var k = i + 1; k < obj.N - 1 - count; k++) {
						obj.p[k][j] = obj.p[k + 1][j];
					}
					obj.p[obj.N - 1 - count][j] = 0;
					break;
				}
			}
		}
	}

	function down(obj) {
		for (var j = 0; j < obj.N; j++) { //
			var count = 0;
			for (var i = obj.N - 1; i > count; i--) {
				if (obj.p[i][j] == 0) { //
					for (var k = i; k > count; k--) {
						obj.p[k][j] = obj.p[k - 1][j];
					}
					obj.p[count][j] = 0;
					++i;
					++count;
				} else {
					if (obj.p[i][j] == obj.p[i - 1][j]) {
						obj.p[i][j] *= 2;
						obj.score += obj.p[i][j];
						for (var k = i - 1; k > count; k--) {
							obj.p[k][j] = obj.p[k - 1][j];
						}
						obj.p[count][j] = 0;
					}
				}
			}
			for (var i = obj.N - 1; i > 0; i--) {
				if (obj.p[i][j] != 0 && obj.p[i][j] == obj.p[i - 1][j]) { //相邻的非零元素合并到一起，元素值加倍
					obj.p[i][j] *= 2;
					obj.score += obj.p[i][j];
					for (var k = i - 1; k > count; k--) {
						obj.p[k][j] = obj.p[k - 1][j];
					}
					obj.p[count][j] = 0;
					break;
				}
			}
		}
	}

	function right(obj) {
		for (var i = 0; i < obj.N; i++) { //
			var count = 0;
			for (var j = obj.N - 1; j > count; j--) { //
				if (obj.p[i][j] == 0) { //
					for (var k = j; k > count; k--) {
						obj.p[i][k] = obj.p[i][k - 1];
					}
					obj.p[i][count] = 0;
					++j;
					++count;
				} else {
					if (obj.p[i][j] == obj.p[i][j - 1]) {
						obj.p[i][j] *= 2;
						obj.score += obj.p[i][j];
						for (var k = j - 1; k > count; k--) {
							obj.p[i][k] = obj.p[i][k - 1];
						}
						obj.p[i][count] = 0;
					}
				}
			}
			for (var j = obj.N - 1; j > 0; j--) {
				if (obj.p[i][j] != 0 && obj.p[i][j] == obj.p[i][j - 1]) { //相邻的非零元素合并到一起，元素值加倍
					obj.p[i][j] *= 2;
					obj.score += obj.p[i][j];
					for (var k = j - 1; k > count; k--) {
						obj.p[i][k] = obj.p[i][k - 1];
					}
					obj.p[i][count] = 0;
					break;
				}
			}
		}
	}
	return {
		left:left,
		right:right,
		up:up,
		down:down
	};
});