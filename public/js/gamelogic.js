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

			// document.addEventListener('agSetupEvent', onAgSetupEvent);
			document.addEventListener('agSetupEvent', function (event) {
						console.log('agSetupEvent: ' + JSON.stringify(event.detail));
			});
			// document.addEventListener('agCommandEvent', onAgCommandEvent);
			document.addEventListener('agCommandEvent', function (event) {
						console.log('agCommandEvent: ' + JSON.stringify(event.detail));
			});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWVsb2dpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxDQUFDLFlBQVc7OztBQUdSLE9BQUksVUFBVSxJQUFkO0FBQ0EsT0FBSSxTQUFTLEVBQWI7OztBQUdBLFlBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQjs7QUFFbEMsVUFBSSxlQUFlLFlBQVksT0FBTyxRQUFQLENBQWdCLFFBQTVCLEdBQXVDLFNBQXZDLEdBQW1ELE1BQU0sTUFBTixDQUFhLElBQW5GOzs7OztBQUtBLGFBQU8sWUFBUCxHQUFzQixJQUFJLElBQUosQ0FBUztBQUMzQixlQUFNLENBQUMsWUFBRCxDQURxQjtBQUUzQixtQkFBVSxLQUZpQjtBQUczQixpQkFBUTtBQUhtQixPQUFULENBQXRCOzs7Ozs7Ozs7QUFhQSxhQUFPLGdCQUFQLEdBQTBCLE1BQU0sTUFBTixDQUFhLFFBQXZDOzs7O0FBSUEsYUFBTyxVQUFQLEdBQW9CLEdBQXBCO0FBQ0EsYUFBTyxrQkFBUCxHQUE2QixPQUFPLFVBQVAsR0FBb0IsSUFBckIsSUFBOEIsS0FBSyxFQUFuQyxDQUE1QjtBQUNBLGFBQU8sc0JBQVAsR0FBZ0MsTUFBTSxNQUFOLENBQWEsTUFBN0M7Ozs7QUFJQTtBQUVJOztBQUVELFlBQVMsS0FBVCxHQUFpQjtBQUNwQixhQUFPLFlBQVAsR0FBc0IsQ0FBdEI7QUFDQSxhQUFPLGdCQUFQLEdBQTBCLEtBQUssR0FBTCxFQUExQjtBQUNBLGlCQUFXLFlBQVU7QUFDakIsa0JBQVMsSUFBVDtBQUNILE9BRkQsRUFFRyxPQUFPLHNCQUZWO0FBR0EsYUFBTyxZQUFQLENBQW9CLEtBQXBCO0FBQ0k7O0FBRUQsWUFBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCOzs7QUFHOUIsVUFBSSxZQUFZLElBQWhCLEVBQXNCOzs7QUFHbEIsZ0JBQU8sWUFBUCxHQUFzQixDQUF0QjtBQUNBLGFBQUksV0FBVyxJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUMsRUFBQyxRQUFRLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBTyxZQUEvQixDQUFULEVBQWpDLENBQWY7QUFDQSxrQkFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0Esb0JBQVcsUUFBWCxFQUFxQixPQUFPLGtCQUE1QjtBQUNBO0FBQ0g7Ozs7QUFJRCxjQUFRLEdBQVIsQ0FBWSw4QkFBOEIsc0JBQTFDO0FBQ0EsVUFBSSxvQkFBb0IsT0FBTyxnQkFBUCxDQUF3QixPQUFPLFlBQS9CLENBQXhCOztBQUVBLFVBQUksV0FBVyxJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFBaUMsRUFBQyxRQUFRLGlCQUFULEVBQWpDLENBQWY7QUFDQSxlQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxpQkFBVyxRQUFYLEVBQXFCLE9BQU8sa0JBQTVCO0FBQ0EsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDSTs7Ozs7O0FBTUQsWUFBUyxnQkFBVCxDQUEwQixLQUExQixFQUFpQztBQUNwQyxVQUFJLE9BQU8sS0FBSyxHQUFMLEVBQVg7QUFDQSxVQUFJLEtBQUssR0FBTCxDQUFTLE9BQU8sTUFBTSxNQUFOLENBQWEsSUFBN0IsSUFBcUMsT0FBekMsRUFBa0Q7QUFDOUMsYUFBSSxXQUFXLElBQUksV0FBSixDQUFnQixVQUFoQixFQUE0QixFQUFDLFFBQVEsU0FBVCxFQUE1QixDQUFmO0FBQ0Esa0JBQVMsZ0JBQVQsQ0FBMEIsUUFBMUI7QUFDSCxPQUhELE1BR087QUFDSCxhQUFJLFdBQVcsSUFBSSxXQUFKLENBQWdCLFVBQWhCLEVBQTRCLEVBQUMsUUFBUSxNQUFULEVBQTVCLENBQWY7QUFDQSxrQkFBUyxnQkFBVCxDQUEwQixRQUExQjtBQUNIO0FBQ0c7OztBQUdELFlBQVMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsVUFBUyxLQUFULEVBQWdCO0FBQ3pELGNBQVEsR0FBUixDQUFZLG1CQUFtQixLQUFLLFNBQUwsQ0FBZSxNQUFNLE1BQXJCLENBQS9CO0FBQ0EsSUFGRDs7QUFJQSxZQUFTLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxVQUFTLEtBQVQsRUFBZ0I7QUFDM0QsY0FBUSxHQUFSLENBQVkscUJBQXFCLEtBQUssU0FBTCxDQUFlLE1BQU0sTUFBckIsQ0FBakM7QUFDQSxJQUZEO0FBR0gsQ0FqR0QiLCJmaWxlIjoiZ2FtZWxvZ2ljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBnYW1lbG9naWMuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy9cblxuICAgIHZhciBFUFNJTE9OID0gMTAwMDtcbiAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICAvLyBBY3Rpb25zIHBlcmZvcm1lZCB3aGVuIGN1cnJlbnQgZ2FtZSBzZXR0aW5ncyByZWNpZXZlZFxuICAgIGZ1bmN0aW9uIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSB7XG5cblx0bGV0IGF1ZGlvRmlsZVVSTCA9ICdodHRwOi8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArICcvc29uZ3MvJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHQvLyBsZXQgYXVkaW9GaWxlVVJMID0gJy4uL2F1ZGlvLycgKyBldmVudC5kZXRhaWwuc29uZztcblxuXHQvLyBjb25zb2xlLmxvZyhhdWRpb0ZpbGVVUkwpO1xuXG5cdGNvbmZpZy5jdXJyZW50QXVkaW8gPSBuZXcgSG93bCh7XG5cdCAgICB1cmxzOiBbYXVkaW9GaWxlVVJMXSxcblx0ICAgIGF1dG9wbGF5OiBmYWxzZSxcblx0ICAgIHZvbHVtZTogMC44LFxuXHR9KTtcblxuXHQvLyBjb25maWcuY3VycmVudE1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcy5tYXAoKGN1cnJlbnRWYWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG5cdC8vICAgICByZXR1cm4ge1xuXHQvLyBcdGluZGV4OiBpbmRleCxcblx0Ly8gXHRuYW1lOiBjdXJyZW50VmFsdWUsXG5cdC8vIFx0Y29sb3I6IGNvbmZpZy5jb2xvcnMubmV1dHJhbCxcblx0Ly8gICAgIH1cblx0Ly8gfSk7XG5cdGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzO1xuXG5cdC8vIEJQTSwgbWluSW50ZXJ2YWwsIGJlZ2lubmluZyBvZmZzZXRcblx0Ly8gY29uZmlnLmN1cnJlbnRCcG0gPSBldmVudC5kZXRhaWwuYnBtO1xuXHRjb25maWcuY3VycmVudEJwbSA9IDEyODtcblx0Y29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCA9IChjb25maWcuY3VycmVudEJwbSAqIDEwMDApIC8gKDYwICogMTYpO1xuXHRjb25maWcuY3VycmVudEJlZ2lubmluZ09mZnNldCA9IGV2ZW50LmRldGFpbC5vZmZzZXQ7XG5cblx0Ly8gVGVzdFxuXHQvLyBhZGRNb3ZlbWVudE9uQ2FudmFzKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzFdKTtcblx0c3RhcnQoKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRjb25maWcuY3VycmVudFNjb3JlID0gMDtcblx0Y29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSBEYXRlLm5vdygpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdCAgICBuZXh0QmVhdCh0cnVlKTtcblx0fSwgY29uZmlnLmN1cnJlbnRCZWdpbm5pbmdPZmZzZXQpO1xuXHRjb25maWcuY3VycmVudEF1ZGlvLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV4dEJlYXQoaXNGaXJzdCkge1xuXG5cdC8vIElmIHdlJ3JlIGluIHRoZSBiZWdpbm5pbmcgb2Ygc29uZ1xuXHRpZiAoaXNGaXJzdCA9PT0gdHJ1ZSkge1xuXHQgICAgLy9hZGRNb3ZlbWVudE9uQ2FudmFzKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcblx0ICAgIC8vYW5pbWF0ZU1vdmVtZW50KGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcblx0ICAgIGNvbmZpZy5jdXJyZW50SW5kZXggPSAwO1xuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnbEFkZE1vdmVtZW50Jywge2RldGFpbDogY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbY29uZmlnLmN1cnJlbnRJbmRleF19KTtcblx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQgICAgc2V0VGltZW91dChuZXh0QmVhdCwgY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdCAgICByZXR1cm47XG5cdH1cblxuXHQvLyBJbnNlcnQgbmV3IG1vdmVtZW50XG5cdC8vdmFyIGFwcGVhcmluZ01vdmVtZW50SW5kZXggPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gY29uZmlnLmN1cnJlbnRTdGFydERhdGUpIC8gY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdGNvbnNvbGUubG9nKCdhcGVhcmluZyBtb3ZlbWVudCBpbmRleDogJyArIGFwcGVhcmluZ01vdmVtZW50SW5kZXgpO1xuXHR2YXIgYXBwZWFyaW5nTW92ZW1lbnQgPSBjb25maWcuY3VycmVudE1vdmVtZW50c1tjb25maWcuY3VycmVudEluZGV4XTtcblxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2dsQWRkTW92ZW1lbnQnLCB7ZGV0YWlsOiBhcHBlYXJpbmdNb3ZlbWVudH0pO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0c2V0VGltZW91dChuZXh0QmVhdCwgY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdGNvbnNvbGUubG9nKGFwcGVhcmluZ01vdmVtZW50SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSB7XG4gICAgLy8gXHRjb25maWcubW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzO1xuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIG9uQWdDb21tYW5kRXZlbnQoZXZlbnQpIHtcblx0dmFyIHRpbWUgPSBEYXRlLm5vdygpO1xuXHRpZiAoTWF0aC5hYnModGltZSAtIGV2ZW50LmRldGFpbC50aW1lKSA8IEVQU0lMT04pIHtcblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnZ2xTdGF0dXMnLCB7ZGV0YWlsOiBcInN1Y2Nlc3NcIn0pO1xuXHQgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihuZXdFdmVudCk7XG5cdH0gZWxzZSB7XG5cdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2dsU3RhdHVzJywge2RldGFpbDogXCJmYWlsXCJ9KTtcblx0ICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobmV3RXZlbnQpO1xuXHR9XG4gICAgfVxuXG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdTZXR1cEV2ZW50Jywgb25BZ1NldHVwRXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgXHRjb25zb2xlLmxvZygnYWdTZXR1cEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG4gICAgfSk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDb21tYW5kRXZlbnQnLCBvbkFnQ29tbWFuZEV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ0NvbW1hbmRFdmVudCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgXHRjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcbiAgICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
