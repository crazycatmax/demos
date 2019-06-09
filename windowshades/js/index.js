
var ul = $('box').children[0],
    m = 8, //行
    n = 16, //列
    colors = ['red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'purple'], //标签颜色数组
    index = -1, //全局序号，用来生成颜色图片样式的选择序号
    selIndex = -1, //下拉选框默认序号
    throttleFlag = []; //节流阀标志数组


initCube(m, n);

//动态生成小方格
function initCube(m, n) {
    //先删除原来的小方格，再创建新的！
    var ulSon = ul.children;
    var oldLis = [].slice.call(ulSon).slice(2); //上一次创建的小方格
    // index--;

    for (var i = 0; i < oldLis.length; i++) {
        ul.removeChild(oldLis[i]);
    }
    //初始化新的小方格
    for (var i = 0; i < m * n; i++) {
        $('li0').style.width = 800 / n + 'px';
        $('li0').style.height = 500 / m + 'px';
        var li = $('li0').cloneNode(true);
        ul.appendChild(li);
        // li.children[0].setAttribute('src','img/2.jpg');
        li.setAttribute('id', 'li' + (i + 1));
        li.children[0].setAttribute('src', 'img/' + ((index + 2) % 9 + 1) + '.jpg'); //根据index来调整小方格图片
        // console.log('index:' + index);
        // console.log('img/' + ((index + 2) % 9 + 1) + '.jpg');
        li.x = i % n; //存储列号
        li.y = parseInt(i / n); //存储行号
        li.style.left = li.x * 800 / n + 'px'; //小方格定位
        li.style.top = li.y * 500 / m + 'px'; //
        li.children[0].style.left = -li.x * 800 / n + 'px'; //小方格内图片定位，图片与外层的图片重叠
        li.children[0].style.top = -li.y * 500 / m + 'px';
    }
    //节流阀初始化
    throttleFlag = [];
    for (var i = 0; i < m * n; i++) {
        throttleFlag.push(true);
    }
}


$('row').onkeyup = function() {
    if ((/^([1-9]|([12]\d))$/).test(this.value)) {
        m = +this.value;
        initCube(m, n);
        this.nextElementSibling.innerHTML = '';
    } else {
        this.nextElementSibling.innerHTML = '请输入1-29的整数';
    }
}
$('column').onkeyup = function() {
    if ((/^([1-9]|[1234]\d)$/).test(this.value)) {
        n = +this.value;
        initCube(m, n);
        this.nextElementSibling.innerHTML = ''
    } else {
        this.nextElementSibling.innerHTML = '请输入1-49的整数';
    }
}

//按钮事件
$('sel').onmouseenter = function() {
    this.style.backgroundColor = '#ccc';
}
$('sel').onmouseleave = function() {
    this.style.backgroundColor = '#fff';
}
$('sel').onchange = function() {
    selIndex = +this.value;
    console.log(selIndex);
}
//鼠标移入移出事件
$('btn').onmouseenter = function() {
    this.style.backgroundColor = index == -1 ? colors[0] : colors[index % 7];
    this.style.color = '#fff';
    this.style.borderColor = '#fff';
}
$('btn').onmouseleave = function() {
    this.style.backgroundColor = '#fff';
    this.style.color = index == -1 ? colors[0] : colors[index % 7];;
    this.style.borderColor = index == -1 ? colors[0] : colors[index % 7];;
}
//按钮绑定事件
$('btn').onclick = function() {
    if (getAndValue(throttleFlag)) {
        for (var i = 0; i < throttleFlag.length; i++) { //节流阀初始化,每个小方格节流阀设置为关闭
            throttleFlag[i] = false;
        }
        // for (var i = 0; i < m * n; i++) {//初始化所有方块,根据里层的animate变化样式来初始化数据
        //     var li = $('li' + (i + 1));
        //     li.style.opacity = 0;
        // }
        //颜色，样式 根据下标递增
        index++;
        //变换按钮颜色
        $('btn').style.backgroundColor = colors[index % 7];

        //依次给每个方块设置延迟
        for (var i = 0; i < m * n; i++) {
            (function(i) { //闭包传参数i
                var li = $('li' + (i + 1)); //目标方块元素
                // console.log(li);
                setTimeout(function() {
                        animate(li, {
                            'opacity': 1.0
                        }, function() {
                            throttleFlag[i] = true; //打开每个小方格的节流阀
                            if (getAndValue(throttleFlag)) { //如果节流阀全部打开
                                exchange();
                            }
                        });
                    }, selIndex == -1 ?
                    style(li.x, li.y, m, n, index % 21) : //根据行列号确定样式
                    style(li.x, li.y, m, n, selIndex));
                // },style(li.x,li.y,m,n,index%21));//根据行列号确定样式
                // },style(li.x,li.y,m,n,20));//根据行列号确定样式
                // },500);
            })(i);
        }

        //变换图片
        function exchange() {
            //设置小方块效果结束时的动作，外层大图变为小方格的图
            $('img').setAttribute('src', 'img/' + ((index + 1) % 9 + 1) + '.jpg');
            //小方格变透明,并且切换为下一张图
            for (var i = 0; i < m * n; i++) {
                var li = $('li' + (i + 1));
                li.style.opacity = 0;
                li.children[0].setAttribute('src', 'img/' + ((index + 2) % 9 + 1) + '.jpg');
            }
        }
    }
}

function $(id) {
    return document.getElementById(id);
}

//节流阀数组求与函数
function getAndValue(arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
        flag = flag && arr[i];
    }
    return flag;
}

//百叶窗养式
function style(x, y, h, w, styleNum) { //列号，行号，高，宽，样式序号
    // var dis = 40;//时间间隔系数
    var dis = 1800 / (m * n); //时间间隔系数
    switch (styleNum) {
        case 0:
            return y * dis * 6; //6
        case 1:
            return x * dis * 3; //3
        case 2:
            return (x + y * w) * dis;
        case 3:
            return (x * h + y) * dis;
        case 4:
            return (x + y) * dis * 3;
        case 5:
            return ((w - x - 1) + y * w) * dis;
        case 6:
            return (x * h + (h - y - 1)) * dis;
        case 7:
            return y % 2 == 0 ? (x + y * w) * dis : ((w - x - 1) + y * w) * dis; //S形横向
        case 8:
            return x % 2 == 0 ? (x * h + y) * dis : (x * h + (h - y - 1)) * dis; //S形纵向
        case 9:
            return case7(x, y, h, w) * dis; //螺旋向内
        case 10:
            return (h * w - 1 - case7(x, y, h, w)) * dis; //螺旋向外
        case 11:
            return case9(x, y, h, w) * dis * 7; //回字形向外 7
        case 12:
            return (parseInt(Math.min(h, w) / 2) - case9(x, y, h, w)) * dis * 7; //回字形向内 7
        case 13:
            return case11(x, y, h, w) * dis; //s形横向两端
        case 14:
            return (parseInt(h * w / 2) - case11(x, y, h, w)) * dis; //s形横向中心
        case 15:
            return case13(x, y, h, w) * dis; //s形纵向两端
        case 16:
            return (parseInt(h * w / 2) - case13(x, y, h, w)) * dis; //s形纵向中心
        case 17:
            return y % 2 == 0 ? x * dis * 2 : (w - 1 - x) * dis * 2 //横向交叉出现
        case 18:
            return x % 2 == 0 ? y * dis * 3 : (h - 1 - y) * dis * 3 //纵向交叉出现
        case 19:
            return (x + y * w) % 2 * dis * 2;
        case 20:
            return case20(x, y, h, w) * dis; //小方格以随机顺序出现！！！
        default:
            return (x + y * w) * dis;
    }
}

// 列号x，行号y, 高h，宽w，对应求时间延迟基数
function case7(x, y, h, w) {
    var up = y; //小方格距离上边的距离
    var left = x; //距离左边
    var right = w - 1 - x; //距离右边
    var down = h - 1 - y; //距离下边
    var suma = 0; //整圈小盒子求和
    var sumb = 0; //未形成整圈的小盒子求和
    var hh = h - 1; //缓存高
    var ww = w - 1; //缓存宽

    var min = Math.min(up, left, right, down);
    console.log('up:' + up);
    for (var i = 0; i < min; i++) { //求suma
        suma += hh * 2 + ww * 2;
        hh -= 2;
        ww -= 2;
    }

    switch (min) { //求sumb
        case up:
            sumb = x - min + 1;
            break; //向右走
        case right:
            sumb = ww + y - right + 1;
            break; //向下走
        case down:
            sumb = ww + hh + (w - down - 1) - x + 1;
            break; //向左走
        case left:
            sumb = ww + hh + ww + (h - left - 1) - y + 1;
            break; //向上走
        default:
            break;
    }
    // console.log(suma);
    // console.log(sumb);
    return suma + sumb;
}

function case9(x, y, h, w) {
    var up = y; //小方格距离上边的距离
    var left = x; //距离左边
    var right = w - 1 - x; //距离右边
    var down = h - 1 - y; //距离下边
    return Math.min(up, left, right, down);
}

function case11(x, y, h, w) {
    if (y < parseInt(h / 2) || y == parseInt(h / 2) && x <= parseInt(w / 2)) {
        return y % 2 == 0 ? (x + y * w) : ((w - x - 1) + y * w);
    } else {
        return h * w - 1 - (y % 2 == 0 ? (x + y * w) : ((w - x - 1) + y * w));
    }
}

function case13(x, y, h, w) {
    if (x < parseInt(w / 2) || x < parseInt(w / 2) && y <= parseInt(h / 2)) {
        return x % 2 == 0 ? (x * h + y) : (x * h + (h - y - 1));
    } else {
        return h * w - 1 - (x % 2 == 0 ? (x * h + y) : (x * h + (h - y - 1)));
    }
}

var case20 = function(x, y, h, w) {
    var arr = arr || (function() { //如果数组为空或不存在，重新初始化数组
        var arr = [];
        for (var i = 0; i < h * w; i++) {
            arr.push(i);
        }
        return arr;
    })();
    return removeRandomItem(arr); //0,1,...,(h*w-1)
};

//删除并返回数组的随机元素
function removeRandomItem(arr) {
    var itemIndex = parseInt(Math.random() * arr.length); //随机位置
    var item = arr[itemIndex]; //随机元素
    arr.splice(itemIndex, 1);
    return item;
}

//把 任意对象 的 任意数值属性 改变为 任意的目标值
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") { //opacity要特殊处理
                //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                // var step = (target - leader) / 20;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100; //opacity没有单位
                // console.log(leader);
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k]; //层级不需要渐变 直接设置即可
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 20;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) fn()
        }
    }, 15);
}

//获取DOM对象计算后的属性
function getStyle(obj, attr) {
    return window.getComputedStyle?window.getComputedStyle(obj, null)[attr]:obj.currentStyle[attr];
}