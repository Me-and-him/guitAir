'use strict';

/**
 * gamelogic.js
 */

(function () {
			//

			var EPSILON = 1000;
			var config = {};

			// Actions performed when current game settings recieved
			function onAgSetupEvent(event) {

						var audioFileURL = 'http://' + window.location.hostname + '/songs/' + event.detail.song;
						// let audioFileURL = '../audio/' + event.detail.song;

						// console.log(audioFileURL);

						config.currentAudio = new Howl({
									urls: [audioFileURL],
									autoplay: false,
									volume: 0.8
						});

						// config.currentMovements = event.detail.commands.map((currentValue, index, array) => {
						//     return {
						// 	index: index,
						// 	name: currentValue,
						// 	color: config.colors.neutral,
						//     }
						// });
						config.currentMovements = event.detail.commands;

						// BPM, minInterval, beginning offset
						// config.currentBpm = event.detail.bpm;
						config.currentBpm = 128;
						config.currentMinInterval = config.currentBpm * 1000 / (60 * 16);
						config.currentBeginningOffset = event.detail.offset;

						// Test
						// addMovementOnCanvas(config.currentMovements[1]);
						start();
			}

			function start() {
						config.currentScore = 0;
						config.currentStartDate = Date.now();
						setTimeout(function () {
									nextBeat(true);
						}, config.currentBeginningOffset);
						config.currentAudio.start();
			}

			function nextBeat(isFirst) {

						// If we're in the beginning of song
						if (isFirst === true) {
									//addMovementOnCanvas(config.currentMovements[0]);
									//animateMovement(config.currentMovements[0]);
									config.currentIndex = 0;
									var newEvent = new CustomEvent('glAddMovement', { detail: config.currentMovements[config.currentIndex] });
									document.dispatchEvent(newEvent);
									setTimeout(nextBeat, config.currentMinInterval);
									return;
						}

						// Insert new movement
						//var appearingMovementIndex = Math.floor((Date.now() - config.currentStartDate) / config.currentMinInterval);
						console.log('apearing movement index: ' + appearingMovementIndex);
						var appearingMovement = config.currentMovements[config.currentIndex];

						var newEvent = new CustomEvent('glAddMovement', { detail: appearingMovement });
						document.dispatchEvent(newEvent);
						setTimeout(nextBeat, config.currentMinInterval);
						console.log(appearingMovementIndex);
			}

			// function onAgSetupEvent(event) {
			// 	config.movements = event.detail.commands;
			// }

			function onAgCommandEvent(event) {
						var time = Date.now();
						if (Math.abs(time - event.detail.time) < EPSILON) {
									var newEvent = new CustomEvent('glStatus', { detail: "success" });
									document.addEventListener(newEvent);
						} else {
									var newEvent = new CustomEvent('glStatus', { detail: "fail" });
									document.addEventListener(newEvent);
						}
			}

			document.addEventListener('agSetupEvent', onAgSetupEvent);
			// document.addEventListener('agSetupEvent', function(event) {
			// 	console.log('agSetupEvent: ' + JSON.stringify(event.detail));
			// });
			Document.addEventListener('agCommandEvent', onAgCommandEvent);
			// document.addEventListener('agCmmandEvent', function(event) {
			// 	console.log('agCommandEvent: ' + JSON.stringify(event.detail));
			// });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWVsb2dpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxDQUFDLFlBQVc7OztBQUdSLE9BQUksVUFBVSxJQUFkO0FBQ0EsT0FBSSxTQUFTLEVBQWI7OztBQUdBLFlBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQjs7QUFFbEMsVUFBSSxlQUFlLFlBQVksT0FBTyxRQUFQLENBQWdCLFFBQTVCLEdBQXVDLFNBQXZDLEdBQW1ELE1BQU0sTUFBTixDQUFhLElBQW5GOzs7OztBQUtBLGFBQU8sWUFBUCxHQUFzQixJQUFJLElBQUosQ0FBUztBQUMzQixlQUFNLENBQUMsWUFBRCxDQURxQjtBQUUzQixtQkFBVSxLQUZpQjtBQUczQixpQkFBUTtBQUhtQixPQUFULENBQXRCOzs7Ozs7Ozs7QUFhQSxhQUFPLGdCQUFQLEdBQTBCLE1BQU0sTUFBTixDQUFhLFFBQXZDOzs7O0FBSUEsYUFBTyxVQUFQLEdBQW9CLEdBQXBCO0FBQ0EsYUFBTyxrQkFBUCxHQUE2QixPQUFPLFVBQVAsR0FBb0IsSUFBckIsSUFBOEIsS0FBSyxFQUFuQyxDQUE1QjtBQUNBLGFBQU8sc0JBQVAsR0FBZ0MsTUFBTSxNQUFOLENBQWEsTUFBN0M7Ozs7QUFJQTtBQUVJOztBQUVELFlBQVMsS0FBVCxHQUFpQjtBQUNwQixhQUFPLFlBQVAsR0FBc0IsQ0FBdEI7QUFDQSxhQUFPLGdCQUFQLEdBQTBCLEtBQUssR0FBTCxFQUExQjtBQUNBLGlCQUFXLFlBQVU7QUFDakIsa0JBQVMsSUFBVDtBQUNILE9BRkQsRUFFRyxPQUFPLHNCQUZWO0FBR0EsYUFBTyxZQUFQLENBQW9CLEtBQXBCO0FBQ0k7O0FBRUQsWUFBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCOzs7QUFHOUIsVUFBSSxZQUFZLElBQWhCLEVBQXNCOzs7QUFHbEIsZ0JBQU8sWUFBUCxHQUFzQixDQUF0QjtBQUNBLGFBQUksV0FBVyxJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUMsRUFBQyxRQUFRLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBTyxZQUEvQixDQUFULEVBQWpDLENBQWY7QUFDQSxrQkFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0Esb0JBQVcsUUFBWCxFQUFxQixPQUFPLGtCQUE1QjtBQUNBO0FBQ0g7Ozs7QUFJRCxjQUFRLEdBQVIsQ0FBWSw4QkFBOEIsc0JBQTFDO0FBQ0EsVUFBSSxvQkFBb0IsT0FBTyxnQkFBUCxDQUF3QixPQUFPLFlBQS9CLENBQXhCOztBQUVBLFVBQUksV0FBVyxJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUMsRUFBQyxRQUFRLGlCQUFULEVBQWpDLENBQWY7QUFDQSxlQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxpQkFBVyxRQUFYLEVBQXFCLE9BQU8sa0JBQTVCO0FBQ0EsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDSTs7Ozs7O0FBTUQsWUFBUyxnQkFBVCxDQUEwQixLQUExQixFQUFpQztBQUNwQyxVQUFJLE9BQU8sS0FBSyxHQUFMLEVBQVg7QUFDQSxVQUFJLEtBQUssR0FBTCxDQUFTLE9BQU8sTUFBTSxNQUFOLENBQWEsSUFBN0IsSUFBcUMsT0FBekMsRUFBa0Q7QUFDOUMsYUFBSSxXQUFXLElBQUksV0FBSixDQUFnQixVQUFoQixFQUE0QixFQUFDLFFBQVEsU0FBVCxFQUE1QixDQUFmO0FBQ0Esa0JBQVMsZ0JBQVQsQ0FBMEIsUUFBMUI7QUFDSCxPQUhELE1BR087QUFDSCxhQUFJLFdBQVcsSUFBSSxXQUFKLENBQWdCLFVBQWhCLEVBQTRCLEVBQUMsUUFBUSxNQUFULEVBQTVCLENBQWY7QUFDQSxrQkFBUyxnQkFBVCxDQUEwQixRQUExQjtBQUNIO0FBQ0c7O0FBRUQsWUFBUyxnQkFBVCxDQUEwQixjQUExQixFQUEwQyxjQUExQzs7OztBQUlBLFlBQVMsZ0JBQVQsQ0FBMEIsZ0JBQTFCLEVBQTRDLGdCQUE1Qzs7OztBQUlILENBakdEIiwiZmlsZSI6ImdhbWVsb2dpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICB2YXIgRVBTSUxPTiA9IDEwMDA7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbiAgICBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuXG5cdGxldCBhdWRpb0ZpbGVVUkwgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnL3NvbmdzLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Ly8gbGV0IGF1ZGlvRmlsZVVSTCA9ICcuLi9hdWRpby8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cblx0Ly8gY29uc29sZS5sb2coYXVkaW9GaWxlVVJMKTtcblxuXHRjb25maWcuY3VycmVudEF1ZGlvID0gbmV3IEhvd2woe1xuXHQgICAgdXJsczogW2F1ZGlvRmlsZVVSTF0sXG5cdCAgICBhdXRvcGxheTogZmFsc2UsXG5cdCAgICB2b2x1bWU6IDAuOCxcblx0fSk7XG5cblx0Ly8gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBldmVudC5kZXRhaWwuY29tbWFuZHMubWFwKChjdXJyZW50VmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuXHQvLyAgICAgcmV0dXJuIHtcblx0Ly8gXHRpbmRleDogaW5kZXgsXG5cdC8vIFx0bmFtZTogY3VycmVudFZhbHVlLFxuXHQvLyBcdGNvbG9yOiBjb25maWcuY29sb3JzLm5ldXRyYWwsXG5cdC8vICAgICB9XG5cdC8vIH0pO1xuXHRjb25maWcuY3VycmVudE1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcblxuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdC8vIGNvbmZpZy5jdXJyZW50QnBtID0gZXZlbnQuZGV0YWlsLmJwbTtcblx0Y29uZmlnLmN1cnJlbnRCcG0gPSAxMjg7XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSAoY29uZmlnLmN1cnJlbnRCcG0gKiAxMDAwKSAvICg2MCAqIDE2KTtcblx0Y29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXG5cdC8vIFRlc3Rcblx0Ly8gYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1sxXSk7XG5cdHN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcblx0Y29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG5cdGNvbmZpZy5jdXJyZW50U3RhcnREYXRlID0gRGF0ZS5ub3coKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQgICAgbmV4dEJlYXQodHJ1ZSk7XG5cdH0sIGNvbmZpZy5jdXJyZW50QmVnaW5uaW5nT2Zmc2V0KTtcblx0Y29uZmlnLmN1cnJlbnRBdWRpby5zdGFydCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRCZWF0KGlzRmlyc3QpIHtcblxuXHQvLyBJZiB3ZSdyZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHNvbmdcblx0aWYgKGlzRmlyc3QgPT09IHRydWUpIHtcblx0ICAgIC8vYWRkTW92ZW1lbnRPbkNhbnZhcyhjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICAvL2FuaW1hdGVNb3ZlbWVudChjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICBjb25maWcuY3VycmVudEluZGV4ID0gMDtcblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnZ2xBZGRNb3ZlbWVudCcsIHtkZXRhaWw6IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50SW5kZXhdfSk7XG5cdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0ICAgIHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHQgICAgcmV0dXJuO1xuXHR9XG5cblx0Ly8gSW5zZXJ0IG5ldyBtb3ZlbWVudFxuXHQvL3ZhciBhcHBlYXJpbmdNb3ZlbWVudEluZGV4ID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIGNvbmZpZy5jdXJyZW50U3RhcnREYXRlKSAvIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRjb25zb2xlLmxvZygnYXBlYXJpbmcgbW92ZW1lbnQgaW5kZXg6ICcgKyBhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcblx0dmFyIGFwcGVhcmluZ01vdmVtZW50ID0gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbY29uZmlnLmN1cnJlbnRJbmRleF07XG5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbEFkZE1vdmVtZW50Jywge2RldGFpbDogYXBwZWFyaW5nTW92ZW1lbnR9KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHNldFRpbWVvdXQobmV4dEJlYXQsIGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwpO1xuXHRjb25zb2xlLmxvZyhhcHBlYXJpbmdNb3ZlbWVudEluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuICAgIC8vIFx0Y29uZmlnLm1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBvbkFnQ29tbWFuZEV2ZW50KGV2ZW50KSB7XG5cdHZhciB0aW1lID0gRGF0ZS5ub3coKTtcblx0aWYgKE1hdGguYWJzKHRpbWUgLSBldmVudC5kZXRhaWwudGltZSkgPCBFUFNJTE9OKSB7XG5cdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2dsU3RhdHVzJywge2RldGFpbDogXCJzdWNjZXNzXCJ9KTtcblx0ICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobmV3RXZlbnQpO1xuXHR9IGVsc2Uge1xuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbFN0YXR1cycsIHtkZXRhaWw6IFwiZmFpbFwifSk7XG5cdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG5ld0V2ZW50KTtcblx0fVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIG9uQWdTZXR1cEV2ZW50KTtcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIC8vIFx0Y29uc29sZS5sb2coJ2FnU2V0dXBFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuICAgIC8vIH0pO1xuICAgIERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ29tbWFuZEV2ZW50Jywgb25BZ0NvbW1hbmRFdmVudCk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDbW1hbmRFdmVudCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gXHRjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcbiAgICAvLyB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
