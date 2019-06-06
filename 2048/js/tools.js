define(function(){
	//游戏启动
	function start(obj) {
		console.log('bbb');
		obj.endflag = false;
		randomNext(obj);
		randomNext(obj);
		display(obj);
	}

	//在随机位置生成一个2
	function randomNext(obj) {
		var row, vol;
		var flag = false;
		while (!flag) {
			row = parseInt(Math.random() * obj.N);
			vol = parseInt(Math.random() * obj.N);
			if (obj.p[row][vol] == 0) {
				obj.p[row][vol] = 2;
				flag = true;
			}
		}
	}

	//判断游戏是否结束，a:数组任何一个元素都非零 b:数组元素与相邻元素都不一样
	function judge(obj) {
		var count = 0; //零元素计数
		var flag = true; //数组元素与相邻元素均不一样标志,默认为true
		for (var i = 0; i < obj.N; i++) {
			for (var j = 0; j < obj.N; j++) {
				if (obj.p[i][j] == 0) {
					++count;
				}
				if (true) { //判断是否与相邻元素不一样
					flag = i > 0 ? flag && (obj.p[i][j] != obj.p[i - 1][j]) : flag; //与上边相邻元素相比
					flag = i < obj.N - 1 ? flag && (obj.p[i][j] != obj.p[i + 1][j]) : flag; //与下边相邻元素相比
					flag = j > 0 ? flag && (obj.p[i][j] != obj.p[i][j - 1]) : flag; //与左边相邻元素相比
					flag = j < obj.N - 1 ? flag && (obj.p[i][j] != obj.p[i][j + 1]) : flag; //与右边相邻元素相比
				}
			}
		}
		if (count == 0 && flag) {
			if (obj.recordFlag) {
				window.localStorage.setItem('record', obj.record);
				window.localStorage.setItem('recordBy', obj.recordBy);
			}

			var conf = confirm('game over,kid! \n try again!'); //游戏结束
			obj.endflag = conf;
		}
	}

	//判断俩数组内容是否完全一致
	function myEquals(a, b) {
		console.log('aaa');
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
	function display(obj) {
		// for (var i = 0; i < N; i++) {
		// 	for (var j = 0; j < N; j++) {
		// 		document.write(a[i][j] + "\t");
		// 		previous[i][j] = a[i][j];
		// 	}
		// 	document.write('<br>');
		// }
		for (var i = 0; i < obj.N; i++) { // 将数组元素值写入标签，并变色
			for (var j = 0; j < obj.N; j++) {
				handle(i, j, obj);
			}
		}
		obj.scoreText.innerHTML = 'score: ' + obj.score; // 显示分数
		if (obj.score >= obj.record && !obj.recordFlag) { //如果破纪录了
			obj.recordFlag = true;
			obj.recordBy = obj.player;
			alert('congratulations! \n you are making a new record! \n make it higher!')
		}
		if (obj.recordFlag) {
			obj.record = obj.score;
			obj.recordText.innerHTML = 'record: ' + obj.record + ' by ' + obj.recordBy; // 显示纪录
		}

		//保存当前数组至备份数组
		for (var i = 0; i < obj.p.length; i++) {
			for (var j = 0; j < obj.p[i].length; j++) {
				obj.previous[i][j] = obj.p[i][j];
			}
		}
	}

	function handle(i, j, obj) { //根据行列号，将数组元素值写入标签,并改变颜色
		obj.box.children[i * obj.N + j].innerHTML = obj.p[i][j] == 0 ? '' : obj.p[i][j];
		obj.box.children[i * obj.N + j].style.backgroundColor = obj.colorMap[obj.p[i][j]] || 'black'; //设置颜色
	}

	return {
		start:start,
		randomNext:randomNext,
		judge:judge,
		myEquals:myEquals,
		display:display,
		handle:handle
	};
});