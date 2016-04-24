/**
 * gamelogic.js
 */

(function() {
    //

    var EPSILON = 1000;
    var config = {};

    // Actions performed when current game settings recieved
    function onAgSetupEvent(event) {
	console.log('agSetupEvent: ' + JSON.stringify(event.detail));
	//
    	config.movements = event.detail.commands;
	//
	let audioFileURL = 'http://' + window.location.hostname + '/songs/' + event.detail.song;
	// let audioFileURL = '../audio/' + event.detail.song;
	console.log('audio file url: ' + audioFileURL);
	config.audio = new Howl({
	    urls: [audioFileURL],
	    autoplay: false,
	    volume: 0.8,
	});
	// Generate new event for the view.
	var newEvent = new CustomEvent(
	    'glSetupEvent',
	    {detail: {song: event.detail.song, bpm: event.detail.bpm, commands: event.detail.commands, music: config.audio}}
	);
	document.dispatchEvent(newEvent);
	// BPM, minInterval, beginning offset
	config.bpm = event.detail.bpm;
	config.minInterval = 60000 / config.bpm;
	config.beginningOffset = event.detail.offset;
	// Start.
	config.score = 0;
	config.startDate = Date.now();
	config.displayedIndex = 0;
	config.lastReceivedIndex = 0;
	function sendMovement() {
	    var newEvent = new CustomEvent(
		'glAddMovement',
		{detail: config.movements[config.displayedIndex]}
	    );
	    console.log(newEvent);
	    document.dispatchEvent(newEvent);
	    setTimeout(sendMovement, config.minInterval);
	}
	setTimeout(sendMovement, config.beginningOffset);
	config.audio.start();
    }

    function onAgCommandEvent(event) {
    	console.log('agCommandEvent: ' + JSON.stringify(event.detail));
	// Count the time for the current movement.
	var time = config.startDate + config.beginningOffset + config.minInterval * config.lastReceivedIndex;
	// Count new score.
	if (Math.abs(time - event.detail.time) < EPSILON) {
	    config.score += 100;
	    var newEvent = new CustomEvent(
		'glStatus',
		{detail: {
		    status: "success",
		    index: config.lastReceivedIndex,
		    newScore: config.score
		}}
	    );
	    document.dispatchEvent(newEvent);
	} else {
	    config.score -= 10;
	    var newEvent = new CustomEvent(
		'glStatus',
		{detail: {
		    status: "fail",
		    index: config.lastReceivedIndex,
		    newScore: config.score
		}}
	    );
	    document.dispatchEvent(newEvent);
	}
	config.lastReceivedIndex++;
    }

    document.addEventListener('agSetupEvent', onAgSetupEvent);
    document.addEventListener('agCommandEvent', onAgCommandEvent);
})();
