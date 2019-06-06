define(['tools'], function(tools) {
	//游戏是否结束
	function foo(o) {
		return whetherCrashSelf(o) || whetherCrashBoundry(o);
	}

	//头部是否碰撞自己
	function whetherCrashSelf(o) {
		var parts = o.snake.parts;
		var head = parts[0];
		var flag = false; //默认没有碰撞自己
		for (var i = 1; i < parts.length; i++) {
			if (head.style.left == parts[i].style.left && head.style.top == parts[i].style.top) {
				flag = true;
				break;
			}
		}
		return flag;
	}

	//头部是否出界
	function whetherCrashBoundry(o) {
		var flag = false; //默认没有出界
		//碰到右边界
		if ((parseInt(tools.getStyle(o.snake.parts[0], 'left')) > o.box.offsetWidth - o.snake.width)
			//碰到左边界
			|| (parseInt(tools.getStyle(o.snake.parts[0], 'left')) < 0)
			//碰到下边界
			|| (parseInt(tools.getStyle(o.snake.parts[0], 'top')) > o.box.offsetHeight - o.snake.width)
			//碰到上边界
			|| (parseInt(tools.getStyle(o.snake.parts[0], 'top')) < 0)) {
			flag = true;
		}
		return flag;
	}
	return {
		over: foo
	}
})