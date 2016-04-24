'use strict';

/**
 * gamelogic.js
 */

(function () {
			//

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

						config.currentMovements = event.detail.commands.map(function (currentValue, index, array) {
									return {
												index: index,
												name: currentValue,
												color: config.colors.neutral
									};
						});

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

			function onAgCommandEvent(event) {}

			// document.addEventListener('agSetupEvent', onAgSetupEvent);
			document.addEventListener('agSetupEvent', function (event) {
						console.log('agSetupEvent: ' + JSON.stringify(event.detail));
			});
			document.addEventListener('agCmmandEvent', function (event) {
						console.log('agCommandEvent' + JSON.stringify(event.detail));
			});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWVsb2dpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxDQUFDLFlBQVc7Ozs7QUFJUixZQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0I7O0FBRWxDLFVBQUksZUFBZSxZQUFZLE9BQU8sUUFBUCxDQUFnQixRQUE1QixHQUF1QyxTQUF2QyxHQUFtRCxNQUFNLE1BQU4sQ0FBYSxJQUFuRjs7Ozs7QUFLQSxhQUFPLFlBQVAsR0FBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0IsZUFBTSxDQUFDLFlBQUQsQ0FEcUI7QUFFM0IsbUJBQVUsS0FGaUI7QUFHM0IsaUJBQVE7QUFIbUIsT0FBVCxDQUF0Qjs7QUFNQSxhQUFPLGdCQUFQLEdBQTBCLE1BQU0sTUFBTixDQUFhLFFBQWIsQ0FBc0IsR0FBdEIsQ0FBMEIsVUFBQyxZQUFELEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUFnQztBQUNoRixnQkFBTztBQUNWLG1CQUFPLEtBREc7QUFFVixrQkFBTSxZQUZJO0FBR1YsbUJBQU8sT0FBTyxNQUFQLENBQWM7QUFIWCxVQUFQO0FBS0gsT0FOeUIsQ0FBMUI7Ozs7QUFVQSxhQUFPLFVBQVAsR0FBb0IsR0FBcEI7QUFDQSxhQUFPLGtCQUFQLEdBQTZCLE9BQU8sVUFBUCxHQUFvQixJQUFyQixJQUE4QixLQUFLLEVBQW5DLENBQTVCO0FBQ0EsYUFBTyxzQkFBUCxHQUFnQyxNQUFNLE1BQU4sQ0FBYSxNQUE3Qzs7OztBQUlBO0FBRUk7O0FBRUQsWUFBUyxLQUFULEdBQWlCO0FBQ3BCLGFBQU8sWUFBUCxHQUFzQixDQUF0QjtBQUNBLGFBQU8sZ0JBQVAsR0FBMEIsS0FBSyxHQUFMLEVBQTFCO0FBQ0EsaUJBQVcsWUFBVTtBQUNqQixrQkFBUyxJQUFUO0FBQ0gsT0FGRCxFQUVHLE9BQU8sc0JBRlY7QUFHQSxhQUFPLFlBQVAsQ0FBb0IsS0FBcEI7QUFDSTs7QUFFRCxZQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkI7OztBQUc5QixVQUFJLFlBQVksSUFBaEIsRUFBc0I7QUFDbEIsNkJBQW9CLE9BQU8sZ0JBQVAsQ0FBd0IsQ0FBeEIsQ0FBcEI7QUFDQSx5QkFBZ0IsT0FBTyxnQkFBUCxDQUF3QixDQUF4QixDQUFoQjtBQUNBLG9CQUFXLFFBQVgsRUFBcUIsT0FBTyxrQkFBNUI7QUFDQTtBQUNIOzs7QUFHRCxVQUFJLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxDQUFDLEtBQUssR0FBTCxLQUFhLE9BQU8sZ0JBQXJCLElBQXlDLE9BQU8sa0JBQTNELENBQTdCO0FBQ0EsY0FBUSxHQUFSLENBQVksc0JBQVo7QUFDQSxVQUFJLG9CQUFvQixPQUFPLGdCQUFQLENBQXdCLHNCQUF4QixDQUF4Qjs7QUFFQSwwQkFBb0IsaUJBQXBCO0FBQ0Esc0JBQWdCLGlCQUFoQjtBQUNBLGlCQUFXLFFBQVgsRUFBcUIsT0FBTyxrQkFBNUI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxzQkFBWjtBQUVJOztBQUVELFlBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBaUMsQ0FBRTs7O0FBR25DLFlBQVMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsVUFBUyxLQUFULEVBQWdCO0FBQzdELGNBQVEsR0FBUixDQUFZLG1CQUFtQixLQUFLLFNBQUwsQ0FBZSxNQUFNLE1BQXJCLENBQS9CO0FBQ0ksSUFGRDtBQUdBLFlBQVMsZ0JBQVQsQ0FBMEIsZUFBMUIsRUFBMkMsVUFBUyxLQUFULEVBQWdCO0FBQzlELGNBQVEsR0FBUixDQUFZLG1CQUFtQixLQUFLLFNBQUwsQ0FBZSxNQUFNLE1BQXJCLENBQS9CO0FBQ0ksSUFGRDtBQUdILENBN0VEIiwiZmlsZSI6ImdhbWVsb2dpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICAvLyBBY3Rpb25zIHBlcmZvcm1lZCB3aGVuIGN1cnJlbnQgZ2FtZSBzZXR0aW5ncyByZWNpZXZlZFxuICAgIGZ1bmN0aW9uIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSB7XG5cblx0bGV0IGF1ZGlvRmlsZVVSTCA9ICdodHRwOi8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArICcvc29uZ3MvJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHQvLyBsZXQgYXVkaW9GaWxlVVJMID0gJy4uL2F1ZGlvLycgKyBldmVudC5kZXRhaWwuc29uZztcblxuXHQvLyBjb25zb2xlLmxvZyhhdWRpb0ZpbGVVUkwpO1xuXG5cdGNvbmZpZy5jdXJyZW50QXVkaW8gPSBuZXcgSG93bCh7XG5cdCAgICB1cmxzOiBbYXVkaW9GaWxlVVJMXSxcblx0ICAgIGF1dG9wbGF5OiBmYWxzZSxcblx0ICAgIHZvbHVtZTogMC44LFxuXHR9KTtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcy5tYXAoKGN1cnJlbnRWYWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG5cdCAgICByZXR1cm4ge1xuXHRcdGluZGV4OiBpbmRleCxcblx0XHRuYW1lOiBjdXJyZW50VmFsdWUsXG5cdFx0Y29sb3I6IGNvbmZpZy5jb2xvcnMubmV1dHJhbCxcblx0ICAgIH1cblx0fSk7XG5cblx0Ly8gQlBNLCBtaW5JbnRlcnZhbCwgYmVnaW5uaW5nIG9mZnNldFxuXHQvLyBjb25maWcuY3VycmVudEJwbSA9IGV2ZW50LmRldGFpbC5icG07XG5cdGNvbmZpZy5jdXJyZW50QnBtID0gMTI4O1xuXHRjb25maWcuY3VycmVudE1pbkludGVydmFsID0gKGNvbmZpZy5jdXJyZW50QnBtICogMTAwMCkgLyAoNjAgKiAxNik7XG5cdGNvbmZpZy5jdXJyZW50QmVnaW5uaW5nT2Zmc2V0ID0gZXZlbnQuZGV0YWlsLm9mZnNldDtcblxuXHQvLyBUZXN0XG5cdC8vIGFkZE1vdmVtZW50T25DYW52YXMoY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbMV0pO1xuXHRzdGFydCgpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XG5cdGNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuXHRjb25maWcuY3VycmVudFN0YXJ0RGF0ZSA9IERhdGUubm93KCk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0ICAgIG5leHRCZWF0KHRydWUpO1xuXHR9LCBjb25maWcuY3VycmVudEJlZ2lubmluZ09mZnNldCk7XG5cdGNvbmZpZy5jdXJyZW50QXVkaW8uc3RhcnQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXh0QmVhdChpc0ZpcnN0KSB7XG5cblx0Ly8gSWYgd2UncmUgaW4gdGhlIGJlZ2lubmluZyBvZiBzb25nXG5cdGlmIChpc0ZpcnN0ID09PSB0cnVlKSB7XG5cdCAgICBhZGRNb3ZlbWVudE9uQ2FudmFzKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzWzBdKTtcblx0ICAgIGFuaW1hdGVNb3ZlbWVudChjb25maWcuY3VycmVudE1vdmVtZW50c1swXSk7XG5cdCAgICBzZXRUaW1lb3V0KG5leHRCZWF0LCBjb25maWcuY3VycmVudE1pbkludGVydmFsKTtcblx0ICAgIHJldHVybjtcblx0fVxuXG5cdC8vIEluc2VydCBuZXcgbW92ZW1lbnRcblx0dmFyIGFwcGVhcmluZ01vdmVtZW50SW5kZXggPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gY29uZmlnLmN1cnJlbnRTdGFydERhdGUpIC8gY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdGNvbnNvbGUubG9nKGFwcGVhcmluZ01vdmVtZW50SW5kZXgpO1xuXHR2YXIgYXBwZWFyaW5nTW92ZW1lbnQgPSBjb25maWcuY3VycmVudE1vdmVtZW50c1thcHBlYXJpbmdNb3ZlbWVudEluZGV4XTtcblxuXHRhZGRNb3ZlbWVudE9uQ2FudmFzKGFwcGVhcmluZ01vdmVtZW50KTtcblx0YW5pbWF0ZU1vdmVtZW50KGFwcGVhcmluZ01vdmVtZW50KTtcblx0c2V0VGltZW91dChuZXh0QmVhdCwgY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCk7XG5cdGNvbnNvbGUubG9nKGFwcGVhcmluZ01vdmVtZW50SW5kZXgpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BZ0NvbW1hbmRFdmVudChldmVudCkge31cbiAgICBcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBvbkFnU2V0dXBFdmVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdTZXR1cEV2ZW50JywgZnVuY3Rpb24oZXZlbnQpIHtcblx0Y29uc29sZS5sb2coJ2FnU2V0dXBFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ21tYW5kRXZlbnQnLCBmdW5jdGlvbihldmVudCkge1xuXHRjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG4gICAgfSk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
