/**
 * connection.js
 *
 * Sets connection to the server.
 *
 * Emits 'agSetupEvent' and 'agCommandEvent' events that should be handled in
 * the view.
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function() {
    // Set the connection to the mobile app.
    var host = "ws://" + window.location.hostname + "/";
    //var ws = new WebSocket(host);
    var songWasStarted = false;
    // var ws = io();

    function onOpen() {
	// After we connect, the server sends us data which will be handled in
	// ``onmessage`` so we do nothing here.
    }

    // function onClose(event) {
    // 	if (!e.wasClean) {
    // 	    // Retry if connection failed.
    // 	    ws = new WebSocket(host);
    // 	    ws.onopen = onOpen;
    // 	    ws.onclose = onClose;
    // 	    if (!songWasStarted) {
    // 		ws.onmessage = onGotMessageOnStart;
    // 	    } else {
    // 		ws.onmessage = onGotMessageOnConnectionEstablished;
    // 	    }
    // 	}
    // 	songWasStarted = false;
    // }

    function onGotMessageOnStart(event) {
	// Receive song name and command sequence.
	// TODO! Generate a movement string list from the supplied code.
	var newEvent = new CustomEvent(
	    'agSetupEvent',
	    {detail: {song: event.song, bpm: event.bpm, commands: event.commands}}
	);
	document.dispatchEvent(newEvent);
	//ws.onmessage = onGotMessageOnConnectionEstablished;
	ws.on('message', onGotMessageOnConnectionEstablished);
	songWasStarted = true;
    }

    function onGotMessageOnConnectionEstablished(event) {
	// Receive user command.
	// TODO! Generate a movement string from the supplied code.
	var newEvent = new CustomEvent(
	    'agComandEvent',
	    {detail: {movement: event.movement, time: event.time}}
	);
	document.dispatchEvent(newEvent);
    }

    // io.on('message', onGotMessageOnStart);
    // ws.onopen = onOpen;
    // ws.onclose = onClose;
    // ws.onmessage = onGotMessageOnStart;
})();
