window.addEventListener('load', function () {
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var box = document.querySelector('.box');
    // 一张轮播图的宽度
    var boxWidth = box.offsetWidth;

    // 2.鼠标经过显示左右箭头
    box.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 当鼠标经过时停止定时器
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    // 鼠标离开隐藏左右箭头
    box.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 当鼠标离开时开启定时器
        timer = setInterval(function () {
            // 手动调用鼠标点击事件
            arrow_r.click();
        }, 2000)
    })

    // 3.动态生成小圆圈  有几张图，就生成几个小圆圈
    var t_img = box.querySelector('.turnround_img');
    // console.log(t_img.children.length);
    var select = box.querySelector('.select');
    for (var i = 0; i < t_img.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        // console.log(111);
        // 记录当前小圆圈的索引号
        li.setAttribute('index', i);
        // 把li插入到select中
        select.appendChild(li);
        // console.log(222);
        // 4.点击小圆圈时，改变他的颜色
        li.addEventListener('click', function () {
            // 排他法去除其他人的颜色，增加自己的颜色
            for (var i = 0; i < select.children.length; i++) {
                select.children[i].className = '';
            }
            this.className = 'current';
            // 5.点击小圆圈时,轮播图片移动相应距离
            // animate(obj, target,callback);
            // 轮播图的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小圆圈 就蛋刀当前校圆圈的index
            var index = this.getAttribute('index');

            // 当点击小圆圈时，就吧这个li的索引给num
            num = index;
            // 当点击小圆圈时，就吧这个li的索引给cricle
            cricle = index;

            // 动画效果
            animate(t_img, -index * boxWidth);
        })
    }
    // 把第一个小圆圈背景设置为特殊色
    select.children[0].className = 'current';

    // 6.克隆第一张图片，添加到t_img后面
    var first = t_img.children[0].cloneNode(true); //true 表示深克隆，复制其子节点
    t_img.appendChild(first);

    // 声明一个变量控制轮播图的位移量
    var num = 0;
    // 声明一个变量控制小圆圈的播放
    var cricle = 0;
    // 设置节流阀，只用当上一个动画播放结束了，才能进行下一个动画
    var flag = true;
    // 7.点击右侧按钮，图片就滚动一张
    arrow_r.addEventListener('click', function () {
        // 当节流阀为true时，执行动画效果
      if(flag){
        //   关闭节流阀
          flag = false;
        // 先判断，再移位，最后调用动画函数
        // 当图片是最后一张时，立即改变轮播图模块的left值
        if (num == t_img.children.length - 1) {
            num = 0;
            t_img.style.left = 0 + 'px';
        }
        // 移动定位
        num++;
        // 调用动画移动函数
        animate(t_img, -num * boxWidth,function(){
            flag = true;
        });
        // 8.点击右侧按钮，小圆圈跟随变化
        cricle++;
        // 如果circle==t_img.children.length-1时，说明已经走到最后一张图了
        if (cricle == t_img.children.length - 1) {
            cricle = 0;
        }
        // 将所有的小圆圈清楚类名
        for (var i = 0; i < select.children.length; i++) {
            select.children[i].className = '';
        }
        // 将当前小圆圈改成选中色
        select.children[cricle].className = 'current';
      }
    })
    // 9.点击左侧按钮，图片就滚动一张
    arrow_l.addEventListener('click', function () {
        // 当节流阀为true时，执行动画效果
        if(flag){
            //   关闭节流阀
            flag =false;
            // 当图片是第一张时，立即改变轮播图模块的left值
        if (num == 0) {
            num = t_img.children.length - 1;
            t_img.style.left = -num * boxWidth + 'px';
        }
        // 移动定位
        num--;
        // 调用动画移动函数
        animate(t_img, -num * boxWidth,function(){
            flag = true;
        });
        // 10.点击左侧按钮，小圆圈跟随轮播图向左走一步
        cricle--;
        // 当cricle<0时 ，说明已经走到最后一张图了
        if (cricle < 0) {
            cricle = t_img.children.length - 2;
        }
        // 将所有的小圆圈改变默认颜色
        for (var i = 0; i < select.children.length; i++) {
            select.children[i].className = '';
        }
        // 将对应的小圆圈改变底色
        select.children[cricle].className = 'current';
        }
    })

    // 11.自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用鼠标点击事件
        arrow_r.click();
    }, 2000)
})