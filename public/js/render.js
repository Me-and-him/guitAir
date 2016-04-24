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

	function updateScore(add) {

		var score = document.querySelectorAll('.score')[0];
		var scoreNumber = document.querySelectorAll('.score-number')[0];

		score.classList.add('update');
		setTimeout(function () {
			score.classList.remove('update');
		}, 400);

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
			// onChange: canvas.renderAll.bind(canvas),
			onChange: canvas.renderAll.bind(canvas),
			duration: config.currentMinInterval * 16
		});
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

		if (config.currentMovements[movementIndex].name == 'pass') return;

		// console.log(movementIndex);
		var canvObj = config.currentMovements[movementIndex].canvasObject;

		// TEST

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
	config.currentBpm = 128;
	config.currentMinInterval = config.currentBpm * 1000 / (60 * 16);

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

	// Set handler for game setup event
	document.addEventListener('glAddMovement', onGlAddMovement);

	// Set handler for movement result event
	document.addEventListener('glStatus', onGlStatus);

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
	document.addEventListener('click', closePopup);
})();
//# sourceMappingURL=data:application/json;base64,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SSxnQkFBZ0IsU0FBUyxjQUFULENBQXdCLGdCQUF4QixDQUFwQjtBQUNBLGVBQWMsU0FBZCxHQUEwQixJQUExQjs7Ozs7OztBQVFBLE1BQUssU0FBTCxDQUFlLEtBQWYsR0FBdUIsS0FBdkI7QUFDQSxNQUFLLEtBQUwsR0FBYSxLQUFiOzs7QUFHQSxLQUFJLFlBQVksU0FBUyxnQkFBVCxDQUEwQixhQUExQixFQUF5QyxDQUF6QyxDQUFoQjs7QUFFQSxXQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLGdCQUFwQzs7O0FBR0EsS0FBSSxlQUFlLFNBQVMsZ0JBQVQsQ0FBMEIsZUFBMUIsRUFBMkMsQ0FBM0MsQ0FBbkI7O0FBRUEsY0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxtQkFBdkM7OztBQUlBLFFBQU8sUUFBUCxHQUFrQixZQUFVO0FBQzNCLHVCQUFxQixzQkFBckI7QUFDQSxTQUFPLFNBQVAsQ0FBaUIsSUFBakIsQ0FBc0IsTUFBdEI7QUFDQSxFQUhEOzs7QUFjQSxVQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQW5DO0FBRUMsQ0EvWEQiLCJmaWxlIjoicmVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiO1xuLy9cbi8vXHRVdGlsc1xuLy9cbi8vICogYW5pbWF0ZShjYiwgZHVyYXRvbikgLS0gd3JhcHBlciBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbi8vXG4vLyBET00gbWFuaXB1bGF0aW9uc1xuLy9cbi8vICogY2xvc2VQb3B1cChldmVudCkgLS0gY2xvc2UgcG9wdXAgd2l0aCB1c2VycyB1bmlxdWUgY29kZVxuLy8gKiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSAtLSBoYW5kbGVyIGZvciB2b2x1bWUgYnV0dG9ucyBjbGlja3MgKG11dGUvdW5tdXRlIHRyaWdnZXIpXG4vLyAqIG9uVm9sdW1lU2xpZGVySW5wdXQoZXZlbnQpIC0tIGNoYW5nZSBhdWRpbyB2b2x1bWUgd2hlbnZvbHVtZSBzbGlkZXIgaXMgYmVpbmcgbW92ZWRcbi8vICogdXBkYXRlU2NvcmUobnVtYmVyKSAtLSB1cGRhdGUgY3VycmVudCBzY29yZVxuLy9cbi8vXHRDYW52YXNcbi8vXG4vLyAqIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkgLS0gY2hhbmdlIDxjYW52YXM+IHNpemVzIHRvIGFjdHVhbFxuLy8gKiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykgLS0gYWRkIG5ldyBtb3ZlbWVudCBjYW52YXMtb2JqZWN0XG4vLyAqIGFuaW1hdGVNb3ZlbWVudChvYmplY3QpIC0tIG1ha2UgcmVjaWV2ZWQgYWxyZWFkeSBhZGRlZCBtb3ZlbWVudCBydW4gKGFuaW1hdGUpXG4vLyAqIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSAtLSBoYW5kbGVyIGZvciBldmVudCwgZmlyZWQgd2hlbiBnYW1lIHNldHRpbmdzIGFyZSByZWNpZXZlZFxuLy9cbi8vIFRvIHJlbW92ZVxuLy9cbi8vICogc3RhcnQoKSAtLSBzdGFydCBnYW1lXG4vLyAqIG5leHRCZWF0KGlzRmlyc3QpIC0tIHByb2Nlc3MgKGFuZCBhZGQpIG5leHQgbW92ZW1lbnRcbi8vXG4vLyBJbml0aWFsaXphdGlvblxuLy9cblxuXG4oZnVuY3Rpb24oKXtcblxuZnVuY3Rpb24gYW5pbWF0ZShkcmF3LCBkdXJhdGlvbikge1xuICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYW5pbWF0ZSh0aW1lKSB7XG4gICAgLy8g0L7Qv9GA0LXQtNC10LvQuNGC0YwsINGB0LrQvtC70YzQutC+INC/0YDQvtGI0LvQviDQstGA0LXQvNC10L3QuCDRgSDQvdCw0YfQsNC70LAg0LDQvdC40LzQsNGG0LjQuFxuICAgIHZhciB0aW1lUGFzc2VkID0gdGltZSAtIHN0YXJ0O1xuXG4gICAgLy8g0LLQvtC30LzQvtC20L3QviDQvdC10LHQvtC70YzRiNC+0LUg0L/RgNC10LLRi9GI0LXQvdC40LUg0LLRgNC10LzQtdC90LgsINCyINGN0YLQvtC8INGB0LvRg9GH0LDQtSDQt9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjCDQutC+0L3QtdGGXG4gICAgaWYgKHRpbWVQYXNzZWQgPiBkdXJhdGlvbikgdGltZVBhc3NlZCA9IGR1cmF0aW9uO1xuXG4gICAgLy8g0L3QsNGA0LjRgdC+0LLQsNGC0Ywg0YHQvtGB0YLQvtGP0L3QuNC1INCw0L3QuNC80LDRhtC40Lgg0LIg0LzQvtC80LXQvdGCIHRpbWVQYXNzZWRcbiAgICBkcmF3KHRpbWVQYXNzZWQpO1xuXG4gICAgLy8g0LXRgdC70Lgg0LLRgNC10LzRjyDQsNC90LjQvNCw0YbQuNC4INC90LUg0LfQsNC60L7QvdGH0LjQu9C+0YHRjCAtINC30LDQv9C70LDQvdC40YDQvtCy0LDRgtGMINC10YnRkSDQutCw0LTRgFxuICAgIGlmICh0aW1lUGFzc2VkIDwgZHVyYXRpb24pIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICB9XG5cbiAgfSk7XG59XG5cblxudmFyIGNvbmZpZyA9IHtcblx0Y29sb3JzOiB7XG5cdFx0bmV1dHJhbDogJyNGRkE3MDAnLCAvLyAjOEQ5OUFFICMxMDdFN0Rcblx0XHRzdWNjZXNzOiAnI0MyRTgxMicsXG5cdFx0ZmFpbDogJyNCODBDMDknXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1c1BlcmNlbnQ6IDQsXG5cdFx0c3Ryb2tlV2lkdGhQZXJjZW50OiAwLjVcblx0fVxufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2ZW50KSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cCcpWzBdLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sb2dvJylbMF0uY2xhc3NMaXN0LnJlbW92ZSgnd2l0aC1wb3B1cCcpXG59XG5cbi8vIE11dGVzIC8gdW5tdXRlcyBhdWRpb1xuZnVuY3Rpb24gb25Wb2x1bWVCdG5DbGljayhldmVudCkge1xuXG5cdGlmICghY29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCkge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLXVwJyk7XG5cdFx0dGhpcy5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5hZGQoJ2ZhLXZvbHVtZS1vZmYnKTtcblxuXHRcdC8vIE11dGVcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLm11dGUoKTtcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLm11dGVkID0gdHJ1ZTtcblx0fSBlbHNlIHtcblxuXHRcdC8vIENoYW5nZSB2aWV3XG5cdFx0dGhpcy5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXZvbHVtZS1vZmYnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLXVwJyk7XG5cblx0XHQvLyBVbm11dGVcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLnVubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSBmYWxzZTtcblx0fVxuXG59XG5cbi8vIENoYW5nZSB2b2x1bWUgbGV2ZWwgb2YgY3VycmVudCBhdWRpb1xuZnVuY3Rpb24gb25Wb2x1bWVTbGlkZXJJbnB1dChldmVudCkge1xuXHRjb25maWcuY3VycmVudEF1ZGlvLnZvbHVtZSh0aGlzLnZhbHVlLzEwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlKGFkZCkge1xuXG5cdHZhciBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZScpWzBdO1xuXHR2YXIgc2NvcmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUtbnVtYmVyJylbMF07XG5cblx0c2NvcmUuY2xhc3NMaXN0LmFkZCgndXBkYXRlJyk7XG5cdHNldFRpbWVvdXQoKCk9Pnsgc2NvcmUuY2xhc3NMaXN0LnJlbW92ZSgndXBkYXRlJyk7IH0sIDQwMCk7XG5cblx0Y29uZmlnLmN1cnJlbnRTY29yZSArPSBwYXJzZUludChhZGQpO1xuXHRzY29yZU51bWJlci5pbm5lckhUTUwgPSBjb25maWcuY3VycmVudFNjb3JlO1xuXG5cdHJldHVybiBjb25maWcuY3VycmVudFNjb3JlO1xuXG59XG5cbi8vICoqKioqKioqKipcbi8vICogQ0FOVkFTICpcbi8vICoqKioqKioqKipcblxuLy8gQ2hhbmdlcyBjYW52YXMgYmFja2dyb3VuZCBzaXplIHdoZW4gZmlyZWRcbmZ1bmN0aW9uIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkge1xuXHRcblx0Y29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUgPSB7XG5cdFx0d2lkdGg6ICtvYmplY3Qud2lkdGguc2xpY2UoMCwtMiksXG5cdFx0aGVpZ2h0OiArb2JqZWN0LmhlaWdodC5zbGljZSgwLC0yKVxuXHR9O1xuXG5cdGNhbnZhcy5zZXREaW1lbnNpb25zKHtcblx0XHR3aWR0aDogY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgsXG5cdFx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHRcblx0fSk7XG5cbn1cblxuXG5mdW5jdGlvbiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykge1xuXG5cdGlmIChtb3ZlbWVudEluZm8ubmFtZSA9PSAncGFzcycpIHJldHVybjtcblxuXHR2YXIgcmFkaXVzID0gY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXM7XG5cdHZhciBzdHJva2VXaWR0aCA9IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGg7XG5cdC8vIHZhciB4ID0gTWF0aC5yb3VuZChjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCAtIChjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aC8xMDApKjMpIC0gcmFkaXVzKjI7XG5cdHZhciB4ID0gTWF0aC5yb3VuZChjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCk7XG5cdHZhciB5ID0gTWF0aC5yb3VuZChjb25maWcub25lSFBlcmNlbnQgKiA0NSkgKyBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoKjEuNjtcblxuXHR2YXIgY2lyY2xlID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xuXHRcdGZpbGw6IGNvbmZpZy5jb2xvcnMubmV1dHJhbCxcblx0XHRzdHJva2U6ICcjRkZGRkZGJyxcblx0XHRzdHJva2VXaWR0aDogc3Ryb2tlV2lkdGgsXG5cdFx0cmFkaXVzOiByYWRpdXMsXG5cdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0b3JpZ2luWDogJ2NlbnRlcidcblx0fSk7XG5cblx0Ly8gY29uc29sZS5sb2coLWNpcmNsZS5nZXRSYWRpdXNYKCkqMC44KTtcblx0dmFyIGFycm93O1xuXG5cdHN3aXRjaCAobW92ZW1lbnRJbmZvLm5hbWUpIHtcblx0XHRjYXNlICd1cCc6XG5cdFx0XHRhcnJvdyA9IG5ldyBmYWJyaWMuUGF0aChgXG5cdFx0XHRcdE0gJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAwICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC41NX1cblx0XHRcdFx0TCAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC42NX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgMCAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHR6YCwge1xuXHRcdFx0XHQvLyBmaWxsOiAnI2ZmZicsXG5cdFx0XHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdFx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHRcdFx0fSk7XG5cdFx0YnJlYWs7XG5cblx0XHRjYXNlICdkb3duJzpcblx0XHRcdGFycm93ID0gbmV3IGZhYnJpYy5QYXRoKGBcblx0XHRcdFx0TSAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC42NX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMIDAgJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuNTV9XG5cdFx0XHRcdEwgJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAwICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0emAsIHtcblx0XHRcdFx0Ly8gZmlsbDogJyNmZmYnLFxuXHRcdFx0XHRvcmlnaW5ZOiAnY2VudGVyJyxcblx0XHRcdFx0b3JpZ2luWDogJ2NlbnRlcidcblx0XHRcdH0pO1xuXHRcdGJyZWFrXG5cdH1cblx0XG5cblx0dmFyIG1vdmVtZW50ID0gbmV3IGZhYnJpYy5Hcm91cChbY2lyY2xlLCBhcnJvd10sIHtcblx0XHR0b3A6IHksXG5cdFx0bGVmdDogeFxuXHR9KTtcblxuXHRtb3ZlbWVudEluZm8uY2FudmFzT2JqZWN0ID0gbW92ZW1lbnQ7XG5cblx0Y2FudmFzLmFkZChtb3ZlbWVudCk7XG5cdGNhbnZhcy5yZW5kZXJBbGwoKTtcblx0Ly8gbW92ZW1lbnRJbmZvLnN0YXRlID0gJ2FkZGVkJztcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZU1vdmVtZW50KG1vdmVtZW50SW5mbykge1xuXG5cdC8vIGlmIChtb3ZlbWVudEluZm8ubmFtZSA9PSAncGFzcycpIHJldHVybjtcblxuXHRtb3ZlbWVudEluZm8uY2FudmFzT2JqZWN0LmFuaW1hdGUoJ2xlZnQnLCAnJysoKGNvbmZpZy5vbmVXUGVyY2VudCAqIDIwKSArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMS41KSwge1xuXHRcdC8vIG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0ZHVyYXRpb246IGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwqMTZcblx0fSk7XG59XG5cbi8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG5mdW5jdGlvbiBvbkdsQWRkTW92ZW1lbnQoZXZlbnQpIHtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cy5wdXNoKHtuYW1lOiBldmVudC5kZXRhaWx9KTtcblx0dmFyIHRoaXNNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50TW92ZW1lbnRzLmxlbmd0aC0xXTtcblxuXHRpZiAodGhpc01vdmVtZW50Lm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0YWRkTW92ZW1lbnRPbkNhbnZhcyh0aGlzTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQodGhpc01vdmVtZW50KTtcblxufVxuXG5mdW5jdGlvbiBvbkdsU3RhdHVzKGV2ZW50KSB7XG5cblx0dmFyIHN0YXR1cyA9IGV2ZW50LmRldGFpbC5zdGF0dXM7XG5cdHZhciBtb3ZlbWVudEluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xuXG5cdGlmIChjb25maWcuY3VycmVudE1vdmVtZW50c1ttb3ZlbWVudEluZGV4XS5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdC8vIGNvbnNvbGUubG9nKG1vdmVtZW50SW5kZXgpO1xuXHR2YXIgY2Fudk9iaiA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLmNhbnZhc09iamVjdDtcblxuXG5cdC8vIFRFU1RcblxuXG5cdGNhbnZPYmouc2V0KHtcblx0XHRmaWxsOiBjb25maWcuY29sb3JzW3N0YXR1c10sXG5cdFx0Ly8gY2VudGVyZWRTY2FsaW5nOiB0cnVlXG5cdH0pO1xuXG5cdHN3aXRjaCAoc3RhdHVzKSB7XG5cdFx0Y2FzZSAnc3VjY2Vzcyc6XG5cdFx0XHRjYW52T2JqLmFuaW1hdGUoe1xuXHRcdFx0XHQnc2NhbGVYJzogNixcblx0XHRcdFx0J3NjYWxlWSc6IDYsXG5cdFx0XHRcdCdvcGFjaXR5JzogMCxcblx0XHRcdFx0J2xlZnQnOiAnLT0nK2NvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzKjUuMixcblx0XHRcdFx0J3RvcCc6ICctPScrY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMqNS4yXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0XHRcdFx0ZHVyYXRpb246IDcwMCxcblx0XHRcdFx0ZWFzaW5nOiBmYWJyaWMudXRpbC5lYXNlLmVhc2VPdXRRdWFydFxuXHRcdFx0fSk7XG5cdFx0YnJlYWs7XG5cblx0XHRjYXNlICdmYWlsJzpcblx0XHRcdGNhbnZPYmouYW5pbWF0ZSh7XG5cdFx0XHRcdCdzY2FsZVgnOiAwLjgsXG5cdFx0XHRcdCdzY2FsZVknOiAwLjgsXG5cdFx0XHRcdCdvcGFjaXR5JzogMCxcblx0XHRcdFx0J2xlZnQnOiAnJysoLWNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzKSxcblx0XHRcdFx0Ly8gJ3RvcCc6ICctPScrY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXNcblx0XHRcdH0sIHtcblx0XHRcdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0Ly8gZWFzaW5nOiBmYWJyaWMudXRpbC5lYXNlLmVhc2VPdXRRdWFydFxuXHRcdFx0fSk7XG5cdFx0YnJlYWs7XG5cdH1cblx0XG5cbn1cblxuLy8gZnVuY3Rpb24gc3RhcnQoKSB7XG4vLyBcdGNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuLy8gXHRjb25maWcuY3VycmVudFN0YXJ0RGF0ZSA9IERhdGUubm93KCk7XG4vLyBcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbi8vIFx0XHRuZXh0QmVhdCh0cnVlKTtcbi8vIFx0fSwgY29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQpO1xuLy8gXHRjb25maWcuY3VycmVudEF1ZGlvLnBsYXkoKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gbmV4dEJlYXQoaXNGaXJzdCkge1xuXG4vLyBcdC8vIElmIHdlJ3JlIGluIHRoZSBiZWdpbm5pbmcgb2Ygc29uZ1xuLy8gXHRpZiAoaXNGaXJzdCA9PT0gdHJ1ZSkge1xuLy8gXHRcdGFkZE1vdmVtZW50T25DYW52YXMoY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbMF0pO1xuLy8gXHRcdGFuaW1hdGVNb3ZlbWVudChjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG4vLyBcdFx0cmV0dXJuO1xuLy8gXHR9XG5cbi8vIFx0Ly8gSW5zZXJ0IG5ldyBtb3ZlbWVudFxuLy8gXHR2YXIgYXBwZWFyaW5nTW92ZW1lbnRJbmRleCA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBjb25maWcuY3VycmVudFN0YXJ0RGF0ZSkgLyBjb25maWcuY3VycmVudE1pbkludGVydmFsKTtcblx0XG4vLyBcdHZhciBhcHBlYXJpbmdNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2FwcGVhcmluZ01vdmVtZW50SW5kZXhdO1xuXG4vLyBcdGFkZE1vdmVtZW50T25DYW52YXMoYXBwZWFyaW5nTW92ZW1lbnQpO1xuLy8gXHRhbmltYXRlTW92ZW1lbnQoYXBwZWFyaW5nTW92ZW1lbnQpO1xuXG4vLyB9XG5cblxuXG5cblxuXG5cblxuXG4vLyAqKioqKioqKlxuLy8gKiBJbml0ICpcbi8vICoqKioqKioqXG5cbmNvbmZpZy5jdXJyZW50TW92ZW1lbnRzID0gW107XG5jb25maWcuY3VycmVudFNjb3JlID0gMDtcbmNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gMDtcblxuLy8gVG8gcmVtb3ZlIVxuY29uZmlnLmN1cnJlbnRCcG0gPSAxMjg7XG5jb25maWcuY3VycmVudE1pbkludGVydmFsID0gKGNvbmZpZy5jdXJyZW50QnBtKjEwMDApIC8gKDYwKjE2KVxuXG4vLyBHZXQgY29tcHV0ZWQgc3R5bGVzIG9mIHdob2xlIHBhZ2Ugd3JhcHBlclxudmFyIGNhbnZhc0NvbXB1dGVkU3R5bGVPYmogPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cicpWzBdKTtcblxuXG4vLyBTZXQgY2FudmFzIG9wdGlvbnNcbmNvbmZpZy5vbmVXUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmoud2lkdGguc2xpY2UoMCwtMikpLzEwMDtcbmNvbmZpZy5vbmVIUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmouaGVpZ2h0LnNsaWNlKDAsLTIpKS8xMDA7XG5cbmNvbmZpZy5jYW52T3B0cyA9IHtcblx0YmdVUkw6ICcuLi9pbWcvYmctY3Jvd2QtMS5qcGcnLFxuXHRjb21wdXRlZFN0eWxlOiB7XG5cdFx0d2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCoxMDAsXG5cdFx0aGVpZ2h0OiBjb25maWcub25lSFBlcmNlbnQqMTAwXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1czogY29uZmlnLm9uZVdQZXJjZW50ICogY29uZmlnLm1vdmVtZW50cy5yYWRpdXNQZXJjZW50LFxuXHRcdHN0cm9rZVdpZHRoOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnN0cm9rZVdpZHRoUGVyY2VudFxuXHR9XG59XG5cblxuLy8gSW5pdGlhbGl6ZSAnZmFicmljJyBjYW52YXMgb2JqXG52YXIgY2FudmFzID0gbmV3IGZhYnJpYy5TdGF0aWNDYW52YXMoJ2dhbWUnLCB7XG5cdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHQsXG59KTtcblxuLy8gRHJhdyBcInBlcmZlY3Qgc3VjY2Vzc1wiIHBsYWNlIHNoYWRvdyBjaXJjbGVcbnZhciBzaGFkb3dDaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdC8vIGZpbGw6IGNvbmZpZy5jb2xvcnMubmV1dHJhbCxcblx0ZmlsbDogJ3JnYmEoMjAwLDIwMCwyMDAsMC4yKScsXG5cdHN0cm9rZTogJ3JnYmEoMjAwLDIwMCwyMDAsMSknLFxuXHRzdHJva2VXaWR0aDogY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoyLFxuXHRyYWRpdXM6IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCxcblx0dG9wOiBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCo0NSksXG5cdGxlZnQ6IGNvbmZpZy5vbmVXUGVyY2VudCAqIDIwXG59KVxuY2FudmFzLmFkZChzaGFkb3dDaXJjbGUpO1xuXG4vLyBTZXQgaGFuZGxlciBmb3IgZ2FtZSBzZXR1cCBldmVudFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2xBZGRNb3ZlbWVudCcsIG9uR2xBZGRNb3ZlbWVudCk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBtb3ZlbWVudCByZXN1bHQgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dsU3RhdHVzJywgb25HbFN0YXR1cyk7XG5cbi8vIFNob3cgY3VycmVudCBnYW1lIGNvZGVcbnZhciBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUtY29udGFpbmVyJyk7XG5jb2RlQ29udGFpbmVyLmlubmVySFRNTCA9IGNvZGU7XG5cblxuLy8gKioqKioqKioqXG4vLyAqIEF1ZGlvICpcbi8vICoqKioqKioqKlxuXG4vLyBBZGQgbXV0ZWQgc3RhdGUgc2F2aW5nIGZlYXR1cmUgdG8gSG93bCAoYXVkaW8gbGliKVxuSG93bC5wcm90b3R5cGUubXV0ZWQgPSBmYWxzZTtcbkhvd2wubXV0ZWQgPSBmYWxzZTtcblxuLy8gR2V0IHZvbHVtZSBidXR0b24gZWxlbWVudFxudmFyIHZvbHVtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2x1bWUtYnRuJylbMF07XG4vLyBhbmQgc2V0IG9uQ2xpY2sgZXZlbnQgaGFuZGxlclxudm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Wb2x1bWVCdG5DbGljayk7XG5cbi8vIEdldCB2b2x1bWUgbGV2ZWwgc2xpZGVyXG52YXIgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1pbnB1dCcpWzBdO1xuLy8gYW5kIHNldCBvbklucHV0IGV2ZW50IGhhbmRsZXJcbnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVm9sdW1lU2xpZGVySW5wdXQpXG5cblxuLy8gQ2hhbmdlIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgb24gd2luZG93IHJlc2l6ZVxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKXtcblx0cmVmcmVzaENvbXB1dGVkU2l6ZXMoY2FudmFzQ29tcHV0ZWRTdHlsZU9iaik7XG5cdGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpO1xufVxuXG5cblxuXG5cblxuXG5cblxuLy8gVEVTVFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
