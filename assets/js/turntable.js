;(function(win,$){
	
	var turntable = function(options){
		this.options = {
			even_el:'.turntable .arr',//启动元素
			el: '.turntable .tt_bg',//旋转元素
			turn_item: '.turntable .turn_item',//奖项元素
			turn_num: '0',//奖项个数
			turn:function(){},//开始转盘 num：所中奖项
			tuan_ing: false,
			turnEnd:function(){},//转动结束
			default_num: 5,//默认旋转圈数
			turnStart:function(){},
			item_num:'0',
		}
		$.extend(this.options,options);
		this.init();
	} 

	turntable.prototype.constructor = turntable;

	turntable.prototype.init=function(){
		var _this = this;
		var turn_item = $(_this.options.turn_item),//奖项元素
				turn_num = turn_item.size(),//奖项个数
				angle = parseFloat(360/turn_num); //每个奖项的弧度

		_this.options.turn_num = turn_num;
		
		var turn_warp_w = turn_item.parent().width();//获取奖项父类的width,用于求算奖项width
		
		var item_w = Math.ceil(turn_warp_w * (Math.tan((angle/2)*Math.PI/180))); // 根据奖项个数不同设置每个奖项的width
		turn_item.each(function(idx){
			$(this).css({"width":item_w+2+"px","transform":"translateX(-50%) rotate("+ angle * idx +"deg)"})
		});
		
		$(_this.options.even_el).on("click",function(){
			_this.options.turn();
			_this.turnStart(_this.options.item_num);
		});

		$(_this.options.el).on("transitionend",function(){
			var deg = 360 - $(_this.options.el).attr("data-deg");//先获取当前角度
			$(_this.options.el).css({
				"transform":"rotate("+deg+"deg)",
				"transition":"none"
			})	
			_this.options.turnEnd();
		})
		
	}

	turntable.prototype.turnStart= function(num){
		// 根据中奖等级 转动到指定角度
		var _this = this;
		var turn_num = _this.options.turn_num,
				angle =	parseFloat(360/turn_num);

		var deg = (num - 1) * angle;

		var rotateEnd = _this.options.default_num * 360 - deg;
    $(_this.options.el).css({
        transform: 'rotate(' + rotateEnd + 'deg)',
        transition: 'all 5s'
    })
    $(_this.options.el).attr('data-deg',deg);
    console.log(deg);
	}	


	if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
    module.exports = turntable;
	} else if (typeof define === 'function' && define.amd) {
    define(function () {
        return turntable;
    });
	} else {
    window.turntable = turntable;
	}

}(window,$))