
// 获取元素相对于屏幕左边的距离，利用offsetLeft
function getPosition(node){
	var left = node.offset().left;
	var top = node.offset().top;
	var parent = node.offsetParent();
	// alert(left)
	while(parent != null){
		left += parent.offset().left;
		top += parent.offset().top;
		parent = parent.offsetParent();
	}
	return {"left":left,"top":top};
}
