/**
 * Created by Administrator on 10/10 0010.
 */

+function (z) {
    //构造函数
    function Masonry(conatiner, config) {
        //图片容器
        this.conatiner = conatiner;
        //配置对象
        this.config = config;
        this.config.clos = this.config.clos || parseInt(this.conatiner.offsetWidth / (this.config.imgWidth + this.config.imgLeft));
        console.log(this.config.clos);
        this.config.imgLeft = this.config.imgLeft || 10;
        this.config.imgTop = this.config.imgTop || 10;
        //初始化存放高度的数组
        //left 高度数组
        this.arrHeightLeft = [];
        //right 高度数组
        this.arrHeightRight = [];
        //距离左边的相对位置数组
        this.arrLeft = [];
        this._init();

    }

    //方法名前边加一下划线_init表示该方法是私有的不对外调用
    Masonry.prototype._init = function () {
        this.conatiner.style.position = "relative";
        for (var i = 0; i < this.config.clos; i++) {
            this.arrHeightLeft.push(20);
            this.arrHeightRight.push(20);

            this.arrLeft.push((this.config.imgWidth + this.config.imgLeft) * i + this.config.imgLeft);
        }

    };
    var rows = 0;
    /**
     *
     * @param ele
     * @param select  0代表右边  1代表左边
     * @param x e.clientX-差值（鼠标在图片中的坐标x）
     * @param y e.clientY-差值（鼠标在图片中的坐标y）
     */
    Masonry.prototype.appendElem = function (ele, select, x, y) {
        /**
         * 瀑布流布局
         *      数组存放每一列的高度
         *      初始化时[0,0,0]
         *      从数组中找到做小的  序号 和 值
         *      依照序号放图片
         *      更新数组
         */
        //select表示左边还是右边 1:左边  0右边


        //找到this.arrHeight中最小的值和序号
        var oMin;
        if (select) {  //select = 1时  更新左边数组
             oMin = getMin(this.arrHeightLeft);
        } else {
             oMin = getMin(this.arrHeightRight);
        }

        ele.style.position = "absolute";
        ele.style.left = (x - this.conatiner.offsetLeft) + "px";
        ele.style.top = (y - this.conatiner.offsetTop) + "px";

        //设置自定义属性列号
        ele.setAttribute("data-num", oMin.index);
        //设置自定义属性行号
        ele.setAttribute("data-num2", ++rows);


        this.conatiner.appendChild(ele);
        var that = this;
        setTimeout(function () {
            ele.style.top = oMin.value + "px";
            ele.style.left = that.arrLeft[oMin.index] + "px";
        }, 1);


        if(select){ //1 代表左边  更新左边数组高度
            this.arrHeightLeft[oMin.index] += ele.offsetHeight + this.config.imgTop;
        }else{  //0 代表左边  更新右边边数组高度
            this.arrHeightRight[oMin.index] += ele.offsetHeight + this.config.imgTop;
        }

    };

    Masonry.prototype.changeHeight = function (ele, select,dNum) {

        if(select){
            this.arrHeightLeft[dNum] -= (ele.offsetHeight + this.config.imgTop);
        }else{
            this.arrHeightRight[dNum] -= (ele.offsetHeight + this.config.imgTop);

        }
    };
    //查找数组中的最小值和序号
    function getMin(arr) {
        var temp = arr[0];
        var index = 0;
        for (var l = 1; l < arr.length; l++) {
            if (temp > arr[l]) {
                temp = arr[l];
                index = l;
            }
        }
        return {
            index: index,
            value: temp
        }
    }

    z.Masonry = Masonry;
}(window);

