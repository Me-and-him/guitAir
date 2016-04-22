/**
 * connection.js
 *
 * Grabs mobile-app's IP address and manages connection to the phone.
 *
 * In this document following terms should be treated as equal: mobile server,
 * mobile controller, phone, mobile app - and all of these mean the server running
 * on the mobile phone that is a controller for this page.
 *
 * The server in this document is a server that serves as a mediator between this
 * page and the app serving as controller for it.
 */

(function() {
    // Ask server if this page was requested by code.
    var xhr = new XMLHttpRequest();
    while (true) {
	// TODO! Edit the following reques according to protocol of the server.
	xhr.open('GET', 'app/req', false);
	xhr.send();
	if (xhr.status == 200) {
	    // This page was requested by some mobile app.
	    break;
	} else if (xhr.status == 204) {
	    continue;
	} else { /* something went wrong, amarait? */ }
    }
    // The followng response is a json object that may be representet in the
    // following form:
    //     response = {'ip': <some_ip>};
    // where <some_ip> is a string that contains ip address.
    response = xhr.responseText;
    // Set the connection to the mobile app.
    var host = "ws://" + response.ip + "/";
    var ws = new WebSocket(host);

    function onWSocketOpen() {}

    function onWSocketClose(e) {
	if (!e.wasClean) {
	    // Retry to connect.
	    ws = new WebSocket(host);
	    ws.onopen = onWSocketOpen;
	    ws.onclose = onWSocketClose;
	    ws.onmessage = onWSocketGotMessage;
	    return;
	}
	// We handle legitimate closing in ``onmessage`` so we do nothing.
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
	var newEvent = new CustomEvent('wsevent', {detail: {movement: e.movement, time: e.time}});
    }

    ws.onopen = onWSocketOpen;
    ws.onclose = onWSocketClose;
    ws.onmessage = onWSocketGotMessage;
})();
