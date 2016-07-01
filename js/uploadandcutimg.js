
$(function(){
	$('#upload').change(function(){
		var imgcon = $('.previewwrap');
		if (this.files && this.files[0]) {
			var filename = this.files[0].name;
			var subfile = filename.split('.');
			var subfilelen = subfile.length;
			var last = subfile[subfilelen-1].toLowerCase();
			var tp ="jpg,gif,bmp,png,jpeg";
			var rs=tp.indexOf(last);
			if(rs>=0){
				var reader = new FileReader();
				$('.popcon').show();
				reader.onload = function(evt){
					// alert(evt.target.result);
					imgcon.html('<div class="imgwrap clearfix"><img class="imgpreview1" src="'+ evt.target.result + '"/>\
						<img class="imgpreview2" src="'+ evt.target.result + '"/>\
						<div id="main">\
							<div class="mindiv1"></div>\
							<div class="mindiv2"></div>\
							<div class="mindiv3"></div>\
							<div class="mindiv4"></div>\
							<div class="mindiv5"></div>\
							<div class="mindiv6"></div>\
							<div class="mindiv7"></div>\
							<div class="mindiv8"></div>\
						</div></div>\
						<div class="mainprevie"><img class="imgpreview3" src="'+ evt.target.result + '"/>\
						</div>');
					var imgw = $('.imgpreview1').width();
					var imgh = $('.imgpreview1').height();
					var imgbw = imgw*2+10;
					$('.previewwrap').css({width:imgbw,height:imgh});
					$('.imgwrap').css({width:imgw,height:imgh,'float':'left'});
					$('.mainprevie').css({width:imgw,height:imgh,overflow:'hidden','float':'left','margin-left':10,'position':'relative'});
					document.onselectstart = new Function('event.returnValue=false;');
					$( "#main" ).draggable({ containment: 'parent' ,drag: setChoice,stop:setChoice});
					var rightDiv = $(".mindiv5");
					var mainDiv = document.getElementById("main");
					var ifKeyDown = false; //鼠标按下的状态
					var contact = "";//表示被按下的触点
					// 鼠标按下事件
					// 右边触点按下
					$(".mindiv5").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "right";
					});
					// 上面触点按下
					$(".mindiv2").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "up";
					});
					// 左边触点按下
					$(".mindiv4").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "left";
					});
					// 下边触点按下
					$(".mindiv7").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "down";
					});
					// 左上角触点按下
					$(".mindiv1").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "leftup";
					});
					// 右上角触点按下
					$(".mindiv3").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "rightup";
					});
					// 左下角触点按下
					$(".mindiv6").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "leftdown";
					});
					// 右下角触点按下
					$(".mindiv8").mousedown(function(e) {
						e.stopPropagation();
						ifKeyDown = true;
						contact = "rightdown";
					});
					// 鼠标松开事件
					$(window).mouseup(function(e) {
						ifKeyDown = false;
					});
					// 鼠标移动事件
					window.onmousemove = function(e){
						if (ifKeyDown == true) {
							switch(contact){
								case "right": 		rightMove(e);				break;
								case "up": 			upMove(e);					break;
								case "left": 		leftMove(e);				break;
								case "down": 		downMove(e);				break;
								case "leftup": 		leftMove(e);upMove(e);		break;
								case "rightup": 	rightMove(e);upMove(e);		break;
								case "leftdown": 	leftMove(e);downMove(e);	break;
								case "rightdown": 	rightMove(e);downMove(e);	break;
							}
						};
						setChoice()
						setPreview()
					}
					// right移动
					function rightMove(e){
						var x = e.clientX; //鼠标x坐标
						console.info(x)
						//var addWidth = ""; //鼠标移动后选取框增加的宽度
						var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
						console.info(widthBefore);
						console.info(getPosition(mainDiv).left)
						var addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加的宽度
						mainDiv.style.width = addWidth + widthBefore + "px";
						mainDiv.style.height = addWidth + widthBefore + "px";
						// var newtop = (mainDiv.offsetTop - addHeight)/2;
						// mainDiv.style.top = newtop + "px";
					}
					// up移动
					function upMove(e){
						var y = e.clientY; //鼠标纵坐标
						var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离
						var addHeight = mainY - y;//增加的高度
						var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
						mainDiv.style.height = addHeight + heightBefore + "px";
						mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
					}
					// left移动
					function leftMove(e){
						var x = e.clientX; //鼠标横坐标
						var mainX = getPosition(mainDiv).left;
						var addWidth = mainX - x; //增加的宽度
						var widthBefore = mainDiv.offsetWidth - 2; //原来的宽度
						mainDiv.style.width = widthBefore + addWidth + "px";
						mainDiv.style.left = mainDiv.offsetLeft - addWidth + "px";
					}
					//down移动
					function downMove(e){
						var y = e.clientY;//鼠标纵坐标
						var heightBefore = mainDiv.offsetHeight - 2;//原来的高度
						var mainY = getPosition(mainDiv).top;//选取框相对于屏幕上边的距离
						var addHeight = y - heightBefore - mainY;//增加的高度
						mainDiv.style.height = addHeight + heightBefore + "px";
					}
					//设置选取区域高亮可见
					function setChoice(){
						var top = mainDiv.offsetTop;
						var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
						var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
						var left = mainDiv.offsetLeft;
						$('.imgpreview2').css({
							"clip":"rect(" + top + "px," + right + "px," + bottom + "px," + left +"px)"
						})
					}
					//预览函数
					function setPreview(){
						var top = mainDiv.offsetTop;
						var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
						var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
						var left = mainDiv.offsetLeft;
						$('.imgpreview3').css({
							"clip":"rect(" + top + "px," + right + "px," + bottom + "px," + left +"px)",
							top:-top,
							left:-left
						})
					}
				}
				reader.readAsDataURL(this.files[0]);
		 	}else{
			 	alert("您选择的上传文件不是有效的图片文件！请重新选择");
			 	return false;
			}
		} else{
			imgcon.html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + this.value + '\'"></div>')
		};
	});
})
// 获取元素距离父元素的左边和顶部的距离
function getPosition(node){
	var left = node.offsetLeft;
	var top = node.offsetTop;
	var parent = node.offsetParent;
	// alert(left)
	while(parent != null){
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {"left":left,"top":top};
}


