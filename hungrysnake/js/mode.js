define(['tools'],function(tools){
	 //傻瓜模式,无边界,可以碰自己
	 function foo(o) {
	     if (parseInt(tools.getStyle(o.snake.parts[0], 'left')) > o.box.offsetWidth - o.snake.width) { //碰到右边界
	         o.snake.parts[0].style.left = '0px'; //右边消失，左边出现
	     } else if (parseInt(tools.getStyle(o.snake.parts[0], 'left')) < 0) { //碰到左边界
	         o.snake.parts[0].style.left = o.box.offsetWidth - o.snake.width + 'px';
	     } else if (parseInt(tools.getStyle(o.snake.parts[0], 'top')) > o.box.offsetHeight - o.snake.width) { //碰到下边界
	         o.snake.parts[0].style.top = '0px';
	     } else if (parseInt(tools.getStyle(o.snake.parts[0], 'top')) < 0) { //碰到上边界
	         o.snake.parts[0].style.top = o.box.offsetHeight - o.snake.width + 'px';
	     }
	 }
	return {
		foolMode:foo
	}
})