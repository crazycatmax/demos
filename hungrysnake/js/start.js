define(['tools','gameover','gamestate','mode'], function(tools,gameover,state,mode) {
	function foo(o) {
		o.box = document.querySelector('.box'),
		o.head = document.querySelector('.head'),
		o.mode = document.querySelector('.mode'),
		o.foodInit = document.querySelector('.food'), //初始食物
		o.foodNow = o.foodInit, //当前食物对象
		o.timer = null, //定时器
		o.timerFlag = false, //定时器标识符
		o.timerDis = 200, //定时器间隔
		o.gameMode = 'normal', //游戏模式   正常/傻瓜  normal/foolish
		o.snake = {
			width: o.head.offsetWidth, //身体格子宽度
			name: 'Tommy', //名字
			head: o.head, //蛇头
			parts: [o.head], //蛇身体格子数组

			// direction:'right',//蛇头朝向
			direction: 'left', //蛇头朝向
			// direction:'down',//蛇头朝向
			// direction:'up',//蛇头朝向
			lastFoot: {
				x: 0,
				y: 0
			},
			//向前移动一步
			move: function() {
				var i = 0;

				//保存蛇尾巴的位置,如果蛇吃到食物，则食物添加到此位置
				this.lastFoot.x = tools.getStyle(this.parts[this.parts.length - 1], 'left');
				this.lastFoot.y = tools.getStyle(this.parts[this.parts.length - 1], 'top');
				// console.log('lastFootLeft:'+lastFootLeft+' lastFootTop:'+lastFootTop);

				//移动蛇的身体，每一段的位置都是它前一段上次的位置
				for (i = this.parts.length - 1; i > 0; i--) {
					this.parts[i].style.left = parseInt(tools.getStyle(this.parts[i - 1], 'left')) + 'px';
					this.parts[i].style.top = parseInt(tools.getStyle(this.parts[i - 1], 'top')) + 'px';
					// animateFS(snake.parts[i],{'left':parseInt(tools.getStyle(snake.parts[i - 1]))});
					// animateFS(snake.parts[i],{'top':parseInt(tools.getStyle(snake.parts[i - 1]))});
				}

				//根据方向来移动蛇头 i=0
				switch (this.direction) {
					case 'right':
						this.parts[i].style.left =
							parseInt(tools.getStyle(this.parts[i], 'left')) + this.width + 'px';
						break;
					case 'left':
						this.parts[i].style.left =
							parseInt(tools.getStyle(this.parts[i], 'left')) - this.width + 'px';
						break;
					case 'down':
						this.parts[i].style.top =
							parseInt(tools.getStyle(this.parts[i], 'top')) + this.width + 'px';
						break;
					case 'up':
						this.parts[i].style.top =
							parseInt(tools.getStyle(this.parts[i], 'top')) - this.width + 'px';
						break;
					default:
						;
				}

				switch (o.gameMode) {
					case 'normal':
						//游戏结束条件判断==> a 撞边界    b 撞自己
						if (gameover.over(o)) {
							alert('gameover!\n kid!\n try it again!');
							state.gamePause(o) && state.gameInit(o);
						}
						break;
					case 'foolish':
						//傻瓜模式，无边界，可以撞自己
						mode.foolMode(o);
						break;
					default:
						;
				}


				//蛇吃或不吃食物
				this.eat(o.foodNow);
			},

			//蛇吃到食物时，身体增长一格,化食物为身体
			eat: function(food) {
				if (tools.getStyle(this.head, 'left') == tools.getStyle(food, 'left') && tools.getStyle(this.head, 'top') == tools.getStyle(food, 'top')) {
					this.parts.push(food);

					food.style.left = this.lastFoot.x;
					food.style.top = this.lastFoot.y;
					// food.style.top = o.snake.lastFoot.y;

					o.foodNow = state.foodRandom(o);
				}
			}
		}
	}
	return {
		init: foo
	};
})