window.addEventListener('load',function(){
        var box = document.querySelector('.preview');
        var mask = document.querySelector('.mask');
        var big = document.querySelector('.big');
        var btn =  document.querySelector('button');
        // 1.当鼠标经过box时，显示和隐藏 mask和big
        box.addEventListener('mouseover',function(e){
            mask.style.display = 'block';
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            if(x<0||x>this.offsetWidth||y<0||y>this.offsetHeight){
                big.style.display= 'none';
            }else{
                big.style.display= 'block';
            }
            
        })
        box.addEventListener('mouseout',function(){
            mask.style.display = 'none';
            big.style.display= 'none';
        })

        box.addEventListener('mousemove',function(e){
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            // 2.让放大镜跟随鼠标在图像上移动

            // 让鼠标始终在mask中心
            var maskX = x-mask.offsetWidth/2;
            var maskY = y-mask.offsetHeight/2;
            // 计算mask最大移动距离
            var maskMax = box.offsetWidth-mask.offsetWidth;
            
            // 当鼠标不在图像区域时控制mask活动区域
            if(maskX<0){
                maskX = 0;
            }else if(maskX>maskMax){
                maskX=maskMax;
            }

            if(maskY<0){
                maskY = 0;
            }else if(maskY>maskMax){
                maskY=maskMax;
            }

            // 设置mask的定位
            mask.style.left = maskX+'px';
            mask.style.top = maskY+'px';

            // 3.让大图跟随放大镜移动

            var bigImg = document.querySelector('.bigImg');
            // 大图的最大移动距离
            var bigMax = bigImg.offsetWidth - big.offsetWidth;

            // 大图需要移动的距离
            var bigX = maskX*bigMax/maskMax;
            var bigY = maskY*bigMax/maskMax;
            // 赋值
            bigImg.style.left= -bigX+'px';
            bigImg.style.top = -bigY+'px';
        })
        btn.addEventListener('click',function(){
            console.log('1111111111');
        })
})