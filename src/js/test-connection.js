/**
 * Test connections.
 */

(function() {
  setTimeout(function(){
  	var newEvent = new CustomEvent(
	'agSetupEvent',
	{detail: {song: '12 Home.mp3', commands: ['up', 'down', 'pass', 'up', 'down', 'pass']}}
    );
    document.dispatchEvent(newEvent);	
  }, 1000);
  
})();