// 需求1：实现顶部搜索框随着页面的滚动，透明度增加

var search = function(){
	var searchBox = document.querySelector('.jd_search_box');
	// 当滚动到轮播图底部的时候，透明度不再发生改变
	var banner = document.querySelector('.jd_banner');
	var height = banner.offsetHeight;
	var opaciety = 0;
	// 页面以便滚动，搜索框的盒子的透明度一直发生变化
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop;
		if(scrollTop<height){
			opaciety = scrollTop/height*0.9;
		}else{
			opaciety = 0.9;
		}
		searchBox.style.background = 'rgba(201,21,35,'+opaciety+')';
	}
}

// 需求2.轮播图
var banner = function(){
	var bannerBox = document.querySelector('.jd_banner');
	var imgBox = bannerBox.querySelectorAll('ul')[0];
	var width = bannerBox.offsetWidth;
	var dotBox = bannerBox.querySelectorAll('ul')[1];
	var dots = dotBox.querySelectorAll('li')
	// 1. 实现图片的自动轮播
	var index = 0;
	// 动画过渡效果的函数
	var setTransition = function(){
		imgBox.style.transition = "all 0.5s";
		imgBox.style.webkitTransition = "all 0.5s";
	}
	// 清除动画效果的函数
	var removeTransition = function(){
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	}
	var addTransform = function(translatex){
		imgBox.style.transform = "translateX("+translatex+"px)";
		imgBox.style.webkitTransform = "translateX("+translatex+"px)";
	}
	var timer = setInterval(function(){
		index++;
		// 设置动画属性
		setTransition();
		// 添加动画效果
		addTransform(-index*width);
	},1000);
	// 监听imgBox的变化，当到最后一张照片的时候，直接跳转到第一张
	imgBox.addEventListener('transitionend',function(){
		if(index>=8){
			index = 0;
			removeTransition();
			addTransform(-index*width);
		}else if(index<0){
			index = 8;
			removeTransition();
			addTransform(-index*width);
		}
		for(var i=0; i<dots.length;i++){
			dots[i].classList.remove('now');
		}
		if(index<8){
			dots[index].classList.add('now');
		}else if(index>=8){
			dots[0].classList.add('now');
		}
	});
	// 2.屏幕跟随屏幕的移动而移动
	var startx = 0;
	var distance = 0;
	imgBox.addEventListener('touchstart',function(e){
		clearInterval(timer);
		startx = e.touches[0].clientX;
	});
	imgBox.addEventListener('touchmove',function(e){
		movex = e.touches[0].clientX;
		distance = movex - startx;
		// imgBox的移动距离就等于当前位置加上移动端距离
		var translatex = -index*width + distance;
		removeTransition();
		addTransform(translatex);
	});
	imgBox.addEventListener('touchend',function(){
		// 如果移动的距离大于当前width的1/3则移动过去，反之吸附回来
		if(Math.abs(distance)<width/3){
			setTransition();
			addTransform(-index*width);
		}else{
			// 移动的时候需要考虑一下两种情况
			if(distance>0){
				index--;
			}else{
				index++;
			}
			setTransition();
			addTransform(-index*width);
		}
		startx = 0;
		distance = 0;
		timer = setInterval(function(){
			index++;
			// 设置动画属性
			setTransition();
			// 添加动画效果
			addTransform(-index*width);
	},1000)

	})
}
// 3.实现倒计时效果
var downTime = function(){
	var timeBox = document.querySelector('.time').querySelectorAll('span');
	var time = 2*60*60;
	var timer = setInterval(function(){
		time--;
		var h = Math.floor(time/3600);
		var m = Math.floor(time%3600/60);
		var s = Math.floor(time%60);

		timeBox[0].innerHTML = Math.floor(h/10);
		timeBox[1].innerHTML = h%10;
		timeBox[3].innerHTML = Math.floor(m/10);
		timeBox[4].innerHTML = m%10;
		timeBox[6].innerHTML = Math.floor(s/10);
		timeBox[7].innerHTML = s%10;
	},1000)
	if(time<=0){
		clearInterval(timer);
	}
}
search();
banner();
downTime();