/**
 * connection.js
 *
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function() {
    // Emits fake events.

    var newEvent = new CustomEvent(
	'agSetupEvent',
	{detail: {song: '12 Home.mp3', bpm: 100, commands: ['up', 'down', 'pass', 'up', 'down', 'pass']}}
    );
    document.dispatchEvent(newEvent);
    function sendMovement() {
	var newEvent = new CustomEvent(
	    'agCommandEvent',
	    {detail: {time: Date.now(), movement: 'up'}}
	);
	document.dispatchEvent(newEvent);
	setTimeout(sendMovement, 1000);
    }
    sendMovement();
})();
