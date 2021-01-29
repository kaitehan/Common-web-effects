function animate(obj, target,callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
            // 步长值写到定时器里面
            // 把步长值该为整数
            var step = (target - obj.offsetLeft) / 10;
            // 当step>0时往向上取值，反之则向小取值
            step = step > 0 ? Math.ceil(step):Math.floor(step);

            if (obj.offsetLeft === target) {
                // 停止动画，本质就是停止定时器
                clearInterval(obj.timer);
                // 回调函数放到定时器结束后执行，先判断是否有回调函数，有则执行
                // if(callback){
                //     callback();
                // }
                // &&是短路运算符，当遇到一个不为真时就停止后面的操作
                callback && callback();
            }
            // 将每次步长值该为逐渐变小的值  
            obj.style.left = obj.offsetLeft + step + 'px';
        },
        15)
}