;
//
//	Utils
//
// * animate(cb, duraton) -- wrapper of requestAnimationFrame
//
// DOM manipulations
//
// * closePopup(event) -- close popup with users unique code
// * onVolumeBtnClick(event) -- handler for volume buttons clicks (mute/unmute trigger)
// * onVolumeSliderInput(event) -- change audio volume whenvolume slider is being moved
// * updateScore(number) -- update current score
//
//	Canvas
//
// * refreshComputedSizes(object) -- change <canvas> sizes to actual
// * addMovementOnCanvas(movementInfo) -- add new movement canvas-object
// * animateMovement(object) -- make recieved already added movement run (animate)
// * onAgSetupEvent(event) -- handler for event, fired when game settings are recieved
//
// To remove
//
// * start() -- start game
// * nextBeat(isFirst) -- process (and add) next movement
//
// Initialization
//


(function(){

function animate(draw, duration) {
  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // определить, сколько прошло времени с начала анимации
    var timePassed = time - start;

    // возможно небольшое превышение времени, в этом случае зафиксировать конец
    if (timePassed > duration) timePassed = duration;

    // нарисовать состояние анимации в момент timePassed
    draw(timePassed);

    // если время анимации не закончилось - запланировать ещё кадр
    if (timePassed < duration) {
      requestAnimationFrame(animate);
    }

  });
}


var config = {
	colors: {
		neutral: '#FFA700', // #8D99AE #107E7D
		success: '#C2E812',
		fail: '#B80C09'
	},
	movements: {
		radiusPercent: 4,
		strokeWidthPercent: 0.5
	}
}

function closePopup(event) {
	document.querySelectorAll('.popup')[0].classList.add('closed')
	document.querySelectorAll('.logo')[0].classList.remove('with-popup')
}

// Mutes / unmutes audio
function onVolumeBtnClick(event) {

	if (!config.currentAudio.muted) {

		// Change view
		this.childNodes[1].classList.remove('fa-volume-up');
		this.childNodes[1].classList.add('fa-volume-off');

		// Mute
		config.currentAudio.mute();
		config.currentAudio.muted = true;
	} else {

		// Change view
		this.childNodes[1].classList.remove('fa-volume-off');
		this.childNodes[1].classList.add('fa-volume-up');

		// Unmute
		config.currentAudio.unmute();
		config.currentAudio.muted = false;
	}

}

// Change volume level of current audio
function onVolumeSliderInput(event) {
	config.currentAudio.volume(this.value/100);
}

function updateScore(add) {

	var score = document.querySelectorAll('.score')[0];
	var scoreNumber = document.querySelectorAll('.score-number')[0];

	score.classList.add('update');
	setTimeout(()=>{ score.classList.remove('update'); }, 400);

	config.currentScore += parseInt(add);
	scoreNumber.innerHTML = config.currentScore;

	return config.currentScore;

}

// **********
// * CANVAS *
// **********

// Changes canvas background size when fired
function refreshComputedSizes(object) {
	
	config.canvOpts.computedStyle = {
		width: +object.width.slice(0,-2),
		height: +object.height.slice(0,-2)
	};

	canvas.setDimensions({
		width: config.canvOpts.computedStyle.width,
		height: config.canvOpts.computedStyle.height
	});

}


function addMovementOnCanvas(movementInfo) {

	var radius = config.canvOpts.movements.radius;
	var strokeWidth = config.canvOpts.movements.strokeWidth;
	// var x = Math.round(config.canvOpts.computedStyle.width - (config.canvOpts.computedStyle.width/100)*3) - radius*2;
	var x = Math.round(config.canvOpts.computedStyle.width);
	var y = Math.round(config.oneHPercent * 45) + config.canvOpts.movements.strokeWidth*1.6;

	var circle = new fabric.Circle({
		fill: movementInfo.color,
		stroke: '#FFFFFF',
		strokeWidth: strokeWidth,
		radius: radius,
		originY: 'center',
		originX: 'center'
	});

	var arrow = new fabric.Path({
		originY: 'center',
		originX: 'center'
	})

	var movement = new fabric.Group([circle, arrow], {
		top: y,
		left: x
	});

	movementInfo.canvasObject = movement;

	canvas.add(movement);
	canvas.renderAll();
	// movementInfo.state = 'added';
}

function animateMovement(movementInfo) {
	movementInfo.canvasObject.animate('left', ''+((config.oneWPercent * 20) + config.canvOpts.movements.strokeWidth*1.5), {
		// onChange: canvas.renderAll.bind(canvas),
		onChange: canvas.renderAll.bind(canvas),
		duration: config.currentMinInterval*16
	});
}

function showMovementResult(event) {
	var status = event.detail.glStatus;
	var movementIndex = event.detail.index;
	var canvObj = config.currentMovements[movementIndex].canvasObject;


	// TEST

	canvObj.setFill(config.colors[status]);
	canvObj.animate('opacity', 0, {
		onChange: canvas.renderAll.bind(canvas),
		duration: 1000
	});

}


// Actions performed when current game settings recieved
function onGlAddMovement(event) {

	config.currentMovements.push({name: event.detail});
	var thisMovement = config.currentMovements[length-1];

	addMovementOnCanvas(thisMovement);
	animateMovement(thisMovement);

}

// function start() {
// 	config.currentScore = 0;
// 	config.currentStartDate = Date.now();
// 	setTimeout(function(){
// 		nextBeat(true);
// 	}, config.currentBeginningOffset);
// 	config.currentAudio.play();
// }

// function nextBeat(isFirst) {

// 	// If we're in the beginning of song
// 	if (isFirst === true) {
// 		addMovementOnCanvas(config.currentMovements[0]);
// 		animateMovement(config.currentMovements[0]);
// 		return;
// 	}

// 	// Insert new movement
// 	var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);
	
// 	var appearingMovement = config.currentMovements[appearingMovementIndex];

// 	addMovementOnCanvas(appearingMovement);
// 	animateMovement(appearingMovement);

// }









// ********
// * Init *
// ********

config.currentMovements = [];
config.currentScore = 0;
config.currentStartDate = 0;

// Get computed styles of whole page wrapper
var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);


// Set canvas options
config.oneWPercent = parseInt(canvasComputedStyleObj.width.slice(0,-2))/100;
config.oneHPercent = parseInt(canvasComputedStyleObj.height.slice(0,-2))/100;

config.canvOpts = {
	bgURL: '../img/bg-crowd-1.jpg',
	computedStyle: {
		width: config.oneWPercent*100,
		height: config.oneHPercent*100
	},
	movements: {
		radius: config.oneWPercent * config.movements.radiusPercent,
		strokeWidth: config.oneWPercent * config.movements.strokeWidthPercent
	}
}


// Initialize 'fabric' canvas obj
var canvas = new fabric.StaticCanvas('game', {
	width: config.canvOpts.computedStyle.width,
	height: config.canvOpts.computedStyle.height,
});

// Draw "perfect success" place shadow circle
var shadowCircle = new fabric.Circle({
	// fill: config.colors.neutral,
	fill: 'rgba(200,200,200,0.2)',
	stroke: 'rgba(200,200,200,1)',
	strokeWidth: config.canvOpts.movements.strokeWidth*2,
	radius: config.canvOpts.movements.radius + config.canvOpts.movements.strokeWidth,
	top: Math.round(config.oneHPercent*45),
	left: config.oneWPercent * 20
})
canvas.add(shadowCircle);

// Set handler for game setup event
document.addEventListener('GlAddMovement', onGlAddMovement);

// Show current game code
var codeContainer = document.getElementById('code-container');
codeContainer.innerHTML = code;


// *********
// * Audio *
// *********

// Add muted state saving feature to Howl (audio lib)
Howl.prototype.muted = false;
Howl.muted = false;

// Get volume button element
var volumeBtn = document.querySelectorAll('.volume-btn')[0];
// and set onClick event handler
volumeBtn.addEventListener('click', onVolumeBtnClick);

// Get volume level slider
var volumeSlider = document.querySelectorAll('.volume-input')[0];
// and set onInput event handler
volumeSlider.addEventListener('input', onVolumeSliderInput)


// Change canvas background size on window resize
window.onresize = function(){
	refreshComputedSizes(canvasComputedStyleObj);
	canvas.renderAll.bind(canvas);
}









// TEST
document.addEventListener('click', closePopup);

})();