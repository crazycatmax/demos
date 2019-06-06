
var box = document.querySelector('.box'), //父盒子
	scoreText = document.querySelector('.score'), //得分标签
	score = 0, //得分
	recordText = document.querySelector('.record'), //纪录标签
	record = 0, //纪录
	recordFlag = false, //是否处于新纪录中
	recordBy = 'gl',
	playerText = document.querySelector('.player'), //玩家标签
	player = 'gl',
	N = 4, //4*4游戏，行数和列数
	p = [
		[],
		[],
		[],
		[]
	], //二维数组，存储16个小格子的上的数字
	previous = [
		[],
		[],
		[],
		[]
	], //小格子的上数字的备份，用来判断是否需要生成下一个随机的2
	endflag = true, //游戏结束标志，默认为true
	colorMap = { //小方格颜色对象
		0: 'rgb(255, 255, 255)',
		2: 'rgb(255, 255, 153)',
		4: 'rgb(255, 204, 102)',
		8: 'rgb(255, 153, 51)',
		16: 'rgb(255, 102, 0)',
		32: 'rgb(255, 51, 0)',
		64: 'rgb(255, 0, 0)',
		128: 'rgb(255, 100, 0)',
		256: 'rgb(255, 200, 0)',
		512: 'rgb(255, 250, 0)',
		1024: 'rgb(200, 250, 0)',
		2048: 'rgb(150, 250, 0)',
		4096: 'rgb(100, 250, 0)',
		8192: 'rgb(50, 250, 0)',
		16384: 'rgb(0, 250, 0)',
		32768: 'rgb(0, 255, 0)',
		65536: 'rgb(0, 0, 0)'
	};

// 初始化游戏
initial(p);

//载入纪录
// console.log(window.localStorage);
record = window.localStorage.getItem('record');
recordBy = window.localStorage.getItem('recordBy');
recordText.innerHTML = 'record: ' + record + ' by ' + recordBy; // 显示纪录

//输入玩家姓名
player = prompt('请输入玩家名称,以确保破纪录时榜上有名！');
playerText.innerHTML = 'player: ' + player;

// 启动游戏
start(p);

//监听鼠标移入事件
document.addEventListener('mouseenter', function() {
	document.querySelector('.name').classList.add('animation');
});
document.addEventListener('mouseleave', function() {
	document.querySelector('.name').classList.remove('animation');
});

//监听键盘事件
document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 37: //left
			console.log('left');
			left(p);
			judge(p);
			if (endflag) {
				initial(p);
				start(p);
				break;
			}
			if (!myEquals(p, previous)) {
				randomNext(p);
			}
			display(p);
			break;
		case 38: //up
			console.log('up');
			up(p);
			judge(p);
			if (endflag) {
				initial(p);
				start(p);
				break;
			}
			if (!myEquals(p, previous)) {
				randomNext(p);
			}
			display(p);
			break;
		case 39: //right
			console.log('right');
			right(p);
			judge(p);
			if (endflag) {
				initial(p);
				start(p);
				break;
			}
			if (!myEquals(p, previous)) {
				randomNext(p);
			}
			display(p);
			break;
		case 40: //down
			console.log('down');
			down(p);
			judge(p);
			if (endflag) {
				initial(p);
				start(p);
				break;
			}
			if (!myEquals(p, previous)) {
				randomNext(p);
			}
			display(p);
			break;
	}
	// console.log('p ==> '+p.toString());
	// console.log('previous ==> '+previous.toString());
}, false);

//初始化
function initial(a) {
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++) {
			a[i][j] = 0;
			previous[i][j] = 0;
		}
	}
	score = 0;
	recordFlag = false;
}

//游戏启动
function start(a) {
	endflag = false;
	randomNext(a);
	randomNext(a);
	display(a);
}

//在随机位置生成一个2
function randomNext(a) {
	var row, vol;
	var flag = false;
	while (!flag) {
		row = parseInt(Math.random() * N);
		vol = parseInt(Math.random() * N);
		if (a[row][vol] == 0) {
			a[row][vol] = 2;
			flag = true;
		}
	}
}

//判断游戏是否结束，a:数组任何一个元素都非零 b:数组元素与相邻元素都不一样
function judge(a) {
	var count = 0; //零元素计数
	var flag = true; //数组元素与相邻元素均不一样标志,默认为true
	for (var i = 0; i < N; i++) {
		for (var j = 0; j < N; j++) {
			if (a[i][j] == 0) {
				++count;
			}
			if (true) { //判断是否与相邻元素不一样
				flag = i > 0 ? flag && (a[i][j] != a[i - 1][j]) : flag; //与上边相邻元素相比
				flag = i < N - 1 ? flag && (a[i][j] != a[i + 1][j]) : flag; //与下边相邻元素相比
				flag = j > 0 ? flag && (a[i][j] != a[i][j - 1]) : flag; //与左边相邻元素相比
				flag = j < N - 1 ? flag && (a[i][j] != a[i][j + 1]) : flag; //与右边相邻元素相比
			}
		}
	}
	if (count == 0 && flag) {
		if (recordFlag) {
			window.localStorage.setItem('record', record);
			window.localStorage.setItem('recordBy', recordBy);
		}

		var conf = confirm('game over,kid! \n try again!'); //游戏结束
		endflag = conf;
	}
}

//判断俩数组内容是否完全一致
function myEquals(a, b) {
	var flag = true;
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < a[i].length; j++) {
			if (a[i][j] != b[i][j]) {
				flag = false;
				return flag;
			}
		}
	}
	return flag;
}
// console.log(myEquals(p, previous));

//展示函数，将数组的元素值填入对应的方格标签
function display(a) {
	// for (var i = 0; i < N; i++) {
	// 	for (var j = 0; j < N; j++) {
	// 		document.write(a[i][j] + "\t");
	// 		previous[i][j] = a[i][j];
	// 	}
	// 	document.write('<br>');
	// }
	for (var i = 0; i < N; i++) { // 将数组元素值写入标签，并变色
		for (var j = 0; j < N; j++) {
			handle(i, j, a);
		}
	}
	scoreText.innerHTML = 'score: ' + score; // 显示分数
	if (score >= record && !recordFlag) { //如果破纪录了
		recordFlag = true;
		recordBy = player;
		alert('congratulations! \n you are making a new record! \n make it higher!')
	}
	if (recordFlag) {
		record = score;
		recordText.innerHTML = 'record: ' + record + ' by ' + recordBy; // 显示纪录
	}

	//保存当前数组至备份数组
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < a[i].length; j++) {
			previous[i][j] = a[i][j];
		}
	}
}

function handle(i, j, a) { //根据行列号，将数组元素值写入标签,并改变颜色
	box.children[i * N + j].innerHTML = a[i][j] == 0 ? '' : a[i][j];
	box.children[i * N + j].style.backgroundColor = colorMap[a[i][j]] || 'black'; //设置颜色
}


//left
function left(a) {
	for (var i = 0; i < N; i++) { // 遍历每一行
		var count = 0;
		for (var j = 0; j < N - 1 - count; j++) { // 遍历前三列
			if (a[i][j] == 0) { // 排除空白格子s
				for (var k = j; k < N - 1 - count; k++) {
					a[i][k] = a[i][k + 1];
				}
				a[i][N - 1 - count] = 0;
				--j;
				++count;
			} else {
				if (a[i][j] == a[i][j + 1]) {
					a[i][j] *= 2;
					score += a[i][j]; //加分
					for (var k = j + 1; k < N - 1 - count; k++) {
						a[i][k] = a[i][k + 1];
					}
					a[i][N - 1 - count] = 0;
				}
			}
		}
		for (var j = 0; j < N - 1; j++) {
			if (a[i][j] != 0 && a[i][j] == a[i][j + 1]) { //相邻的非零元素合并到一起，元素值加倍
				a[i][j] *= 2;
				score += a[i][j]; //加分
				for (var k = j + 1; k < N - 1 - count; k++) {
					a[i][k] = a[i][k + 1];
				}
				a[i][N - 1 - count] = 0;
				break;
			}
		}
	}
}

function up(a) {
	for (var j = 0; j < N; j++) { //
		var count = 0;
		for (var i = 0; i < N - 1 - count; i++) { //
			if (a[i][j] == 0) { //
				for (var k = i; k < N - 1 - count; k++) {
					a[k][j] = a[k + 1][j];
				}
				a[N - 1 - count][j] = 0;
				--i;
				++count;
			} else {
				if (a[i][j] == a[i + 1][j]) {
					a[i][j] *= 2;
					score += a[i][j];
					for (var k = i + 1; k < N - 1 - count; k++) {
						a[k][j] = a[k + 1][j];
					}
					a[N - 1 - count][j] = 0;
				}
			}
		}
		for (var i = 0; i < N - 1; i++) {
			if (a[i][j] != 0 && a[i][j] == a[i + 1][j]) { //相邻的非零元素合并到一起，元素值加倍
				a[i][j] *= 2;
				score += a[i][j];
				for (var k = i + 1; k < N - 1 - count; k++) {
					a[k][j] = a[k + 1][j];
				}
				a[N - 1 - count][j] = 0;
				break;
			}
		}
	}
}

function down(a) {
	for (var j = 0; j < N; j++) { //
		var count = 0;
		for (var i = N - 1; i > count; i--) {
			if (a[i][j] == 0) { //
				for (var k = i; k > count; k--) {
					a[k][j] = a[k - 1][j];
				}
				a[count][j] = 0;
				++i;
				++count;
			} else {
				if (a[i][j] == a[i - 1][j]) {
					a[i][j] *= 2;
					score += a[i][j];
					for (var k = i - 1; k > count; k--) {
						a[k][j] = a[k - 1][j];
					}
					a[count][j] = 0;
				}
			}
		}
		for (var i = N - 1; i > 0; i--) {
			if (a[i][j] != 0 && a[i][j] == a[i - 1][j]) { //相邻的非零元素合并到一起，元素值加倍
				a[i][j] *= 2;
				score += a[i][j];
				for (var k = i - 1; k > count; k--) {
					a[k][j] = a[k - 1][j];
				}
				a[count][j] = 0;
				break;
			}
		}
	}
}

function right(a) {
	for (var i = 0; i < N; i++) { //
		var count = 0;
		for (var j = N - 1; j > count; j--) { //
			if (a[i][j] == 0) { //
				for (var k = j; k > count; k--) {
					a[i][k] = a[i][k - 1];
				}
				a[i][count] = 0;
				++j;
				++count;
			} else {
				if (a[i][j] == a[i][j - 1]) {
					a[i][j] *= 2;
					score += a[i][j];
					for (var k = j - 1; k > count; k--) {
						a[i][k] = a[i][k - 1];
					}
					a[i][count] = 0;
				}
			}
		}
		for (var j = N - 1; j > 0; j--) {
			if (a[i][j] != 0 && a[i][j] == a[i][j - 1]) { //相邻的非零元素合并到一起，元素值加倍
				a[i][j] *= 2;
				score += a[i][j];
				for (var k = j - 1; k > count; k--) {
					a[i][k] = a[i][k - 1];
				}
				a[i][count] = 0;
				break;
			}
		}
	}
}