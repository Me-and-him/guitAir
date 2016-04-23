;
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
	var y = Math.round(config.oneHPercent * 45);

	// console.log(x + ' - ' + y);

	var movement = new fabric.Circle({
		fill: movementInfo.color,
		stroke: '#FFFFFF',
		strokeWidth: strokeWidth,
		radius: radius,
		// radius: 100,
		top: y,
		left: x
		// left: 262
	});

	movementInfo.canvasObject = movement

	console.log(movement);
	canvas.add(movement);
	canvas.renderAll();
	// movementInfo.state = 'added';
}


// Actions performed when current game settings recieved
function onAgSetupEvent(event) {

	let audioFileURL = 'http://' + window.location.hostname + '/songs/' + event.detail.song;
	// let audioFileURL = '../audio/' + event.detail.song;

	// console.log(audioFileURL);

	config.currentAudio = new Howl({
		urls: [audioFileURL],
		autoplay: false,
		volume: 0.8,
	});

	config.currentMovements = event.detail.commands.map((currentValue, index, array) => {
			return {
				index: index,
				name: currentValue,
				color: config.colors.neutral,
			}
	});

	// BPM, minInterval, beginning offset
	// config.currentBpm = event.detail.bpm;
	config.currentBpm = 128;
	config.currentMinInterval = (config.currentBpm * 1000) / (60 * 16);
	config.currentBeginningOffset = event.detail.offset;

	// Test
	// addMovementOnCanvas(config.currentMovements[1]);
	start();

}

function start() {
	config.currentScore = 0;
	config.currentStartDate = Date.now();
	setTimeout(function(){
		nextBeat(true);
	}, config.currentBeginningOffset);
	config.currentAudio.start();
}

function nextBeat(isFirst) {

	// If we're in the beginning of song
	if (isFirst === true) {
		addMovementOnCanvas(config.currentMovements[0]);
		animateMovement(config.currentMovements[0]);
		setTimeout(nextBeat, config.currentMinInterval);
		return;
	}

	// Insert new movement
	var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);
	console.log(appearingMovementIndex);
	var appearingMovement = config.currentMovements[appearingMovementIndex];

	addMovementOnCanvas(appearingMovement);
	animateMovement(appearingMovement);
	setTimeout(nextBeat, config.currentMinInterval);
	console.log(appearingMovementIndex);

}

function animateMovement(movementInfo) {
	// movementInfo.canvasObject.animate('left', ''+(config.oneWPercent * 20), {
	// 	// onChange: canvas.renderAll.bind(canvas),
	// 	onChange: requestAnimationFrame(canvas.renderAll.bind(canvas), 100),
	// 	// duration: config.currentMinInterval*16
	// });

	animate(function(time){
		movementInfo.canvasObject.setLeft( (time/config.currentMinInterval*16) + config.oneWPercent*20 );
		canvas.renderAll.bind(canvas);
	}, config.currentMinInterval*16);
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
	console.log(this);

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

	config.currentScore += parseInt(add)
	scoreNumber.innerHTML = config.currentScore;

	return config.currentScore;

}




// ********
// * Init *
// ********

config.currentAudio;
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

// var topTriangle = new fabric.Triangle({
// 	fill: config.colors.neutral,
// 	stroke: '#FFFFFF',
// 	strokeWidth: config.canvOpts.movements.strokeWidth,
// 	height: config.oneHPercent * 15,
// 	width: config.onehPercent * 15,
// 	top: (config.oneHPercent * 20) + (config.oneHPercent * 15),
// 	left: (config.oneWPercent * 20) + (config.oneHPercent * 15),
// 	centeredRotation: true,
// 	angle: 180
// });

// var bottomTriangle = new fabric.Triangle({
// 	fill: config.colors.neutral,
// 	stroke: '#FFFFFF',
// 	strokeWidth: config.canvOpts.movements.strokeWidth,
// 	height: config.oneHPercent * 15,
// 	width: config.onehPercent * 15,
// 	top: config.oneHPercent * 75,
// 	left: config.oneWPercent * 19.5
// });


var shadowCircle = new fabric.Circle({
	// fill: config.colors.neutral,
	fill: 'rgba(200,200,200,0.2)',
	stroke: 'rgba(200,200,200,1)',
	strokeWidth: config.canvOpts.movements.strokeWidth,
	radius: config.canvOpts.movements.radius,
	top: Math.round(config.oneHPercent*45),
	left: config.oneWPercent * 20
})
canvas.add(shadowCircle);

// Set handler for game setup event
document.addEventListener('agSetupEvent', onAgSetupEvent);

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





// test

// config.currentAudio = new Howl({
// 		urls: ['../audio/12 Home.mp3'],
// 		autoplay: false,
// 		volume: 0.8,
// 	});
// config.currentAudio.play();

window.updateScore = updateScore;
// window.bla = addMovementOnCanvas;
// document.addEventListener('mousemove', function(){
// 	config.currentMovements[1].canvasObject.animate('left', '-=1050', {
// 		onChange: canvas.renderAll.bind(canvas),
// 		duration: 2400,
// 		easing: fabric.util.linear
// 	});
// });

})();