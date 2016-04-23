/**
 * Test connections.
 */

(function() {
    var newEvent = new CustomEvent(
	'agSetupEvent',
	{detail: {song: '12 Home.mp3', commands: [1, 2, 0, 1, 2, 0]}}
    );
    document.dispatchEvent(newEvent);
})();
