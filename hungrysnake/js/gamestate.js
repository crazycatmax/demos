define([''], function () {
	//游戏运行
	function gamePlaying(o) {
		o.timerFlag = true;
		o.timer = setInterval(function () {
			o.snake.move();
		}, o.timerDis);
		return true;
	}

	//游戏暂停
	function gamePause(o) {
		o.timerFlag = false;
		clearInterval(o.timer);
		return true;
	}

	//游戏初始化
	function gameInit(o) {

		//还原蛇头位置
		o.box.children[0].style.left = '';
		o.box.children[0].style.top = '';

		//还原首个食物位置
		// let foodOrigin = o.box.children[1];
		o.box.children[1].style.left = '';
		o.box.children[1].style.top = '';

		//还原蛇运动方向
		o.snake.direction = 'left';

		//定时器间隔还原
		o.timerDis = 200;

		//当前食物指向首个食物
		o.foodNow = o.foodInit;

		//删除蛇身体只保留头部
		o.snake.parts.length = 1;
		for (let i = o.box.children.length - 1; i > 1; i--) {
			o.box.removeChild(o.box.children[i]);
		}

		return true;
	}

	//随机生成食物 盒子宽高=>600*400 食物宽高=>20
	function foodRandom(o) {
		let leftRand = parseInt(Math.random() * (o.box.offsetWidth / o.snake.width)) * o.snake.width;
		let topRand = parseInt(Math.random() * (o.box.offsetHeight / o.snake.width)) * o.snake.width;
		let newFood = o.foodInit.cloneNode();
		newFood.style.left = leftRand + 'px';
		newFood.style.top = topRand + 'px';
		newFood.style.opacity = 1 - o.snake.parts.length / 100;
		o.box.appendChild(newFood);
		return newFood;
	}

	return {
		gamePlaying,
		gamePause,
		gameInit,
		foodRandom
	}
})