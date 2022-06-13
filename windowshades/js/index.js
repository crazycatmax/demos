let ul = $("box").children[0],
  m = 8, // 行
  n = 16, // 列
  colors = ["red", "orange", "yellow", "green", "skyblue", "blue", "purple"], // 标签颜色数组
  index = -1, // 全局序号,用来生成颜色图片样式的选择序号
  selIndex = -1, // 下拉选框默认序号
  throttleFlag = []; // 节流阀标志数组

initCube(m, n);
setListener();

// 动态生成小方格
function initCube(m, n) {
  const ulSon = ul.children;
  const oldLis = [].slice.call(ulSon).slice(2); // 上一次创建的小方格

  removeLastCube();
  createNewCube();
  initThrottle();

  // 先删除原来的小方格，再创建新的！
  function removeLastCube() {
    for (let i = 0; i < oldLis.length; i++) {
      ul.removeChild(oldLis[i]);
    }
  }

  // 初始化新的小方格
  function createNewCube() {
    for (let i = 0; i < m * n; i++) {
      $("li0").style.width = 800 / n + "px";
      $("li0").style.height = 500 / m + "px";
      let li = $("li0").cloneNode(true);
      ul.appendChild(li);
      li.setAttribute("id", "li" + (i + 1));

      // 根据 index 来调整小方格图片
      li.children[0].setAttribute(
        "src",
        "img/" + (((index + 2) % 9) + 1) + ".jpg"
      );
      li.x = i % n; // 存储列号
      li.y = parseInt(i / n); // 存储行号
      li.style.left = (li.x * 800) / n + "px"; // 小方格定位
      li.style.top = (li.y * 500) / m + "px";
      li.children[0].style.left = (-li.x * 800) / n + "px"; // 小方格内图片定位，图片与外层的图片重叠
      li.children[0].style.top = (-li.y * 500) / m + "px";
    }
  }

  // 节流阀初始化
  function initThrottle() {
    throttleFlag = [];
    for (let i = 0; i < m * n; i++) {
      throttleFlag.push(true);
    }
  }
}

function rowHandler() {
  if (!/^([1-9]|([12]\d))$/.test(this.value)) {
    this.nextElementSibling.innerHTML = "请输入1-29的整数";
    return;
  }
  m = Number(this.value);
  initCube(m, n);
  this.nextElementSibling.innerHTML = "";
}

function columnHandler() {
  if (!/^([1-9]|[1234]\d)$/.test(this.value)) {
    this.nextElementSibling.innerHTML = "请输入1-49的整数";
    return;
  }
  n = Number(this.value);
  initCube(m, n);
  this.nextElementSibling.innerHTML = "";
}

function btnClickHandler() {
  if (!getAndValue(throttleFlag)) return;

  // 节流阀初始化,每个小方格节流阀设置为关闭
  for (let i = 0; i < throttleFlag.length; i++) {
    throttleFlag[i] = false;
  }

  index++; // 颜色、样式 根据下标递增
  $("btn").style.backgroundColor = colors[index % 7]; // 变换按钮颜色

  // 依次给每个方块设置延迟
  for (let i = 0; i < m * n; i++) {
    let li = $("li" + (i + 1)); // 目标方块元素
    setTimeout(
      function () {
        animate(
          li,
          {
            opacity: 1.0,
          },
          function () {
            throttleFlag[i] = true; // 打开每个小方格的节流阀
            if (getAndValue(throttleFlag)) exchange(); // 如果节流阀全部打开,变换图片
          }
        );
      },
      selIndex == -1
        ? style(li.x, li.y, m, n, index % 21) // 根据行列号确定延迟时间
        : style(li.x, li.y, m, n, selIndex)
    );
    // },style(li.x,li.y,m,n,index%21));
    // },style(li.x,li.y,m,n,20));
    // },500);
  }

  // 变换图片
  function exchange() {
    // 设置小方块效果结束时的动作, 外层大图变为小方格的图
    $("img").setAttribute("src", "img/" + (((index + 1) % 9) + 1) + ".jpg");

    // 小方格变透明,并且切换为下一张图
    for (let i = 0; i < m * n; i++) {
      let li = $("li" + (i + 1));
      li.style.opacity = 0;
      li.children[0].setAttribute(
        "src",
        "img/" + (((index + 2) % 9) + 1) + ".jpg"
      );
    }
  }
}

function setListener() {
  $("row").onkeyup = rowHandler;
  $("column").onkeyup = columnHandler;

  // 按钮事件
  $("sel").onmouseenter = function () {
    this.style.backgroundColor = "#ccc";
  };
  $("sel").onmouseleave = function () {
    this.style.backgroundColor = "#fff";
  };
  $("sel").onchange = function () {
    selIndex = Number(this.value);
  };

  // 鼠标移入移出事件
  $("btn").onmouseenter = function () {
    this.style.backgroundColor = index == -1 ? colors[0] : colors[index % 7];
    this.style.color = "#fff";
    this.style.borderColor = "#fff";
  };
  $("btn").onmouseleave = function () {
    this.style.backgroundColor = "#fff";
    this.style.color = index == -1 ? colors[0] : colors[index % 7];
    this.style.borderColor = index == -1 ? colors[0] : colors[index % 7];
  };

  // 按钮绑定事件
  $("btn").onclick = btnClickHandler;
}

// 节流阀数组求与函数
function getAndValue(arr) {
  return arr.every((t) => !!t);
}

// 百叶窗样式 列号、行号、高、宽、样式序号
function style(x, y, h, w, styleNum) {
  let dis = 1800 / (m * n); // 时间间隔系数 dis = 40
  switch (styleNum) {
    case 0:
      return y * dis * 6; // 6
    case 1:
      return x * dis * 3; // 3
    case 2:
      return (x + y * w) * dis;
    case 3:
      return (x * h + y) * dis;
    case 4:
      return (x + y) * dis * 3;
    case 5:
      return (w - x - 1 + y * w) * dis;
    case 6:
      return (x * h + (h - y - 1)) * dis;
    case 7:
      return y % 2 == 0 ? (x + y * w) * dis : (w - x - 1 + y * w) * dis; // S形横向
    case 8:
      return x % 2 == 0 ? (x * h + y) * dis : (x * h + (h - y - 1)) * dis; // S形纵向
    case 9:
      return case7(x, y, h, w) * dis; // 螺旋向内
    case 10:
      return (h * w - 1 - case7(x, y, h, w)) * dis; // 螺旋向外
    case 11:
      return case9(x, y, h, w) * dis * 7; // 回字形向外 7
    case 12:
      return (parseInt(Math.min(h, w) / 2) - case9(x, y, h, w)) * dis * 7; // 回字形向内 7
    case 13:
      return case11(x, y, h, w) * dis; // s形横向两端
    case 14:
      return (parseInt((h * w) / 2) - case11(x, y, h, w)) * dis; // s形横向中心
    case 15:
      return case13(x, y, h, w) * dis; // s形纵向两端
    case 16:
      return (parseInt((h * w) / 2) - case13(x, y, h, w)) * dis; // s形纵向中心
    case 17:
      return y % 2 == 0 ? x * dis * 2 : (w - 1 - x) * dis * 2; // 横向交叉出现
    case 18:
      return x % 2 == 0 ? y * dis * 3 : (h - 1 - y) * dis * 3; // 纵向交叉出现
    case 19:
      return ((x + y * w) % 2) * dis * 2;
    case 20:
      return case20(x, y, h, w) * dis; // 随机闪现
    default:
      return (x + y * w) * dis;
  }
}

// 列号x、行号y、高h、宽w、对应求时间延迟基数
function case7(x, y, h, w) {
  let up = y, // 小方格距离上边的距离
    left = x, // 距离左边
    right = w - 1 - x, // 距离右边
    down = h - 1 - y, // 距离下边
    suma = 0, // 整圈小盒子求和
    sumb = 0, // 未形成整圈的小盒子求和
    hh = h - 1, // 缓存高
    ww = w - 1; // 缓存宽

  let min = Math.min(up, left, right, down);
  for (let i = 0; i < min; i++) {
    suma += hh * 2 + ww * 2;
    hh -= 2;
    ww -= 2;
  }

  switch (
    min // 求sumb
  ) {
    case up:
      sumb = x - min + 1;
      break; // 向右走
    case right:
      sumb = ww + y - right + 1;
      break; // 向下走
    case down:
      sumb = ww + hh + (w - down - 1) - x + 1;
      break; // 向左走
    case left:
      sumb = ww + hh + ww + (h - left - 1) - y + 1;
      break; // 向上走
    default:
      break;
  }
  return suma + sumb;
}

function case9(x, y, h, w) {
  let up = y, // 小方格距离上边的距离
    left = x, // 距离左边
    right = w - 1 - x, // 距离右边
    down = h - 1 - y; // 距离下边
  return Math.min(up, left, right, down);
}

function case11(x, y, h, w) {
  if (y < parseInt(h / 2) || (y == parseInt(h / 2) && x <= parseInt(w / 2))) {
    return y % 2 == 0 ? x + y * w : w - x - 1 + y * w;
  }
  return h * w - 1 - (y % 2 == 0 ? x + y * w : w - x - 1 + y * w);
}

function case13(x, y, h, w) {
  if (x < parseInt(w / 2) || (x < parseInt(w / 2) && y <= parseInt(h / 2))) {
    return x % 2 == 0 ? x * h + y : x * h + (h - y - 1);
  }
  return h * w - 1 - (x % 2 == 0 ? x * h + y : x * h + (h - y - 1));
}

// [0,1,...,(h*w-1)]
function initArr() {
  let arr = [];
  for (let i = 0; i < h * w; i++) {
    arr.push(i);
  }
  return arr;
}

function case20(x, y, h, w) {
  return removeRandomItem(initArr());
}

function $(id) {
  return document.getElementById(id);
}

// 获取计算后属性
function getStyle(obj, attr) {
  return window.getComputedStyle
    ? window.getComputedStyle(obj, null)[attr]
    : obj.currentStyle[attr];
}

// 删除并返回数组的随机元素
function removeRandomItem(arr) {
  const randomIndex = parseInt(Math.random() * arr.length); // 随机位置
  const item = arr[randomIndex]; // 随机元素
  arr.splice(randomIndex, 1);
  return item;
}

// 动画函数
function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    let leader, target, step;
    flag = true;
    for (let k in json) {
      if (k === "opacity") {
        leader = getStyle(obj, k) * 100;
        target = json[k] * 100;
        step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style[k] = leader / 100; // opacity没有单位
      } else if (k === "zIndex") {
        obj.style.zIndex = json[k]; // 层级不需要渐变 直接设置即可
      } else {
        leader = parseInt(getStyle(obj, k)) || 0;
        target = json[k];
        step = (target - leader) / 20;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        obj.style[k] = leader + "px";
      }
      if (leader !== target) {
        flag = false;
      }
    }
    if (!flag) return;
    clearInterval(obj.timer);
    if (fn) fn();
  }, 15);
}
