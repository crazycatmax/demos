define(['gamestate'], function(state) {
	function foo(o) {
		//给页面添加键盘监听器
		document.addEventListener('keydown', function(event) {
			var event = event || window.event;
			// console.log(event.keyCode);
			if (!o.timerFlag && event.keyCode != 80 && event.keyCode != 83 && event.keyCode != 69) {
				return;
			}
			switch (event.keyCode) {
				case 39: //→
					if (o.snake.direction !== 'left') {
						o.snake.direction = 'right';
					}
					break;
				case 37: //←
					if (o.snake.direction !== 'right') {
						o.snake.direction = 'left';
					}
					break;
				case 40: //↓
					if (o.snake.direction !== 'up') {
						o.snake.direction = 'down';
					}
					break;
				case 38: //↑
					if (o.snake.direction !== 'down') {
						o.snake.direction = 'up';
					}
					break;
				case 80: //P
					o.timerFlag ? state.gamePause(o) : state.gamePlaying(o);
					break;
				case 83: //S
					o.timerFlag || state.gamePlaying(o);
					break;
				case 69: //E
					// timerFlag && gamePause() && gameInit();
					state.gamePause(o) && state.gameInit(o);
					break;
				case 187: //+ 加速
					if(o.timerFlag && state.gamePause(o)){
						o.timerDis = o.timerDis / 2;
						state.gamePlaying(o);
					}
					break;
				case 189: //- 减速
					if(o.timerFlag && state.gamePause(o)){
						o.timerDis = o.timerDis * 2;
						state.gamePlaying(o);
					}
					break;
				case 77: //M 切换模式
					o.gameMode = o.gameMode == 'normal' ? 'foolish' : 'normal';
					o.mode.innerHTML = 'mode: ' + o.gameMode;
					break;
				default:
					console.log(event.keyCode);
			}
		}, false);

	}
	return {
		init: foo
	}
})