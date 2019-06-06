define(['tools','direction'],function(tools,dirt){
	function foo(obj){
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
					dirt.left(obj);
					tools.judge(obj);
					if (obj.endflag) {
						tools.initial(obj);
						tools.start(obj);
						break;
					}
					if (!tools.myEquals(obj.p, obj.previous)) {
						tools.randomNext(obj);
					}
					tools.display(obj);
					break;
				case 38: //up
					console.log('up');
					dirt.up(obj);
					tools.judge(obj);
					if (obj.endflag) {
						tools.initial(obj);
						tools.start(obj);
						break;
					}
					if (!tools.myEquals(obj.p, obj.previous)) {
						tools.randomNext(obj);
					}
					tools.display(obj);
					break;
				case 39: //right
					console.log('right');
					dirt.right(obj);
					tools.judge(obj);
					if (obj.endflag) {
						tools.initial(obj);
						tools.start(obj);
						break;
					}
					if (!tools.myEquals(obj.p, obj.previous)) {
						tools.randomNext(obj);
					}
					tools.display(obj);
					break;
				case 40: //down
					console.log('down');
					dirt.down(obj);
					tools.judge(obj);
					if (obj.endflag) {
						tools.initial(obj);
						tools.start(obj);
						break;
					}
					if (!tools.myEquals(obj.p, obj.previous)) {
						tools.randomNext(obj);
					}
					tools.display(obj);
					break;
			}
			// console.log('p ==> '+p.toString());
			// console.log('previous ==> '+previous.toString());
		}, false);
	}
	return {
		init:foo
	};
});