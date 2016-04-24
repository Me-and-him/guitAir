'use strict';

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

(function () {

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
	};

	function closePopup(event) {
		document.querySelectorAll('.popup')[0].classList.add('closed');
		document.querySelectorAll('.logo')[0].classList.remove('with-popup');
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
		config.currentAudio.volume(this.value / 100);
	}

	function updateScore(newScore) {

		var score = document.querySelectorAll('.score')[0];
		var scoreNumber = document.querySelectorAll('.score-number')[0];

		score.classList.add('update');
		setTimeout(function () {
			score.classList.remove('update');
		}, 400);

		config.currentScore = parseInt(newScore);
		scoreNumber.innerHTML = config.currentScore;

		return config.currentScore;
	}

	// **********
	// * CANVAS *
	// **********

	// Changes canvas background size when fired
	function refreshComputedSizes(object) {

		config.canvOpts.computedStyle = {
			width: +object.width.slice(0, -2),
			height: +object.height.slice(0, -2)
		};

		canvas.setDimensions({
			width: config.canvOpts.computedStyle.width,
			height: config.canvOpts.computedStyle.height
		});
	}

	function addMovementOnCanvas(movementInfo) {

		if (movementInfo.name == 'pass') return;

		var radius = config.canvOpts.movements.radius;
		var strokeWidth = config.canvOpts.movements.strokeWidth;
		// var x = Math.round(config.canvOpts.computedStyle.width - (config.canvOpts.computedStyle.width/100)*3) - radius*2;
		var x = Math.round(config.canvOpts.computedStyle.width);
		var y = Math.round(config.oneHPercent * 45) + config.canvOpts.movements.strokeWidth * 1.6;

		var circle = new fabric.Circle({
			fill: config.colors.neutral,
			stroke: '#FFFFFF',
			strokeWidth: strokeWidth,
			radius: radius,
			originY: 'center',
			originX: 'center'
		});

		// console.log(-circle.getRadiusX()*0.8);
		var arrow;

		switch (movementInfo.name) {
			case 'up':
				arrow = new fabric.Path('\n\t\t\t\tM ' + -circle.getRadiusX() * 0.65 + ' ' + circle.getRadiusY() * 0.11 + '\n\t\t\t\tL 0 ' + -circle.getRadiusY() * 0.55 + '\n\t\t\t\tL ' + circle.getRadiusX() * 0.65 + ' ' + circle.getRadiusY() * 0.11 + '\n\t\t\t\tL ' + circle.getRadiusX() * 0.5 + ' ' + circle.getRadiusY() * 0.25 + '\n\t\t\t\tL 0 ' + -circle.getRadiusY() * 0.25 + '\n\t\t\t\tL ' + -circle.getRadiusX() * 0.5 + ' ' + circle.getRadiusY() * 0.25 + '\n\t\t\t\tz', {
					// fill: '#fff',
					originY: 'center',
					originX: 'center'
				});
				break;

			case 'down':
				arrow = new fabric.Path('\n\t\t\t\tM ' + circle.getRadiusX() * 0.65 + ' ' + -circle.getRadiusY() * 0.11 + '\n\t\t\t\tL 0 ' + circle.getRadiusY() * 0.55 + '\n\t\t\t\tL ' + -circle.getRadiusX() * 0.65 + ' ' + -circle.getRadiusY() * 0.11 + '\n\t\t\t\tL ' + -circle.getRadiusX() * 0.5 + ' ' + -circle.getRadiusY() * 0.25 + '\n\t\t\t\tL 0 ' + circle.getRadiusY() * 0.25 + '\n\t\t\t\tL ' + circle.getRadiusX() * 0.5 + ' ' + -circle.getRadiusY() * 0.25 + '\n\t\t\t\tz', {
					// fill: '#fff',
					originY: 'center',
					originX: 'center'
				});
				break;
		}

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

		// if (movementInfo.name == 'pass') return;

		movementInfo.canvasObject.animate('left', '' + (config.oneWPercent * 20 + config.canvOpts.movements.strokeWidth * 1.5), {
			onChange: canvas.renderAll.bind(canvas),
			duration: config.currentMinInterval * 16
		});
	}

	function onGlSetupEvent(event) {
		config.currentBpm = event.detail.bpm;
		config.currentMinInterval = config.currentBpm * 1000 / (60 * 16);
		config.currentSongName = event.detail.song;
		config.currentAudio = event.detail.music;
		closePopup();
		console.log(event.detail.bpm);

		// Test
		config.currentAudio.play();
	}

	// Actions performed when current game settings recieved
	function onGlAddMovement(event) {

		config.currentMovements.push({ name: event.detail });
		var thisMovement = config.currentMovements[config.currentMovements.length - 1];

		if (thisMovement.name == 'pass') return;

		addMovementOnCanvas(thisMovement);
		animateMovement(thisMovement);
	}

	function onGlStatus(event) {

		var status = event.detail.status;
		var movementIndex = event.detail.index;
		var newScore = event.detail.newScore;

		if (config.currentMovements[movementIndex].name == 'pass') return;

		var canvObj = config.currentMovements[movementIndex].canvasObject;

		// Run canvas animation
		canvObj.set({
			fill: config.colors[status]
		});

		// centeredScaling: true
		switch (status) {
			case 'success':
				canvObj.animate({
					'scaleX': 6,
					'scaleY': 6,
					'opacity': 0,
					'left': '-=' + config.canvOpts.movements.radius * 5.2,
					'top': '-=' + config.canvOpts.movements.radius * 5.2
				}, {
					onChange: canvas.renderAll.bind(canvas),
					duration: 700,
					easing: fabric.util.ease.easeOutQuart
				});
				break;

			case 'fail':
				canvObj.animate({
					'scaleX': 0.8,
					'scaleY': 0.8,
					'opacity': 0,
					'left': '' + -config.canvOpts.movements.radius
				}, // 'top': '-='+config.canvOpts.movements.radius
				{
					onChange: canvas.renderAll.bind(canvas),
					duration: 1000
				});
				// easing: fabric.util.ease.easeOutQuart
				break;
		}

		// Update score
		updateScore(newScore);
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

	// To remove!
	// config.currentBpm = 128;
	// config.currentMinInterval = (config.currentBpm*1000) / (60*16)

	// Get computed styles of whole page wrapper
	var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);

	// Set canvas options
	config.oneWPercent = parseInt(canvasComputedStyleObj.width.slice(0, -2)) / 100;
	config.oneHPercent = parseInt(canvasComputedStyleObj.height.slice(0, -2)) / 100;

	config.canvOpts = {
		bgURL: '../img/bg-crowd-1.jpg',
		computedStyle: {
			width: config.oneWPercent * 100,
			height: config.oneHPercent * 100
		},
		movements: {
			radius: config.oneWPercent * config.movements.radiusPercent,
			strokeWidth: config.oneWPercent * config.movements.strokeWidthPercent
		}
	};

	// Initialize 'fabric' canvas obj
	var canvas = new fabric.StaticCanvas('game', {
		width: config.canvOpts.computedStyle.width,
		height: config.canvOpts.computedStyle.height
	});

	// Draw "perfect success" place shadow circle
	var shadowCircle = new fabric.Circle({
		// fill: config.colors.neutral,
		fill: 'rgba(200,200,200,0.2)',
		stroke: 'rgba(200,200,200,1)',
		strokeWidth: config.canvOpts.movements.strokeWidth * 2,
		radius: config.canvOpts.movements.radius + config.canvOpts.movements.strokeWidth,
		top: Math.round(config.oneHPercent * 45),
		left: config.oneWPercent * 20
	});
	canvas.add(shadowCircle);

	// Set handler for adding of next movement in queue
	document.addEventListener('glAddMovement', onGlAddMovement);

	// Set handler for movement result event
	document.addEventListener('glStatus', onGlStatus);

	// Set handler for game setup event
	document.addEventListener('glSetupEvent', onGlSetupEvent);

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
	volumeSlider.addEventListener('input', onVolumeSliderInput);

	// Change canvas background size on window resize
	window.onresize = function () {
		refreshComputedSizes(canvasComputedStyleObj);
		canvas.renderAll.bind(canvas);
	};

	// TEST
	// document.addEventListener('click', closePopup);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLENBQUMsWUFBVTs7QUFFWCxVQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUIsUUFBdkIsRUFBaUM7QUFDL0IsTUFBSSxRQUFRLFlBQVksR0FBWixFQUFaOztBQUVBLHdCQUFzQixTQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFBdUI7O0FBRTNDLE9BQUksYUFBYSxPQUFPLEtBQXhCOzs7QUFHQSxPQUFJLGFBQWEsUUFBakIsRUFBMkIsYUFBYSxRQUFiOzs7QUFHM0IsUUFBSyxVQUFMOzs7QUFHQSxPQUFJLGFBQWEsUUFBakIsRUFBMkI7QUFDekIsMEJBQXNCLE9BQXRCO0FBQ0Q7QUFFRixHQWZEO0FBZ0JEOztBQUdELEtBQUksU0FBUztBQUNaLFVBQVE7QUFDUCxZQUFTLFNBREYsRTtBQUVQLFlBQVMsU0FGRjtBQUdQLFNBQU07QUFIQyxHQURJO0FBTVosYUFBVztBQUNWLGtCQUFlLENBREw7QUFFVix1QkFBb0I7QUFGVjtBQU5DLEVBQWI7O0FBWUEsVUFBUyxVQUFULENBQW9CLEtBQXBCLEVBQTJCO0FBQzFCLFdBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsQ0FBcEMsRUFBdUMsU0FBdkMsQ0FBaUQsR0FBakQsQ0FBcUQsUUFBckQ7QUFDQSxXQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLENBQW5DLEVBQXNDLFNBQXRDLENBQWdELE1BQWhELENBQXVELFlBQXZEO0FBQ0E7OztBQUdELFVBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBaUM7O0FBRWhDLE1BQUksQ0FBQyxPQUFPLFlBQVAsQ0FBb0IsS0FBekIsRUFBZ0M7OztBQUcvQixRQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsU0FBbkIsQ0FBNkIsTUFBN0IsQ0FBb0MsY0FBcEM7QUFDQSxRQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsZUFBakM7OztBQUdBLFVBQU8sWUFBUCxDQUFvQixJQUFwQjtBQUNBLFVBQU8sWUFBUCxDQUFvQixLQUFwQixHQUE0QixJQUE1QjtBQUNBLEdBVEQsTUFTTzs7O0FBR04sUUFBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLFNBQW5CLENBQTZCLE1BQTdCLENBQW9DLGVBQXBDO0FBQ0EsUUFBSyxVQUFMLENBQWdCLENBQWhCLEVBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLGNBQWpDOzs7QUFHQSxVQUFPLFlBQVAsQ0FBb0IsTUFBcEI7QUFDQSxVQUFPLFlBQVAsQ0FBb0IsS0FBcEIsR0FBNEIsS0FBNUI7QUFDQTtBQUVEOzs7QUFHRCxVQUFTLG1CQUFULENBQTZCLEtBQTdCLEVBQW9DO0FBQ25DLFNBQU8sWUFBUCxDQUFvQixNQUFwQixDQUEyQixLQUFLLEtBQUwsR0FBVyxHQUF0QztBQUNBOztBQUVELFVBQVMsV0FBVCxDQUFxQixRQUFyQixFQUErQjs7QUFFOUIsTUFBSSxRQUFRLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsQ0FBcEMsQ0FBWjtBQUNBLE1BQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLGVBQTFCLEVBQTJDLENBQTNDLENBQWxCOztBQUVBLFFBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixRQUFwQjtBQUNBLGFBQVcsWUFBSTtBQUFFLFNBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixRQUF2QjtBQUFtQyxHQUFwRCxFQUFzRCxHQUF0RDs7QUFFQSxTQUFPLFlBQVAsR0FBc0IsU0FBUyxRQUFULENBQXRCO0FBQ0EsY0FBWSxTQUFaLEdBQXdCLE9BQU8sWUFBL0I7O0FBRUEsU0FBTyxPQUFPLFlBQWQ7QUFFQTs7Ozs7OztBQU9ELFVBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0M7O0FBRXJDLFNBQU8sUUFBUCxDQUFnQixhQUFoQixHQUFnQztBQUMvQixVQUFPLENBQUMsT0FBTyxLQUFQLENBQWEsS0FBYixDQUFtQixDQUFuQixFQUFxQixDQUFDLENBQXRCLENBRHVCO0FBRS9CLFdBQVEsQ0FBQyxPQUFPLE1BQVAsQ0FBYyxLQUFkLENBQW9CLENBQXBCLEVBQXNCLENBQUMsQ0FBdkI7QUFGc0IsR0FBaEM7O0FBS0EsU0FBTyxhQUFQLENBQXFCO0FBQ3BCLFVBQU8sT0FBTyxRQUFQLENBQWdCLGFBQWhCLENBQThCLEtBRGpCO0FBRXBCLFdBQVEsT0FBTyxRQUFQLENBQWdCLGFBQWhCLENBQThCO0FBRmxCLEdBQXJCO0FBS0E7O0FBR0QsVUFBUyxtQkFBVCxDQUE2QixZQUE3QixFQUEyQzs7QUFFMUMsTUFBSSxhQUFhLElBQWIsSUFBcUIsTUFBekIsRUFBaUM7O0FBRWpDLE1BQUksU0FBUyxPQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBdkM7QUFDQSxNQUFJLGNBQWMsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTVDOztBQUVBLE1BQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEIsS0FBekMsQ0FBUjtBQUNBLE1BQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFPLFdBQVAsR0FBcUIsRUFBaEMsSUFBc0MsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTFCLEdBQXNDLEdBQXBGOztBQUVBLE1BQUksU0FBUyxJQUFJLE9BQU8sTUFBWCxDQUFrQjtBQUM5QixTQUFNLE9BQU8sTUFBUCxDQUFjLE9BRFU7QUFFOUIsV0FBUSxTQUZzQjtBQUc5QixnQkFBYSxXQUhpQjtBQUk5QixXQUFRLE1BSnNCO0FBSzlCLFlBQVMsUUFMcUI7QUFNOUIsWUFBUztBQU5xQixHQUFsQixDQUFiOzs7QUFVQSxNQUFJLEtBQUo7O0FBRUEsVUFBUSxhQUFhLElBQXJCO0FBQ0MsUUFBSyxJQUFMO0FBQ0MsWUFBUSxJQUFJLE9BQU8sSUFBWCxrQkFDSCxDQUFDLE9BQU8sVUFBUCxFQUFELEdBQXFCLElBRGxCLFNBQzBCLE9BQU8sVUFBUCxLQUFvQixJQUQ5QyxzQkFFRCxDQUFDLE9BQU8sVUFBUCxFQUFELEdBQXFCLElBRnBCLG9CQUdILE9BQU8sVUFBUCxLQUFvQixJQUhqQixTQUd5QixPQUFPLFVBQVAsS0FBb0IsSUFIN0Msb0JBSUgsT0FBTyxVQUFQLEtBQW9CLEdBSmpCLFNBSXdCLE9BQU8sVUFBUCxLQUFvQixJQUo1QyxzQkFLRCxDQUFDLE9BQU8sVUFBUCxFQUFELEdBQXFCLElBTHBCLG9CQU1ILENBQUMsT0FBTyxVQUFQLEVBQUQsR0FBcUIsR0FObEIsU0FNeUIsT0FBTyxVQUFQLEtBQW9CLElBTjdDLGtCQU9IOztBQUVKLGNBQVMsUUFGTDtBQUdKLGNBQVM7QUFITCxLQVBHLENBQVI7QUFZRDs7QUFFQSxRQUFLLE1BQUw7QUFDQyxZQUFRLElBQUksT0FBTyxJQUFYLGtCQUNILE9BQU8sVUFBUCxLQUFvQixJQURqQixTQUN5QixDQUFDLE9BQU8sVUFBUCxFQUFELEdBQXFCLElBRDlDLHNCQUVELE9BQU8sVUFBUCxLQUFvQixJQUZuQixvQkFHSCxDQUFDLE9BQU8sVUFBUCxFQUFELEdBQXFCLElBSGxCLFNBRzBCLENBQUMsT0FBTyxVQUFQLEVBQUQsR0FBcUIsSUFIL0Msb0JBSUgsQ0FBQyxPQUFPLFVBQVAsRUFBRCxHQUFxQixHQUpsQixTQUl5QixDQUFDLE9BQU8sVUFBUCxFQUFELEdBQXFCLElBSjlDLHNCQUtELE9BQU8sVUFBUCxLQUFvQixJQUxuQixvQkFNSCxPQUFPLFVBQVAsS0FBb0IsR0FOakIsU0FNd0IsQ0FBQyxPQUFPLFVBQVAsRUFBRCxHQUFxQixJQU43QyxrQkFPSDs7QUFFSixjQUFTLFFBRkw7QUFHSixjQUFTO0FBSEwsS0FQRyxDQUFSO0FBWUQ7QUE3QkQ7O0FBaUNBLE1BQUksV0FBVyxJQUFJLE9BQU8sS0FBWCxDQUFpQixDQUFDLE1BQUQsRUFBUyxLQUFULENBQWpCLEVBQWtDO0FBQ2hELFFBQUssQ0FEMkM7QUFFaEQsU0FBTTtBQUYwQyxHQUFsQyxDQUFmOztBQUtBLGVBQWEsWUFBYixHQUE0QixRQUE1Qjs7QUFFQSxTQUFPLEdBQVAsQ0FBVyxRQUFYO0FBQ0EsU0FBTyxTQUFQOztBQUVBOztBQUVELFVBQVMsZUFBVCxDQUF5QixZQUF6QixFQUF1Qzs7OztBQUl0QyxlQUFhLFlBQWIsQ0FBMEIsT0FBMUIsQ0FBa0MsTUFBbEMsRUFBMEMsTUFBSyxPQUFPLFdBQVAsR0FBcUIsRUFBdEIsR0FBNEIsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTFCLEdBQXNDLEdBQXRFLENBQTFDLEVBQXNIO0FBQ3JILGFBQVUsT0FBTyxTQUFQLENBQWlCLElBQWpCLENBQXNCLE1BQXRCLENBRDJHO0FBRXJILGFBQVUsT0FBTyxrQkFBUCxHQUEwQjtBQUZpRixHQUF0SDtBQUlBOztBQUVELFVBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQjtBQUM5QixTQUFPLFVBQVAsR0FBb0IsTUFBTSxNQUFOLENBQWEsR0FBakM7QUFDQSxTQUFPLGtCQUFQLEdBQTZCLE9BQU8sVUFBUCxHQUFrQixJQUFuQixJQUEwQixLQUFHLEVBQTdCLENBQTVCO0FBQ0EsU0FBTyxlQUFQLEdBQXlCLE1BQU0sTUFBTixDQUFhLElBQXRDO0FBQ0EsU0FBTyxZQUFQLEdBQXNCLE1BQU0sTUFBTixDQUFhLEtBQW5DO0FBQ0E7QUFDQSxVQUFRLEdBQVIsQ0FBWSxNQUFNLE1BQU4sQ0FBYSxHQUF6Qjs7O0FBR0EsU0FBTyxZQUFQLENBQW9CLElBQXBCO0FBQ0E7OztBQUdELFVBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQzs7QUFFL0IsU0FBTyxnQkFBUCxDQUF3QixJQUF4QixDQUE2QixFQUFDLE1BQU0sTUFBTSxNQUFiLEVBQTdCO0FBQ0EsTUFBSSxlQUFlLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixHQUErQixDQUF2RCxDQUFuQjs7QUFFQSxNQUFJLGFBQWEsSUFBYixJQUFxQixNQUF6QixFQUFpQzs7QUFFakMsc0JBQW9CLFlBQXBCO0FBQ0Esa0JBQWdCLFlBQWhCO0FBRUE7O0FBRUQsVUFBUyxVQUFULENBQW9CLEtBQXBCLEVBQTJCOztBQUUxQixNQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsTUFBMUI7QUFDQSxNQUFJLGdCQUFnQixNQUFNLE1BQU4sQ0FBYSxLQUFqQztBQUNBLE1BQUksV0FBVyxNQUFNLE1BQU4sQ0FBYSxRQUE1Qjs7QUFFQSxNQUFJLE9BQU8sZ0JBQVAsQ0FBd0IsYUFBeEIsRUFBdUMsSUFBdkMsSUFBK0MsTUFBbkQsRUFBMkQ7O0FBRTNELE1BQUksVUFBVSxPQUFPLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDLFlBQXJEOzs7QUFHQSxVQUFRLEdBQVIsQ0FBWTtBQUNYLFNBQU0sT0FBTyxNQUFQLENBQWMsTUFBZDtBQURLLEdBQVo7OztBQUtBLFVBQVEsTUFBUjtBQUNDLFFBQUssU0FBTDtBQUNDLFlBQVEsT0FBUixDQUFnQjtBQUNmLGVBQVUsQ0FESztBQUVmLGVBQVUsQ0FGSztBQUdmLGdCQUFXLENBSEk7QUFJZixhQUFRLE9BQUssT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLE1BQTFCLEdBQWlDLEdBSi9CO0FBS2YsWUFBTyxPQUFLLE9BQU8sUUFBUCxDQUFnQixTQUFoQixDQUEwQixNQUExQixHQUFpQztBQUw5QixLQUFoQixFQU1HO0FBQ0YsZUFBVSxPQUFPLFNBQVAsQ0FBaUIsSUFBakIsQ0FBc0IsTUFBdEIsQ0FEUjtBQUVGLGVBQVUsR0FGUjtBQUdGLGFBQVEsT0FBTyxJQUFQLENBQVksSUFBWixDQUFpQjtBQUh2QixLQU5IO0FBV0Q7O0FBRUEsUUFBSyxNQUFMO0FBQ0MsWUFBUSxPQUFSLENBQWdCO0FBQ2YsZUFBVSxHQURLO0FBRWYsZUFBVSxHQUZLO0FBR2YsZ0JBQVcsQ0FISTtBQUlmLGFBQVEsS0FBSSxDQUFDLE9BQU8sUUFBUCxDQUFnQixTQUFoQixDQUEwQjtBQUp4QixLQUFoQixFO0FBTUc7QUFDRixlQUFVLE9BQU8sU0FBUCxDQUFpQixJQUFqQixDQUFzQixNQUF0QixDQURSO0FBRUYsZUFBVTtBQUZSLEtBTkg7O0FBV0Q7QUEzQkQ7OztBQStCQSxjQUFZLFFBQVo7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDRCxRQUFPLGdCQUFQLEdBQTBCLEVBQTFCO0FBQ0EsUUFBTyxZQUFQLEdBQXNCLENBQXRCO0FBQ0EsUUFBTyxnQkFBUCxHQUEwQixDQUExQjs7Ozs7OztBQU9BLEtBQUkseUJBQXlCLGlCQUFpQixTQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQWlDLENBQWpDLENBQWpCLENBQTdCOzs7QUFJQSxRQUFPLFdBQVAsR0FBcUIsU0FBUyx1QkFBdUIsS0FBdkIsQ0FBNkIsS0FBN0IsQ0FBbUMsQ0FBbkMsRUFBcUMsQ0FBQyxDQUF0QyxDQUFULElBQW1ELEdBQXhFO0FBQ0EsUUFBTyxXQUFQLEdBQXFCLFNBQVMsdUJBQXVCLE1BQXZCLENBQThCLEtBQTlCLENBQW9DLENBQXBDLEVBQXNDLENBQUMsQ0FBdkMsQ0FBVCxJQUFvRCxHQUF6RTs7QUFFQSxRQUFPLFFBQVAsR0FBa0I7QUFDakIsU0FBTyx1QkFEVTtBQUVqQixpQkFBZTtBQUNkLFVBQU8sT0FBTyxXQUFQLEdBQW1CLEdBRFo7QUFFZCxXQUFRLE9BQU8sV0FBUCxHQUFtQjtBQUZiLEdBRkU7QUFNakIsYUFBVztBQUNWLFdBQVEsT0FBTyxXQUFQLEdBQXFCLE9BQU8sU0FBUCxDQUFpQixhQURwQztBQUVWLGdCQUFhLE9BQU8sV0FBUCxHQUFxQixPQUFPLFNBQVAsQ0FBaUI7QUFGekM7QUFOTSxFQUFsQjs7O0FBY0EsS0FBSSxTQUFTLElBQUksT0FBTyxZQUFYLENBQXdCLE1BQXhCLEVBQWdDO0FBQzVDLFNBQU8sT0FBTyxRQUFQLENBQWdCLGFBQWhCLENBQThCLEtBRE87QUFFNUMsVUFBUSxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEI7QUFGTSxFQUFoQyxDQUFiOzs7QUFNQSxLQUFJLGVBQWUsSUFBSSxPQUFPLE1BQVgsQ0FBa0I7O0FBRXBDLFFBQU0sdUJBRjhCO0FBR3BDLFVBQVEscUJBSDRCO0FBSXBDLGVBQWEsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBQTFCLEdBQXNDLENBSmY7QUFLcEMsVUFBUSxPQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsR0FBbUMsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLFdBTGpDO0FBTXBDLE9BQUssS0FBSyxLQUFMLENBQVcsT0FBTyxXQUFQLEdBQW1CLEVBQTlCLENBTitCO0FBT3BDLFFBQU0sT0FBTyxXQUFQLEdBQXFCO0FBUFMsRUFBbEIsQ0FBbkI7QUFTQSxRQUFPLEdBQVAsQ0FBVyxZQUFYOzs7QUFHQSxVQUFTLGdCQUFULENBQTBCLGVBQTFCLEVBQTJDLGVBQTNDOzs7QUFHQSxVQUFTLGdCQUFULENBQTBCLFVBQTFCLEVBQXNDLFVBQXRDOzs7QUFHQSxVQUFTLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDLGNBQTFDOzs7QUFHQSxLQUFJLGdCQUFnQixTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQXBCO0FBQ0EsZUFBYyxTQUFkLEdBQTBCLElBQTFCOzs7Ozs7O0FBUUEsTUFBSyxTQUFMLENBQWUsS0FBZixHQUF1QixLQUF2QjtBQUNBLE1BQUssS0FBTCxHQUFhLEtBQWI7OztBQUdBLEtBQUksWUFBWSxTQUFTLGdCQUFULENBQTBCLGFBQTFCLEVBQXlDLENBQXpDLENBQWhCOztBQUVBLFdBQVUsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsZ0JBQXBDOzs7QUFHQSxLQUFJLGVBQWUsU0FBUyxnQkFBVCxDQUEwQixlQUExQixFQUEyQyxDQUEzQyxDQUFuQjs7QUFFQSxjQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLG1CQUF2Qzs7O0FBSUEsUUFBTyxRQUFQLEdBQWtCLFlBQVU7QUFDM0IsdUJBQXFCLHNCQUFyQjtBQUNBLFNBQU8sU0FBUCxDQUFpQixJQUFqQixDQUFzQixNQUF0QjtBQUNBLEVBSEQ7Ozs7QUFnQkMsQ0E1WUQiLCJmaWxlIjoicmVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiO1xuLy9cbi8vXHRVdGlsc1xuLy9cbi8vICogYW5pbWF0ZShjYiwgZHVyYXRvbikgLS0gd3JhcHBlciBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbi8vXG4vLyBET00gbWFuaXB1bGF0aW9uc1xuLy9cbi8vICogY2xvc2VQb3B1cChldmVudCkgLS0gY2xvc2UgcG9wdXAgd2l0aCB1c2VycyB1bmlxdWUgY29kZVxuLy8gKiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSAtLSBoYW5kbGVyIGZvciB2b2x1bWUgYnV0dG9ucyBjbGlja3MgKG11dGUvdW5tdXRlIHRyaWdnZXIpXG4vLyAqIG9uVm9sdW1lU2xpZGVySW5wdXQoZXZlbnQpIC0tIGNoYW5nZSBhdWRpbyB2b2x1bWUgd2hlbnZvbHVtZSBzbGlkZXIgaXMgYmVpbmcgbW92ZWRcbi8vICogdXBkYXRlU2NvcmUobnVtYmVyKSAtLSB1cGRhdGUgY3VycmVudCBzY29yZVxuLy9cbi8vXHRDYW52YXNcbi8vXG4vLyAqIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkgLS0gY2hhbmdlIDxjYW52YXM+IHNpemVzIHRvIGFjdHVhbFxuLy8gKiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykgLS0gYWRkIG5ldyBtb3ZlbWVudCBjYW52YXMtb2JqZWN0XG4vLyAqIGFuaW1hdGVNb3ZlbWVudChvYmplY3QpIC0tIG1ha2UgcmVjaWV2ZWQgYWxyZWFkeSBhZGRlZCBtb3ZlbWVudCBydW4gKGFuaW1hdGUpXG4vLyAqIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSAtLSBoYW5kbGVyIGZvciBldmVudCwgZmlyZWQgd2hlbiBnYW1lIHNldHRpbmdzIGFyZSByZWNpZXZlZFxuLy9cbi8vIFRvIHJlbW92ZVxuLy9cbi8vICogc3RhcnQoKSAtLSBzdGFydCBnYW1lXG4vLyAqIG5leHRCZWF0KGlzRmlyc3QpIC0tIHByb2Nlc3MgKGFuZCBhZGQpIG5leHQgbW92ZW1lbnRcbi8vXG4vLyBJbml0aWFsaXphdGlvblxuLy9cblxuXG4oZnVuY3Rpb24oKXtcblxuZnVuY3Rpb24gYW5pbWF0ZShkcmF3LCBkdXJhdGlvbikge1xuICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYW5pbWF0ZSh0aW1lKSB7XG4gICAgLy8g0L7Qv9GA0LXQtNC10LvQuNGC0YwsINGB0LrQvtC70YzQutC+INC/0YDQvtGI0LvQviDQstGA0LXQvNC10L3QuCDRgSDQvdCw0YfQsNC70LAg0LDQvdC40LzQsNGG0LjQuFxuICAgIHZhciB0aW1lUGFzc2VkID0gdGltZSAtIHN0YXJ0O1xuXG4gICAgLy8g0LLQvtC30LzQvtC20L3QviDQvdC10LHQvtC70YzRiNC+0LUg0L/RgNC10LLRi9GI0LXQvdC40LUg0LLRgNC10LzQtdC90LgsINCyINGN0YLQvtC8INGB0LvRg9GH0LDQtSDQt9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjCDQutC+0L3QtdGGXG4gICAgaWYgKHRpbWVQYXNzZWQgPiBkdXJhdGlvbikgdGltZVBhc3NlZCA9IGR1cmF0aW9uO1xuXG4gICAgLy8g0L3QsNGA0LjRgdC+0LLQsNGC0Ywg0YHQvtGB0YLQvtGP0L3QuNC1INCw0L3QuNC80LDRhtC40Lgg0LIg0LzQvtC80LXQvdGCIHRpbWVQYXNzZWRcbiAgICBkcmF3KHRpbWVQYXNzZWQpO1xuXG4gICAgLy8g0LXRgdC70Lgg0LLRgNC10LzRjyDQsNC90LjQvNCw0YbQuNC4INC90LUg0LfQsNC60L7QvdGH0LjQu9C+0YHRjCAtINC30LDQv9C70LDQvdC40YDQvtCy0LDRgtGMINC10YnRkSDQutCw0LTRgFxuICAgIGlmICh0aW1lUGFzc2VkIDwgZHVyYXRpb24pIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICB9XG5cbiAgfSk7XG59XG5cblxudmFyIGNvbmZpZyA9IHtcblx0Y29sb3JzOiB7XG5cdFx0bmV1dHJhbDogJyNGRkE3MDAnLCAvLyAjOEQ5OUFFICMxMDdFN0Rcblx0XHRzdWNjZXNzOiAnI0MyRTgxMicsXG5cdFx0ZmFpbDogJyNCODBDMDknXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1c1BlcmNlbnQ6IDQsXG5cdFx0c3Ryb2tlV2lkdGhQZXJjZW50OiAwLjVcblx0fVxufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2ZW50KSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cCcpWzBdLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9nbycpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3dpdGgtcG9wdXAnKTtcbn1cblxuLy8gTXV0ZXMgLyB1bm11dGVzIGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSB7XG5cblx0aWYgKCFjb25maWcuY3VycmVudEF1ZGlvLm11dGVkKSB7XG5cblx0XHQvLyBDaGFuZ2Ugdmlld1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdmYS12b2x1bWUtdXAnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLW9mZicpO1xuXG5cdFx0Ly8gTXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLW9mZicpO1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKCdmYS12b2x1bWUtdXAnKTtcblxuXHRcdC8vIFVubXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8udW5tdXRlKCk7XG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCA9IGZhbHNlO1xuXHR9XG5cbn1cblxuLy8gQ2hhbmdlIHZvbHVtZSBsZXZlbCBvZiBjdXJyZW50IGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZVNsaWRlcklucHV0KGV2ZW50KSB7XG5cdGNvbmZpZy5jdXJyZW50QXVkaW8udm9sdW1lKHRoaXMudmFsdWUvMTAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2NvcmUobmV3U2NvcmUpIHtcblxuXHR2YXIgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUnKVswXTtcblx0dmFyIHNjb3JlTnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlLW51bWJlcicpWzBdO1xuXG5cdHNjb3JlLmNsYXNzTGlzdC5hZGQoJ3VwZGF0ZScpO1xuXHRzZXRUaW1lb3V0KCgpPT57IHNjb3JlLmNsYXNzTGlzdC5yZW1vdmUoJ3VwZGF0ZScpOyB9LCA0MDApO1xuXG5cdGNvbmZpZy5jdXJyZW50U2NvcmUgPSBwYXJzZUludChuZXdTY29yZSk7XG5cdHNjb3JlTnVtYmVyLmlubmVySFRNTCA9IGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cblx0cmV0dXJuIGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cbn1cblxuLy8gKioqKioqKioqKlxuLy8gKiBDQU5WQVMgKlxuLy8gKioqKioqKioqKlxuXG4vLyBDaGFuZ2VzIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgd2hlbiBmaXJlZFxuZnVuY3Rpb24gcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSB7XG5cdFxuXHRjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZSA9IHtcblx0XHR3aWR0aDogK29iamVjdC53aWR0aC5zbGljZSgwLC0yKSxcblx0XHRoZWlnaHQ6ICtvYmplY3QuaGVpZ2h0LnNsaWNlKDAsLTIpXG5cdH07XG5cblx0Y2FudmFzLnNldERpbWVuc2lvbnMoe1xuXHRcdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodFxuXHR9KTtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSB7XG5cblx0aWYgKG1vdmVtZW50SW5mby5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdHZhciByYWRpdXMgPSBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cztcblx0dmFyIHN0cm9rZVdpZHRoID0gY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aDtcblx0Ly8gdmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoIC0gKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLzEwMCkqMykgLSByYWRpdXMqMjtcblx0dmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoKTtcblx0dmFyIHkgPSBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCAqIDQ1KSArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMS42O1xuXG5cdHZhciBjaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdFx0ZmlsbDogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRcdHN0cm9rZTogJyNGRkZGRkYnLFxuXHRcdHN0cm9rZVdpZHRoOiBzdHJva2VXaWR0aCxcblx0XHRyYWRpdXM6IHJhZGl1cyxcblx0XHRvcmlnaW5ZOiAnY2VudGVyJyxcblx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHR9KTtcblxuXHQvLyBjb25zb2xlLmxvZygtY2lyY2xlLmdldFJhZGl1c1goKSowLjgpO1xuXHR2YXIgYXJyb3c7XG5cblx0c3dpdGNoIChtb3ZlbWVudEluZm8ubmFtZSkge1xuXHRcdGNhc2UgJ3VwJzpcblx0XHRcdGFycm93ID0gbmV3IGZhYnJpYy5QYXRoKGBcblx0XHRcdFx0TSAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMIDAgJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjU1fVxuXHRcdFx0XHRMICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC41fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAwICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdHpgLCB7XG5cdFx0XHRcdC8vIGZpbGw6ICcjZmZmJyxcblx0XHRcdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0XHRcdG9yaWdpblg6ICdjZW50ZXInXG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2Rvd24nOlxuXHRcdFx0YXJyb3cgPSBuZXcgZmFicmljLlBhdGgoYFxuXHRcdFx0XHRNICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgMCAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC41NX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMIDAgJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHR6YCwge1xuXHRcdFx0XHQvLyBmaWxsOiAnI2ZmZicsXG5cdFx0XHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdFx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHRcdFx0fSk7XG5cdFx0YnJlYWtcblx0fVxuXHRcblxuXHR2YXIgbW92ZW1lbnQgPSBuZXcgZmFicmljLkdyb3VwKFtjaXJjbGUsIGFycm93XSwge1xuXHRcdHRvcDogeSxcblx0XHRsZWZ0OiB4XG5cdH0pO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QgPSBtb3ZlbWVudDtcblxuXHRjYW52YXMuYWRkKG1vdmVtZW50KTtcblx0Y2FudmFzLnJlbmRlckFsbCgpO1xuXHQvLyBtb3ZlbWVudEluZm8uc3RhdGUgPSAnYWRkZWQnO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlTW92ZW1lbnQobW92ZW1lbnRJbmZvKSB7XG5cblx0Ly8gaWYgKG1vdmVtZW50SW5mby5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QuYW5pbWF0ZSgnbGVmdCcsICcnKygoY29uZmlnLm9uZVdQZXJjZW50ICogMjApICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoxLjUpLCB7XG5cdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdGR1cmF0aW9uOiBjb25maWcuY3VycmVudE1pbkludGVydmFsKjE2XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBvbkdsU2V0dXBFdmVudChldmVudCkge1xuXHRjb25maWcuY3VycmVudEJwbSA9IGV2ZW50LmRldGFpbC5icG07XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0qMTAwMCkvKDYwKjE2KTtcblx0Y29uZmlnLmN1cnJlbnRTb25nTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nO1xuXHRjb25maWcuY3VycmVudEF1ZGlvID0gZXZlbnQuZGV0YWlsLm11c2ljO1xuXHRjbG9zZVBvcHVwKCk7XG5cdGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbC5icG0pO1xuXG5cdC8vIFRlc3Rcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5wbGF5KCk7XG59XG5cbi8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG5mdW5jdGlvbiBvbkdsQWRkTW92ZW1lbnQoZXZlbnQpIHtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cy5wdXNoKHtuYW1lOiBldmVudC5kZXRhaWx9KTtcblx0dmFyIHRoaXNNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50TW92ZW1lbnRzLmxlbmd0aC0xXTtcblxuXHRpZiAodGhpc01vdmVtZW50Lm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0YWRkTW92ZW1lbnRPbkNhbnZhcyh0aGlzTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQodGhpc01vdmVtZW50KTtcblxufVxuXG5mdW5jdGlvbiBvbkdsU3RhdHVzKGV2ZW50KSB7XG5cblx0dmFyIHN0YXR1cyA9IGV2ZW50LmRldGFpbC5zdGF0dXM7XG5cdHZhciBtb3ZlbWVudEluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xuXHR2YXIgbmV3U2NvcmUgPSBldmVudC5kZXRhaWwubmV3U2NvcmU7XG5cblx0aWYgKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0dmFyIGNhbnZPYmogPSBjb25maWcuY3VycmVudE1vdmVtZW50c1ttb3ZlbWVudEluZGV4XS5jYW52YXNPYmplY3Q7XG5cblx0Ly8gUnVuIGNhbnZhcyBhbmltYXRpb25cblx0Y2Fudk9iai5zZXQoe1xuXHRcdGZpbGw6IGNvbmZpZy5jb2xvcnNbc3RhdHVzXSxcblx0XHQvLyBjZW50ZXJlZFNjYWxpbmc6IHRydWVcblx0fSk7XG5cblx0c3dpdGNoIChzdGF0dXMpIHtcblx0XHRjYXNlICdzdWNjZXNzJzpcblx0XHRcdGNhbnZPYmouYW5pbWF0ZSh7XG5cdFx0XHRcdCdzY2FsZVgnOiA2LFxuXHRcdFx0XHQnc2NhbGVZJzogNixcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICctPScrY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMqNS4yLFxuXHRcdFx0XHQndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyo1LjJcblx0XHRcdH0sIHtcblx0XHRcdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdFx0XHRkdXJhdGlvbjogNzAwLFxuXHRcdFx0XHRlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2ZhaWwnOlxuXHRcdFx0Y2Fudk9iai5hbmltYXRlKHtcblx0XHRcdFx0J3NjYWxlWCc6IDAuOCxcblx0XHRcdFx0J3NjYWxlWSc6IDAuOCxcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICcnKygtY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMpLFxuXHRcdFx0XHQvLyAndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1c1xuXHRcdFx0fSwge1xuXHRcdFx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0XHQvLyBlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblx0fVxuXG5cdC8vIFVwZGF0ZSBzY29yZVxuXHR1cGRhdGVTY29yZShuZXdTY29yZSk7XHRcblxufVxuXG4vLyBmdW5jdGlvbiBzdGFydCgpIHtcbi8vIFx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG4vLyBcdGNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gRGF0ZS5ub3coKTtcbi8vIFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gXHRcdG5leHRCZWF0KHRydWUpO1xuLy8gXHR9LCBjb25maWcuY3VycmVudEJlZ2lubmluZ09mZnNldCk7XG4vLyBcdGNvbmZpZy5jdXJyZW50QXVkaW8ucGxheSgpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBuZXh0QmVhdChpc0ZpcnN0KSB7XG5cbi8vIFx0Ly8gSWYgd2UncmUgaW4gdGhlIGJlZ2lubmluZyBvZiBzb25nXG4vLyBcdGlmIChpc0ZpcnN0ID09PSB0cnVlKSB7XG4vLyBcdFx0YWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG4vLyBcdFx0YW5pbWF0ZU1vdmVtZW50KGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcbi8vIFx0XHRyZXR1cm47XG4vLyBcdH1cblxuLy8gXHQvLyBJbnNlcnQgbmV3IG1vdmVtZW50XG4vLyBcdHZhciBhcHBlYXJpbmdNb3ZlbWVudEluZGV4ID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGNvbmZpZy5jdXJyZW50U3RhcnREYXRlKSAvIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRcbi8vIFx0dmFyIGFwcGVhcmluZ01vdmVtZW50ID0gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbYXBwZWFyaW5nTW92ZW1lbnRJbmRleF07XG5cbi8vIFx0YWRkTW92ZW1lbnRPbkNhbnZhcyhhcHBlYXJpbmdNb3ZlbWVudCk7XG4vLyBcdGFuaW1hdGVNb3ZlbWVudChhcHBlYXJpbmdNb3ZlbWVudCk7XG5cbi8vIH1cblxuXG5cblxuXG5cblxuXG5cbi8vICoqKioqKioqXG4vLyAqIEluaXQgKlxuLy8gKioqKioqKipcblxuY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBbXTtcbmNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuY29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSAwO1xuXG4vLyBUbyByZW1vdmUhXG4vLyBjb25maWcuY3VycmVudEJwbSA9IDEyODtcbi8vIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0qMTAwMCkgLyAoNjAqMTYpXG5cbi8vIEdldCBjb21wdXRlZCBzdHlsZXMgb2Ygd2hvbGUgcGFnZSB3cmFwcGVyXG52YXIgY2FudmFzQ29tcHV0ZWRTdHlsZU9iaiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndyJylbMF0pO1xuXG5cbi8vIFNldCBjYW52YXMgb3B0aW9uc1xuY29uZmlnLm9uZVdQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai53aWR0aC5zbGljZSgwLC0yKSkvMTAwO1xuY29uZmlnLm9uZUhQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai5oZWlnaHQuc2xpY2UoMCwtMikpLzEwMDtcblxuY29uZmlnLmNhbnZPcHRzID0ge1xuXHRiZ1VSTDogJy4uL2ltZy9iZy1jcm93ZC0xLmpwZycsXG5cdGNvbXB1dGVkU3R5bGU6IHtcblx0XHR3aWR0aDogY29uZmlnLm9uZVdQZXJjZW50KjEwMCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5vbmVIUGVyY2VudCoxMDBcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnJhZGl1c1BlcmNlbnQsXG5cdFx0c3Ryb2tlV2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCAqIGNvbmZpZy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGhQZXJjZW50XG5cdH1cbn1cblxuXG4vLyBJbml0aWFsaXplICdmYWJyaWMnIGNhbnZhcyBvYmpcbnZhciBjYW52YXMgPSBuZXcgZmFicmljLlN0YXRpY0NhbnZhcygnZ2FtZScsIHtcblx0d2lkdGg6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLFxuXHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodCxcbn0pO1xuXG4vLyBEcmF3IFwicGVyZmVjdCBzdWNjZXNzXCIgcGxhY2Ugc2hhZG93IGNpcmNsZVxudmFyIHNoYWRvd0NpcmNsZSA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcblx0Ly8gZmlsbDogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRmaWxsOiAncmdiYSgyMDAsMjAwLDIwMCwwLjIpJyxcblx0c3Ryb2tlOiAncmdiYSgyMDAsMjAwLDIwMCwxKScsXG5cdHN0cm9rZVdpZHRoOiBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoKjIsXG5cdHJhZGl1czogY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMgKyBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoLFxuXHR0b3A6IE1hdGgucm91bmQoY29uZmlnLm9uZUhQZXJjZW50KjQ1KSxcblx0bGVmdDogY29uZmlnLm9uZVdQZXJjZW50ICogMjBcbn0pXG5jYW52YXMuYWRkKHNoYWRvd0NpcmNsZSk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBhZGRpbmcgb2YgbmV4dCBtb3ZlbWVudCBpbiBxdWV1ZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2xBZGRNb3ZlbWVudCcsIG9uR2xBZGRNb3ZlbWVudCk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBtb3ZlbWVudCByZXN1bHQgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dsU3RhdHVzJywgb25HbFN0YXR1cyk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBnYW1lIHNldHVwIGV2ZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdnbFNldHVwRXZlbnQnLCBvbkdsU2V0dXBFdmVudCk7XG5cbi8vIFNob3cgY3VycmVudCBnYW1lIGNvZGVcbnZhciBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUtY29udGFpbmVyJyk7XG5jb2RlQ29udGFpbmVyLmlubmVySFRNTCA9IGNvZGU7XG5cblxuLy8gKioqKioqKioqXG4vLyAqIEF1ZGlvICpcbi8vICoqKioqKioqKlxuXG4vLyBBZGQgbXV0ZWQgc3RhdGUgc2F2aW5nIGZlYXR1cmUgdG8gSG93bCAoYXVkaW8gbGliKVxuSG93bC5wcm90b3R5cGUubXV0ZWQgPSBmYWxzZTtcbkhvd2wubXV0ZWQgPSBmYWxzZTtcblxuLy8gR2V0IHZvbHVtZSBidXR0b24gZWxlbWVudFxudmFyIHZvbHVtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2x1bWUtYnRuJylbMF07XG4vLyBhbmQgc2V0IG9uQ2xpY2sgZXZlbnQgaGFuZGxlclxudm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Wb2x1bWVCdG5DbGljayk7XG5cbi8vIEdldCB2b2x1bWUgbGV2ZWwgc2xpZGVyXG52YXIgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1pbnB1dCcpWzBdO1xuLy8gYW5kIHNldCBvbklucHV0IGV2ZW50IGhhbmRsZXJcbnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVm9sdW1lU2xpZGVySW5wdXQpXG5cblxuLy8gQ2hhbmdlIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgb24gd2luZG93IHJlc2l6ZVxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKXtcblx0cmVmcmVzaENvbXB1dGVkU2l6ZXMoY2FudmFzQ29tcHV0ZWRTdHlsZU9iaik7XG5cdGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpO1xufVxuXG5cblxuXG5cblxuXG5cblxuLy8gVEVTVFxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
