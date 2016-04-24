/**
 * Test connections.
 */

(function() {

var song = new Howl({
	urls: ['../songs/12 Home.mp3'],
	autoplay: false,
	volume: 0.8
});

setTimeout(function(){
	var newEvent = new CustomEvent('glSetupEvent', {detail: {
		song: '12 Home.mp3',
		bpm: 130,
		commands: [],
		music: song
		}});
  document.dispatchEvent(newEvent);
}, 1000);

setTimeout(function(){
	var newEvent = new CustomEvent('glAddMovement', {detail: "up"});
  document.dispatchEvent(newEvent);
}, 1200);

setTimeout(function(){
	var newEvent = new CustomEvent('glAddMovement', {detail: "up"});
  document.dispatchEvent(newEvent);
}, 2400);

setTimeout(function(){
	var newEvent = new CustomEvent('glAddMovement', {detail: "up"});
  document.dispatchEvent(newEvent);
}, 3600);

setTimeout(function(){
	var newEvent = new CustomEvent('glStatus', {detail: {
		status: "fail",
		index: 0,
		newScore: 0
	}});
  document.dispatchEvent(newEvent);
}, 3400);

setTimeout(function(){
	var newEvent = new CustomEvent('glStatus', {detail: {
		status: "success",
		index: 1,
		newScore: 20
	}});
  document.dispatchEvent(newEvent);
}, 4600);

setTimeout(function(){
	var newEvent = new CustomEvent('glStatus', {detail: {
		status: "fail",
		index: 2,
		newScore: 15
	}});
  document.dispatchEvent(newEvent);
}, 5800);
  
})();
