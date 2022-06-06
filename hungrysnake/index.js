 let box = document.querySelector('.box'),
     head = document.querySelector('.head'),
     mode = document.querySelector('.mode'),
     foodInit = document.querySelector('.food'), //初始食物
     foodNow = foodInit, //当前食物对象
     timer = null, //定时器
     timerFlag = false, //定时器标识符
     timerDis = 200, //定时器间隔
     gameMode = 'normal', //游戏模式   正常/傻瓜  normal/foolish
     snake = {
         width: head.offsetWidth, //身体格子宽度
         name: 'Tommy', //名字
         head: head, //蛇头
         parts: [this.head], //蛇身体格子数组

         // direction:'right',//蛇头朝向
         direction: 'left', //蛇头朝向
         // direction:'down',//蛇头朝向
         // direction:'up',//蛇头朝向
         lastFoot: {
             x: 0,
             y: 0
         },
         //向前移动一步
         move: function () {
             let i = 0;

             //保存蛇尾巴的位置,如果蛇吃到食物，则食物添加到此位置
             snake.lastFoot.x = getStyle(this.parts[this.parts.length - 1], 'left');
             snake.lastFoot.y = getStyle(this.parts[this.parts.length - 1], 'top');
             // console.log('lastFootLeft:'+lastFootLeft+' lastFootTop:'+lastFootTop);

             //移动蛇的身体，每一段的位置都是它前一段上次的位置
             for (i = this.parts.length - 1; i > 0; i--) {
                 this.parts[i].style.left = parseInt(getStyle(this.parts[i - 1], 'left')) + 'px';
                 this.parts[i].style.top = parseInt(getStyle(this.parts[i - 1], 'top')) + 'px';
                 // animateFS(snake.parts[i],{'left':parseInt(getStyle(snake.parts[i - 1]))});
                 // animateFS(snake.parts[i],{'top':parseInt(getStyle(snake.parts[i - 1]))});
             }

             //根据方向来移动蛇头 i=0
             switch (this.direction) {
                 case 'right':
                     this.parts[i].style.left =
                         parseInt(getStyle(this.parts[i], 'left')) + this.width + 'px';
                     break;
                 case 'left':
                     this.parts[i].style.left =
                         parseInt(getStyle(this.parts[i], 'left')) - this.width + 'px';
                     break;
                 case 'down':
                     this.parts[i].style.top =
                         parseInt(getStyle(this.parts[i], 'top')) + this.width + 'px';
                     break;
                 case 'up':
                     this.parts[i].style.top =
                         parseInt(getStyle(this.parts[i], 'top')) - this.width + 'px';
                     break;
                 default:
                     ;
             }

             switch (gameMode) {
                 case 'normal':
                     //游戏结束条件判断==> a 撞边界    b 撞自己
                     if (whetherCrashSelf(snake) || whetherCrashBoundry(snake)) {
                         alert('gameover!\n kid!\n try it again!');
                         gamePause() && gameInit();
                     }
                     break;
                 case 'foolish':
                     //傻瓜模式，无边界，可以撞自己
                     foolMode(snake);
                     break;
                 default:
                     ;
             }


             //蛇吃或不吃食物
             this.eat(foodNow);
         },

         //蛇吃到食物时，身体增长一格,化食物为身体
         eat: function (food) {
             if (getStyle(this.head, 'left') == getStyle(food, 'left') && getStyle(this.head, 'top') == getStyle(food, 'top')) {
                 this.parts.push(food);

                 food.style.left = snake.lastFoot.x;
                 food.style.top = snake.lastFoot.y;

                 foodNow = foodRandom();
             }
         }
     }

 //给页面添加键盘监听器
 document.addEventListener('keydown', function (event) {
     let event = event || window.event;
     // console.log(event.keyCode);
     if (!timerFlag && event.keyCode != 80 && event.keyCode != 83 && event.keyCode != 69) {
         return;
     }
     switch (event.keyCode) {
         case 39: //→
             if (snake.direction !== 'left') {
                 snake.direction = 'right';
             }
             break;
         case 37: //←
             if (snake.direction !== 'right') {
                 snake.direction = 'left';
             }
             break;
         case 40: //↓
             if (snake.direction !== 'up') {
                 snake.direction = 'down';
             }
             break;
         case 38: //↑
             if (snake.direction !== 'down') {
                 snake.direction = 'up';
             }
             break;
         case 80: //P
             timerFlag ? gamePause() : gamePlaying(timerDis);
             break;
         case 83: //S
             timerFlag || gamePlaying(timerDis);
             break;
         case 69: //E
             // timerFlag && gamePause() && gameInit();
             gamePause() && gameInit();
             break;
         case 187: //+ 加速
             timerFlag && gamePause() && gamePlaying(timerDis = timerDis / 2);
             break;
         case 189: //- 减速
             timerFlag && gamePause() && gamePlaying(timerDis = timerDis * 2);
             break;
         case 77: //M 切换模式
             gameMode = gameMode == 'normal' ? 'foolish' : 'normal';
             mode.innerHTML = 'mode: ' + gameMode;
             break;
         default:
             console.log(event.keyCode);
     }
 }, false);


 //游戏运行
 function gamePlaying(timerDis) {
     timerFlag = true;
     timer = setInterval(function () {
         snake.move();
     }, timerDis);
     return true;
 }

 //游戏暂停
 function gamePause() {
     timerFlag = false;
     clearInterval(timer);
     return true;
 }

 //游戏初始化
 function gameInit() {

     //还原蛇头位置
     box.children[0].style.left = '';
     box.children[0].style.top = '';

     //还原首个食物位置
     // let foodOrigin = box.children[1];
     box.children[1].style.left = '';
     box.children[1].style.top = '';

     //还原蛇运动方向
     snake.direction = 'left';

     //定时器间隔还原
     timerDis = 200;

     //当前食物指向首个食物
     foodNow = foodInit;

     //删除蛇身体只保留头部
     snake.parts.length = 1;
     for (let i = box.children.length - 1; i > 1; i--) {
         box.removeChild(box.children[i]);
     }

     return true;
 }

 //随机生成食物 盒子宽高=>600*400 食物宽高=>20
 function foodRandom() {
     let leftRand = parseInt(Math.random() * (box.offsetWidth / snake.width)) * snake.width;
     let topRand = parseInt(Math.random() * (box.offsetHeight / snake.width)) * snake.width;
     let newFood = foodInit.cloneNode();
     newFood.style.left = leftRand + 'px';
     newFood.style.top = topRand + 'px';
     newFood.style.opacity = 1 - snake.parts.length / 100;
     box.appendChild(newFood);
     return newFood;
 }

 //头部是否碰撞自己
 function whetherCrashSelf(snake) {
     let parts = snake.parts;
     let head = parts[0];
     let flag = false; //默认没有碰撞自己
     for (let i = 1; i < parts.length; i++) {
         if (head.style.left == parts[i].style.left && head.style.top == parts[i].style.top) {
             flag = true;
             break;
         }
     }
     return flag;
 }

 //头部是否出界
 function whetherCrashBoundry(snake) {
     let flag = false; //默认没有出界
     //碰到右边界
     if ((parseInt(getStyle(snake.parts[0], 'left')) > box.offsetWidth - snake.width)
         //碰到左边界
         ||
         (parseInt(getStyle(snake.parts[0], 'left')) < 0)
         //碰到下边界
         ||
         (parseInt(getStyle(snake.parts[0], 'top')) > box.offsetHeight - snake.width)
         //碰到上边界
         ||
         (parseInt(getStyle(snake.parts[0], 'top')) < 0)) {
         flag = true;
     }
     return flag;
 }

 //傻瓜模式,无边界,可以碰自己
 function foolMode(snake) {
     if (parseInt(getStyle(snake.parts[0], 'left')) > box.offsetWidth - snake.width) { //碰到右边界
         snake.parts[0].style.left = '0px'; //右边消失，左边出现
     } else if (parseInt(getStyle(snake.parts[0], 'left')) < 0) { //碰到左边界
         snake.parts[0].style.left = box.offsetWidth - snake.width + 'px';
     } else if (parseInt(getStyle(snake.parts[0], 'top')) > box.offsetHeight - snake.width) { //碰到下边界
         snake.parts[0].style.top = '0px';
     } else if (parseInt(getStyle(snake.parts[0], 'top')) < 0) { //碰到上边界
         snake.parts[0].style.top = box.offsetHeight - snake.width + 'px';
     }
 }

 //获取计算后样式
 function getStyle(obj, attr) {
     return window.getComputedStyle ? window.getComputedStyle(obj, null)[attr] : obj.currentStyle[attr];
 }