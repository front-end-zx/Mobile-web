var banner = function(){
	// 1.自动轮播图且无缝  定时器 ++ 过渡
	// 2.点要随着图片的轮播进行实现  根据索引切换
	// 3.滑动效果  touch
	// 4.滑动结束的时候  如果滑动的距离不超过屏幕的1/3  吸附回去
	// 5.滑动结束的时候  如果滑动的距离超过屏幕的1/3  切换（上一张/下一张）
	var bannerBox = document.querySelector('.jd_banner')
	var width = bannerBox.offsetWidth;
	var imgBox = bannerBox.querySelectorAll('ul')[0];
	var dotBox = bannerBox.querySelectorAll('ul')[1];
	var dots = dotBox.querySelectorAll('li');
	console.log(dots);
	// 设置当前图片的索引值
	var index = 0;
	// 判断是否滑动
	var isMove = false;
	// 设置过渡属性的函数
	var setTransition = function(){
		imgBox.style.transition = "all 0.5s";
		imgBox.style.webkitTransition = "all 0.5s";
	};
	// 添加过渡效果的函数
	var addTransform = function(translatex){
		imgBox.style.transform = "translateX("+translatex+"px)";
		imgBox.style.webkitTransform = "translateX("+translatex+"px)";
	}
	// 清除过渡效果的函数
	var clearTransform = function(){
		imgBox.style.transition = "none";	
		imgBox.style.webkitTransition = "none";
	}
	var timer = setInterval(function(){
		index++;
		setTransition();
		addTransform(-index*width);
	},1000);
	imgBox.addEventListener("transitionend",function(){
		// 让下面的点跟随
		for(var i=0;i<dots.length;i++){
			dots[i].classList.remove('now');
		}
		if(index<8){
			dots[index].classList.add('now');
		}else if(index=8){
			dots[0].classList.add('now');
		}
		// 当图片滑动到最后一张的时候，立即切换到第一张
		if(index>=8){
			index = 0;
			clearTransform();
			addTransform(-index*width);
		}else if(index<0){
			index = 8;
			clearTransform();
			addTransform(-index*width);
		}
	});
	var startx = 0;
	var distance = 0;
	// 轮播图滑动：实质是让dom元素跟随手指的滑动来做位置的移动
	imgBox.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startx = e.touches[0].clientX;
	});
	imgBox.addEventListener('touchmove',function(e){
		movex = e.touches[0].clientX;
		distance = movex-startx;
		var translatex = -index*width+distance;
		clearTransform();
		addTransform(translatex);
		isMove = true;
	});
	imgBox.addEventListener('touchend',function(e){
		// 判断滑动的距离是否大于当前图片宽度的1/3
		// 如果小于1/3，则吸附回来
		if(isMove){
			if(Math.abs(distance)<width/3){
				setTransition();
				addTransform(-index*width);
			}else{
			// 手指头向右滑动
			if(distance>0){
				index--;
			}else{
				// 手指头向左滑动
				index++
			}
			setTransition();
			addTransform(-index*width);
		}
		// 重置参数
	}
	startx = 0;
	distance = 0;
	isMove = false;
	clearInterval(timer);
	timer = setInterval(function(){
		index++;
		setTransition();
		addTransform(-index*width);
		// 让下面的点跟随
		for(var i=0;i<dots.length;i++){
			dots[i].classList.remove('now');
		}
		if(index<8){
			dots[index].classList.add('now');
		}else{
			dots[0].classList.add('now');
		}
	},1000)
});
};