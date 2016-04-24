/**
 * gamelogic.js
 */

(function() {
    //

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

    function onAgCommandEvent(event) {}
    
    // document.addEventListener('agSetupEvent', onAgSetupEvent);
    document.addEventListener('agSetupEvent', function(event) {
	console.log('agSetupEvent: ' + JSON.stringify(event.detail));
    });
    document.addEventListener('agCmmandEvent', function(event) {
	console.log('agCommandEvent' + JSON.stringify(event.detail));
    });
})();
