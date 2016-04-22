// Рисуем

(function(){


function refreshComputedSizes(object) {
	
	canvOpts.computedStyle = {

		width: +object.width.slice(0,-2),
		height: +object.height.slice(0,-2)
	
	};

	canvas.setDimensions({
		width: canvOpts.computedStyle.width,
		height: canvOpts.computedStyle.height
	});

}

window.onresize = function(){
	refreshComputedSizes(canvasComputedStyleObj);
	canvas.renderAll.bind(canvas);
}






// Init

var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);

var canvOpts = {
	bgURL: '../img/bg-crowd-1.jpg',
	computedStyle: {
		width: +canvasComputedStyleObj.width.slice(0,-2),
		height: +canvasComputedStyleObj.height.slice(0,-2)
	}
}

var canvas = new fabric.StaticCanvas('game', {
	width: canvOpts.computedStyle.width,
	height: canvOpts.computedStyle.height,
});


})();