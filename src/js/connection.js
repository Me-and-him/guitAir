/**
 * connection.js
 *
 * Grabs the IP address of an mobile-app and manages connection to the phone.
 *
 * Emits 'wsevent' events that should be handled in the view.
 *
 * In this document following terms should be treated as equal: mobile server,
 * mobile controller, phone, mobile app - and all of these mean the server running
 * on the mobile phone that is a controller for this page.
 *
 * The server in this document is a server that serves as a mediator between this
 * page and the app serving as controller for it.
 */

(function() {
    (new Promise(function(resolve, reject) {
	// Ask server if this page was requested by code.
	var xhr = new XMLHttpRequest();
	// TODO! Edit the following reques according to protocol of the server.
	while (true) {
	    xhr.open('GET', 'app/req', false);
	    xhr.send();
	    if (xhr.status == 200) {
		// This page was requested by some mobile app.
		break;
	    } else if (xhr.status == 204) {
		// Go into an infinite loop untill connection is successful.
		continue;
	    } else { /* something went wrong, amarait? */ }
	    // TODO! Sleep few seconds...
	}
	// The followng ``responseText`` is a json object that may be
	// representet in the following form:
	//     responseText = {'ip': <some_ip>};
	// where <some_ip> is a string that contains ip address.
	resolve(xhr.responseText);
    })).then(function(response) {
	// Set the connection to the mobile app.
	var host = "ws://" + response.ip + "/";
	var ws = new WebSocket(host);

	function onWSocketOpen() {
	    // After we connect the mobile server sends us data which will be
	    // handled in ``onmessage`` so we do nothing here.
	}

	function onWSocketClose(e) {
	    if (!e.wasClean) {
		// Retry to connect.
		ws = new WebSocket(host);
		ws.onopen = onWSocketOpen;
		ws.onclose = onWSocketClose;
		ws.onmessage = onWSocketGotMessage;
		return;
	    }
	    // We handle legitimate closing in ``onmessage`` so we do nothing
	    // here.
	}

	/**
	 * Handle message from our mobile controller and emit an event notifying
	 * the view.
	 *
	 * Args:
	 *     e: An event from mobile app; contains ``time`` and ``movement``.
	 */
	function onWSocketGotMessage(e) {
	    // Generate a new event that will be sent to event handler in the
	    // view.
	    var newEvent = new CustomEvent(
		'wsevent',
		{detail: {movement: e.movement, time: e.time}}
	    );
	}

	ws.onopen = onWSocketOpen;
	ws.onclose = onWSocketClose;
	ws.onmessage = onWSocketGotMessage;
    });
})();
