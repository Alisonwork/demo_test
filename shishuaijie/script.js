function accirion(id,option) {
    var p = document.getElementById(id);
    //默认用户信息
    var defaultOption = {
        smallWidth: 130,
        smallHeight: 40,
        activeWidth: 340,
        activeHeight: 400,
        time:300
    }


    //合并两个对象（defaultoption,option)
    var a_option = Object.assign({}, defaultOption, option);
    if (option.row * option.col != p.children.length) {
        throw('option.row*option.col=' + p.children.length)
    }
    //设置父元素宽度
    p.style.width=a_option.activeWidth+a_option.smallWidth*(a_option.col-1)+'px';
    
    var time1 = new Date().getTime();//函数执行时的时间戳
    var timer =null;

    var activePic = function (index) {
        clearTimeout(timer)
        var time2 = new Date().getTime();//当鼠标划入时的时间戳
        if(time2-time1<a_option.time){
            timer = setTimeout(function () {
                activePic(index);
            },a_option.time)
            return false;
        }
        time1=time2;






        var cx = (index % a_option.col);  //将下标转换为坐标，匹配到下标值
        // console.log(cx);
        var cy = Math.floor(index / a_option.col);
        // console.log(cy);
        for (x = 0; x < a_option.col; x++) {
            for (y = 0; y < a_option.row; y++) {
                var cindex = x+y*a_option.col;//x=3,y=0
                console.log(cindex)
                var item = p.children[cindex]
                if (cx == x && cy == y) {
                    item.style.width = a_option.activeWidth + 'px';
                    item.style.height = a_option.activeHeight + 'px';
                } else if (cx == x) {
                    item.style.height = a_option.smallHeight + 'px';
                    item.style.width = a_option.activeWidth + 'px';
                } else if (cy == y) {
                    item.style.width = a_option.smallWidth + 'px';
                    item.style.height = a_option.activeHeight + 'px';
                } else {
                    item.style.width = a_option.smallWidth + 'px';
                    item.style.height = a_option.smallHeight + 'px';
                }
            }
        }

    }
    activePic(0)

    for(i=0;i<p.children.length;i++){
        p.children[i].ind = i;
        p.children[i].style.transition = "all "+a_option.time/1000+"s";
        p.children[i].onmouseenter = function () {
            activePic(this.ind);
        }
    }
}