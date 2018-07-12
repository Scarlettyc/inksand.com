(function($){
	var ua = navigator.userAgent;
	var isMobile = /mobile/gi.test(ua);
	var on_Click = isMobile ? 'touchstart' : 'click';
	var isIOS = /ipad|iphone|mac/gi.test(ua);
	var isAndroid  = /android/gi.test(ua);

	if(isIOS){
		$('.android').parent().hide();
		$('.ios').css({margin:0})
	}
	if(isAndroid){
		$('.ios').parent().hide();
		$('.android').css({margin:0})
	}

	var cache = {
		indexActive : 0,
		index : 0,
		animateActive : '',
		position : 0
	};

	var _index = 0;
	var _lateTime = 400;
	var _firstAnminate = $('#first_anminate');
	var _secondAnminate = $('#second_anminate');
	var _list = $('.list');
	var _max = _list.length;

	var isAnminate = false
	var addNoFirst =function(){
		// if(!_index){
		// 	$('header').removeClass('no-first');
		// }
		// else{
		// 	$('header').addClass('no-first');
		// }

		// if(_index!=1){
		// 	$('header').removeClass('header-lang');
		// }

	}

	if(isMobile){
		//移动端

		$('.scroll-down,.scroll-up').hide();
		
		var tab_isDrag = false, tab_y = 0, tab_end_y = 0;

		function tab_start(e){
			if (e.targetTouches.length == 1){
				tab_isDrag = true;
				//e.preventDefault();// 阻止浏览器默认事件，重要 
				var touch = e.targetTouches[0];
				tab_y = touch.pageY;
				tab_end_y = touch.pageY;
			}
		}

		function tab_move(e){
			if (e.targetTouches.length == 1){
				e.preventDefault();// 阻止浏览器默认事件，重要 
				if(!tab_isDrag){
					return;
				}

			    var touch = e.targetTouches[0];
			    	tab_end_y = touch.pageY;
			}
		}

		function tab_end(){
			var isMove = false;
			if(tab_end_y - tab_y < -100){
				if(cache.index >= _max-1){
					tab_end_y = 0;
					tab_y = 0;
					return;
				}

				_index++;

				_list.eq(cache.index).css({'transform' : 'translate3d(0, -100%, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				_list.eq(_index).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				isMove = true;


			}
			else if(tab_end_y - tab_y > 100){
				if(cache.index <=0){
					tab_end_y = 0;
					tab_y = 0;
					return;
				}
				_index --;
				_list.eq(cache.index).css({'transform' : 'translate3d(0, 100%, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				_list.eq(_index).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				isMove = true;
			}

			if(isMove){
				setTimeout(function(){
					// if(_index%2){
					// 	$('header').addClass('header');

					// }else{
					// 	$('header').removeClass('header');
					// }

					$('.con-list-items').css({'transform':''}).removeClass('con-list-active');
					$('.progress-list').css({'transform' : ''});
					addNoFirst();
					
					_list.eq(cache.index).removeClass('active').css({'transition':''});
					_list.eq(_index).addClass('active').css({'transition':''});
					cache.index = _index;
					cache.position = 0;
					
					tab_end_y = 0;
					tab_y = 0;

					$('#nav li').removeClass('active').eq(_index).addClass('active');
				},800);

			}
			
			tab_isDrag = false;
			
		}

		var tab_content = document.getElementById("tab_content")
		tab_content.addEventListener("touchstart",tab_start,false);
		tab_content.addEventListener("touchmove",tab_move,false);
		tab_content.addEventListener("touchend",tab_end,false);


		$('#nav').on(on_Click, 'li a', function(){
			var _self = $(this), _parent = _self.parent(), _num = _parent.index();
			_parent.addClass('active').siblings().removeClass('active');


			$('.head-nav').css({transform:''});

			var isMove = false;
			_index = _num;

			if(cache.index > _index){
				_list.eq(cache.index).css({'transform' : 'translate3d(0, 100%, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				_list.eq(_num).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});

				isMove = true;

				$('.list:gt('+_index+')').css({'transform' : 'translate3d(0, 100%, 0)'});
			}
			else if(cache.index < _index){
				_list.eq(cache.index).css({'transform' : 'translate3d(0, -100%, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				_list.eq(_index).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});
				isMove = true;

				$('.list:lt('+_index+')').css({'transform' : 'translate3d(0, -100%, 0)'});
			}
			else{

			}

			if(isMove){
				setTimeout(function(){
					// if(_index%2){
					// 	$('header').addClass('header');

					// }else{
					// 	$('header').removeClass('header');
					// }

					$('.con-list-items').css({'transform':''}).removeClass('con-list-active');
					$('.progress-list').css({'transform' : ''});
					addNoFirst();

					_list.eq(cache.index).removeClass('active').css({'transition':''});
					_list.eq(_index).addClass('active').css({'transition':''});

					cache.index = _index;
					cache.position = 0;

				},800);
			}

			return false;
		});

	}
	else{
		//PC端 
		var scrollFunc=function(e){
		
	 		var direct=0;
	    	e=e || window.event;
	    	if(e.wheelDelta){//IE/Opera/Chrome

	        	e.wheelDelta > 0 ? newPrev() : newNext();

		   	}else if(e.detail){//Firefox

		        e.detail > 0 ? newNext() : newPrev();
		    }

		}

		$('#nav').on('click','li a',function(){
			var _self = $(this) , _parent = _self.parent();
			var _ind = _parent.index();
			if(_ind > cache.index){
				newNext(_ind);
			}
			else if(_ind < cache.index){
				newPrev(_ind);
			}
			else{

			}

			return false;
		});

		$('.scroll-down').on('click',function(){
			newNext();
			return false;
		});

		$('.scroll-up').on('click',function(){
			newPrev();
			return false;
		});


		var newNext = function(k){
			if(isAnminate){
				return;
			}

			if(typeof k ==='number'){
				_index = k;
			}
			else{
				_index ++;
			}

			if(_index >= _max){
				_index = _max -1;
				return;
			}

			isAnminate = true;

			_list.eq(cache.index).css({'transform' : 'translate3d(0, -100%, 0)', 'transition' : 'all 1.6s cubic-bezier(.47, 0, .745, .715)'});
			_list.eq(_index).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)'});

			addNoFirst(); 
			setTimeout(function(){

				// if(_index%2){
				// 	$('header').addClass('header');

				// }else{
				// 	$('header').removeClass('header');
				// }

				$('#nav li:eq('+_index+')').addClass('active');
				$('#nav li:eq('+_index+')').siblings().removeClass('active');

				_list.eq(_index).css({'transition' : '',}).addClass('active');
			},800);

			setTimeout(function(){
				isAnminate = false;

				_list.eq(cache.index).css({'transition' : ''}).removeClass('active');

				$('.con-list-items').css({'transform':''}).removeClass('con-list-active');

				cache.index = _index;

				$('.list:lt('+_index+')').css({'transform' : 'translate3d(0, -100%, 0)'});

				$('.progress-list').css({'transform' : ''});
				cache.position = 0;
			},1600);
		}

		var newPrev = function(k){
			if(isAnminate){
				return;
			}

			if(typeof k ==='number'){
				_index = k;
			}
			else{
				_index --;
			}
			
			if(_index < 0){
				_index = 0;
				return;
			}

			isAnminate = true;

			_list.eq(cache.index).css({'transform' : 'translate3d(0, 100%, 0)', 'transition' : 'all 1.6s cubic-bezier(.47, 0, .745, .715)'});
			_list.eq(_index).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 0.8s cubic-bezier(.47, 0, .745, .715)','z-index':'2'});

			addNoFirst(); 
			setTimeout(function(){

				// if(_index%2){
				// 	$('header').addClass('header');

				// }else{
				// 	$('header').removeClass('header');
				// }

				$('#nav li:eq('+_index+')').addClass('active');
				$('#nav li:eq('+_index+')').siblings().removeClass('active');

				_list.eq(_index).css({'transition' : ''}).addClass('active');
			},800);

			setTimeout(function(){
				isAnminate = false;

				_list.eq(cache.index).css({'transition' : ''}).removeClass('active');
				_list.eq(_index).css({'z-index':''});

				$('.con-list-items').css({'transform':''});

				cache.index = _index;

				$('.list:gt('+_index+')').css({'transform' : 'translate3d(0, 100%, 0)'});

				$('.progress-list').css({'transform' : ''});
				cache.position = 0;
			},1600);
		}


		/*注册事件*/
		if(document.addEventListener){
		    document.addEventListener('DOMMouseScroll',scrollFunc,false);
		}//W3C

		window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
	}

	





	/*
	* 	首屏幻灯片 切换
	*/
	(function(){
		var _slogan = $('.slogan'),
			time = 5000,
			animateActive = '',
			cacheIndex = 0,
			index = 0,
			len = _slogan.length,
			_child = $('.slogan-title').children();
			isAnminate = false;

			fn = function(k){
				if(k == index){
					return;
				}

				if(typeof k ==='number'){
					index = k;
				}
				else{
					index ++;
				}
				
				if(index >= len){
					index = 0;
				}

				//切换动画

				_slogan.eq(index).css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 1s ease-in-out'});
				_slogan.eq(cacheIndex).css({'transform' : 'translate3d(-100%, 0, 0)', 'transition' : 'all 1s ease-in-out'});

				_child.eq(cacheIndex).addClass('slogan-opacity');
				_child.eq(index).addClass('slogan-text-one').removeClass('slogan-text-two');

				var _next = index + 1;
				if(_next >=len){
					_next = 0;
				}

				_child.eq(_next).addClass('slogan-text-two').removeClass('slogan-text-three');

				setTimeout(function(){
					_child.eq(cacheIndex).removeClass('slogan-text-one slogan-opacity').addClass('slogan-text-three').css({'opacity':0});
				},500);

				setTimeout(function(){
					_child.eq(cacheIndex).css({'opacity':'','transition' : 'all 0.4s ease-in-out'});
				},600);

				setTimeout(function(){
					_slogan.eq(index).css({'transition' : ''});
					_slogan.eq(cacheIndex).css({'transform' : 'translate3d(100%, 0, 0)','transition' : ''});
					_child.eq(cacheIndex).css({'transition' : ''});
					cacheIndex = index;

				},1000);

					
				animateActive = setTimeout(fn, time);
			}

		animateActive = setTimeout(fn, time);

	})();
	
	/*
	*	切换下一页面窗口
	*/
	$('.next').on(on_Click,function(){
		var _self =$(this), _parent = _self.parent();

		_parent.css({'transform' : 'translate3d(-100%, 0, 0)', 'transition' : 'all 1s ease-in-out'});
		_parent.next().css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 1s ease-in-out'});

		// if(_self.attr('data-class')){
		// 	$('header').addClass('header-lang');
		// }
		// else{
		// 	$('header').removeClass('header-lang');
		// }

		setTimeout(function(){
			_parent.next().addClass('con-list-active').siblings().removeClass('con-list-active');
			_parent.css({'transition' : ''}).next().css({'transition' : ''})
		},1000);

		return false;
	});

	$('.prev').on(on_Click,function(){
		
		var _self =$(this), _parent = _self.parent();

		_parent.css({'transform' : 'translate3d(100%, 0, 0)', 'transition' : 'all 1s ease-in-out'});
		_parent.prev().css({'transform' : 'translate3d(0, 0, 0)', 'transition' : 'all 1s ease-in-out'});

		// if(_self.attr('data-class')){
		// 	$('header').addClass('header-lang');
		// }
		// else{
		// 	$('header').removeClass('header-lang');
		// }
		
		setTimeout(function(){
			_parent.prev().addClass('con-list-active').siblings().removeClass('con-list-active');
			_parent.css({'transition' : ''}).prev().css({'transition' : ''})

		},1000);

		return false;
	});

	/*
	*
	*/
	(function(){
		var _progressList = $('.progress-list');
		var _li =_progressList.children();
		var _len = _li.length;

		var _baseWidth = _li.eq(1).width();

		var _sum = _baseWidth * _len ;

		_progressList.css('width',_sum+'px');


		var _winWidth = $(window).width() / 2;
		var _width = _progressList.children().eq(1).width();

		var progressLeft ='';
		var progressRight ='';
		var sportTime = 20;
		var progressLeftFn = function(){
			cache.position --;

			var val = 0;
			if(cache.position < 0){
				cache.position = 0;
				clearTimeout(progressLeft);
				return;
			}
			else{
				val = '-' + cache.position + 'px';
			}
			
			_progressList.css({'transform' : 'translate3d(' +val +', 0, 0)'});
			progressLeft = setTimeout(progressLeftFn,sportTime);
		}
		var progressRightFn = function(){
			cache.position ++;

			if (cache.position > (_sum -_winWidth*2) +190) {
				cache.position = (_sum - _winWidth*2) + 190;

				clearTimeout(progressRight);

				return;
			}

			var val  = '-' + cache.position + 'px';

			_progressList.css({'transform' : 'translate3d(' +val +', 0, 0)'});
			progressRight = setTimeout(progressRightFn,sportTime);
		}

		var x, isDrag = false, value = 0;

		if(isMobile){

			function fn_start(e){
				if (e.targetTouches.length == 1){
					isDrag = true;
					e.preventDefault();// 阻止浏览器默认事件，重要 
					var touch = e.targetTouches[0];
					x = touch.pageX;
				}
			}

			function fn_move(e){
				if (e.targetTouches.length == 1) {
					e.preventDefault();
					
				    if(!isDrag){
						return;
					}

				    var touch = e.targetTouches[0];

					var posX = touch.pageX - x;
						value = cache.position - posX;

					if(value > (_sum -_winWidth*2) +32){
						value = (_sum -_winWidth*2) +32;
					}
					if(value <0){
						value = 0;
					}

					var val  = '-' + value + 'px';
					_progressList.css({'transform' : 'translate3d(' +val +', 0, 0)'});

				}
			}

			function fn_end(){
				cache.position = value;
				isDrag = false;
			}
			_progressList.css('left','2rem');
			var progress = document.getElementById("progress")
			progress.addEventListener("touchstart",fn_start,false);
			progress.addEventListener("touchmove",fn_move,false);
			progress.addEventListener("touchend",fn_end,false);
		}
		else{
			//PC端的事件	

			$('.progress-left').on('mouseenter',function(){
				progressLeft = setTimeout(progressLeftFn,sportTime);
			}).on('mouseleave',function(){
				clearTimeout(progressLeft);
			});

			$('.progress-right').on('mouseenter',function(){
				progressRight = setTimeout(progressRightFn,sportTime);
			}).on('mouseleave',function(){
				clearTimeout(progressRight);
			});

			//点击事件
			_progressList.on('click','li a',function(){
				clearTimeout(progressLeft);
				clearTimeout(progressRight);
				
				var _self =  $(this), _parent = _self.parent();

				var _ind = _parent.index();

				var _val = _ind * _width - _winWidth +  190;


				if(_val < 0){
					_val = 0;
					cache.position = _val;
				}
				else if(_val >= (_sum -_winWidth*2) +190){
					_val = (_sum -_winWidth*2) +190;
					cache.position = _val;
					_val = '-' + _val + 'px';
				}
				else{
					cache.position = _val;
					_val = '-' + _val + 'px';
				}


				_progressList.css({'transform' : 'translate3d(' +_val +', 0, 0)', 'transition' : 'all .4s ease-in-out'});

				_parent.addClass('active').siblings().removeClass('active');
				
				setTimeout(function(){
					_progressList.css({'transition' : ''})
				},400)
			});

			
			$('.progress').on('mousedown',function(event){

				isDrag = true;
				x = event.pageX;
			});

			$(document).on('mousemove',function(event){
				 if (event && event.preventDefault) {//如果是FF下执行这个
	 
				        event.preventDefault();
				 
				    }else{ 
				 
				        window.event.returnValue = false;//如果是IE下执行这个
				 
				    }
				
				if(!isDrag){
					return;
				}

				var posX = event.pageX - x;
					value = cache.position - posX;

				if(value > (_sum -_winWidth*2) +190){
					value = (_sum -_winWidth*2) +190;
				}
				if(value <0){
					value = 0;
				}

				var val  = '-' + value + 'px';

				_progressList.css({'transform' : 'translate3d(' +val +', 0, 0)'});
			});

			$(document).on('mouseup',function(){
				cache.position = value;
				isDrag = false;
			});
		}

	})();

	/*
		**
	*/

	var setTop = function(){
		var baseHeight = 28;

		$('.progress-list li.res').each(function(){
			var _div = $(this).children('div.info-con');
			var _hei = _div.outerHeight();
			_div.css('top','-' + (_hei + baseHeight) + 'px');
		});
	};

	
	


	window.onload =function(){
		$('.loading').addClass('c-hide');
		$('.list').show();

		setTop();
		$(window).on('resize',function(){
			setTop();
		});
		

		function loadScript(url, callback){ 
			var script = document.createElement("script") 
			script.type = "text/javascript"; 

			if (script.readyState){ //IE 
				script.onreadystatechange = function(){ 
					if (script.readyState == "loaded" || script.readyState == "complete"){ 
						script.onreadystatechange = null; 
						callback(); 
					} 
				}; 
			} else { //Others: Firefox, Safari, Chrome, and Opera 
				script.onload = function(){ 
					callback(); 
				}; 
			} 
			script.src = url; 

			document.body.appendChild(script); 
		}
		
		loadScript('https://cdn.flurry.com/js/flurry.js',function(){
			FlurryAgent.startSession("7BJ4ZSJB2GPDFXS8NGN9");
		});
	}

	$('.menus').on(on_Click,'a',function(){
		$('.head-nav').css({transform:'translate(0,0)'});
		return false;
	});

	$('.close-lang').on(on_Click,function(){
		$('.head-nav').css({transform:''});
		return false;
	})

})($);