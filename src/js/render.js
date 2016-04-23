;
(function(){

// Changes canvas background size when fired
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


function onAgSetupEvent(event) {

	let audioFileURL = 'http://' + window.location.hostname + '/songs/' + event.song;

	currentAudio = new Howl({
		urls: [audioFileURL],
		autoplay: false,
		volume: 0.8,
	});

}


// Mutes / unmutes audio
function onVolumeBtnClick(event) {

	if (!currentAudio.muted) {
		this.childNodes[1].classList.remove('fa-volume-up');
		this.childNodes[1].classList.add('fa-volume-off');
		currentAudio.mute();
		currentAudio.muted = true;
	} else {
		this.childNodes[1].classList.remove('fa-volume-off');
		this.childNodes[1].classList.add('fa-volume-up');
		currentAudio.unmute();
		currentAudio.muted = false;
	}
	console.log(this);

}

function onVolumeSliderInput(event) {
	currentAudio.volume(this.value/100);
}




// ********
// * Init *
// ********

var currentAudio;

// Get computed styles of whole page wrapper
var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);

// Set canvas options
var canvOpts = {
	bgURL: '../img/bg-crowd-1.jpg',
	computedStyle: {
		width: +canvasComputedStyleObj.width.slice(0,-2),
		height: +canvasComputedStyleObj.height.slice(0,-2)
	}
}

// Initialize fabric canvas obj
var canvas = new fabric.StaticCanvas('game', {
	width: canvOpts.computedStyle.width,
	height: canvOpts.computedStyle.height,
});

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

// currentAudio = new Howl({
// 		urls: ['../audio/12 Home.mp3'],
// 		autoplay: false,
// 		volume: 0.8,
// 	});
// currentAudio.play();

document.addEventListener('click', function(e){
	var score = document.querySelectorAll('.score')[0];
	var scoreNumber = document.querySelectorAll('.score-number')[0];

	score.classList.add('update');
	setTimeout(()=>{ score.classList.remove('update'); }, 400);
	scoreNumber.innerHTML = parseInt(scoreNumber.innerHTML) + 123;
	
})

})();