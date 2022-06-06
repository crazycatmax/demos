define([], function () {
	function foo(obj) {
		obj.box = document.querySelector('.box'); //父盒子
		obj.scoreText = document.querySelector('.score'); //得分标签
		obj.score = 0; //得分
		obj.recordText = document.querySelector('.record'); //纪录标签
		obj.record = 0; //纪录
		obj.recordFlag = false; //是否处于新纪录中
		obj.recordBy = 'gl';
		obj.playerText = document.querySelector('.player'); //玩家标签
		obj.player = 'gl';
		obj.N = 4; //4*4游戏，行数和列数
		obj.p = [
			[],
			[],
			[],
			[]
		]; //二维数组，存储16个小格子的上的数字
		obj.previous = [
			[],
			[],
			[],
			[]
		]; //小格子的上数字的备份，用来判断是否需要生成下一个随机的2
		obj.endflag = true; //游戏结束标志，默认为true
		obj.colorMap = { //小方格颜色对象
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
		//载入纪录
		// console.log(window.localStorage);
		obj.record = window.localStorage.getItem('record');
		obj.recordBy = window.localStorage.getItem('recordBy');
		obj.recordText.innerHTML = 'record: ' + obj.record + ' by ' + obj.recordBy; // 显示纪录

		//输入玩家姓名
		obj.player = prompt('请输入玩家名称,以确保破纪录时榜上有名！');
		obj.playerText.innerHTML = 'player: ' + obj.player;

		//初始化格子
		for (let i = 0; i < obj.N; i++) {
			for (let j = 0; j < obj.N; j++) {
				obj.p[i][j] = 0;
				obj.previous[i][j] = 0;
			}
		}
		obj.score = 0;
		obj.recordFlag = false;
	}
	return {
		init: foo
	};
});