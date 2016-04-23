'use strict';

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
 * The server in this document is a server that serves as a mediator between
 * this page and the app serving as controller for it.
 */

(function () {
	/**
  * Ask server if this page was requested by code.
  *
  * Args:
  *     xhr (XMLHttpRequest)
  */
	function requestControllerInfo(xhr) {
		// TODO! Edit the following request according to the protocol of the
		//     server.
		xhr.open('GET', 'app/req', true);
		xhr.send();
	}

	/**
  * Set the connection to the mobile app.
  */
	function connectToClient(response) {
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
			var newEvent = new CustomEvent('wsevent', { detail: { movement: e.movement, time: e.time } });
		}

		ws.onopen = onWSocketOpen;
		ws.onclose = onWSocketClose;
		ws.onmessage = onWSocketGotMessage;
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4) return;
		if (xhr.status == 200) {
			// The followng ``responseText`` is a json object that may be
			// represented in the following form:
			//     responseText = {'ip': <some_ip>};
			// where <some_ip> is a string that contains ip address.
			connectToClient(xhr.responseText);
		} else if (xhr.status == 204) {
			// Server said that there was no phone that had requested this page.
			requestControllerInfo(xhr);
		} else {/* something went wrong, amarait? */}
	};
})();
// Рисуем

(function () {

	function refreshComputedSizes(object) {

		canvOpts.computedStyle = {

			width: +object.width.slice(0, -2),
			height: +object.height.slice(0, -2)

		};

		canvas.setDimensions({
			width: canvOpts.computedStyle.width,
			height: canvOpts.computedStyle.height
		});
	}

	window.onresize = function () {
		refreshComputedSizes(canvasComputedStyleObj);
		canvas.renderAll.bind(canvas);
	};

	// Init

	var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);

	var canvOpts = {
		bgURL: '../img/bg-crowd-1.jpg',
		computedStyle: {
			width: +canvasComputedStyleObj.width.slice(0, -2),
			height: +canvasComputedStyleObj.height.slice(0, -2)
		}
	};

	var canvas = new fabric.StaticCanvas('game', {
		width: canvOpts.computedStyle.width,
		height: canvOpts.computedStyle.height
	});
})();

// *** List of UI elements ***
//
// Settings		+
// Score
// Logo				+
// Volume
// Pause

// Socials
//# sourceMappingURL=data:application/json;base64,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QUF3QixNQUF4QixFQUFnQztBQUM1QyxTQUFPLFNBQVMsYUFBVCxDQUF1QixLQURjO0FBRTVDLFVBQVEsU0FBUyxhQUFULENBQXVCO0FBRmEsRUFBaEMsQ0FBYjtBQU1DLENBL0NEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGNvbm5lY3Rpb24uanNcbiAqXG4gKiBHcmFicyB0aGUgSVAgYWRkcmVzcyBvZiBhbiBtb2JpbGUtYXBwIGFuZCBtYW5hZ2VzIGNvbm5lY3Rpb24gdG8gdGhlIHBob25lLlxuICpcbiAqIEVtaXRzICd3c2V2ZW50JyBldmVudHMgdGhhdCBzaG91bGQgYmUgaGFuZGxlZCBpbiB0aGUgdmlldy5cbiAqXG4gKiBJbiB0aGlzIGRvY3VtZW50IGZvbGxvd2luZyB0ZXJtcyBzaG91bGQgYmUgdHJlYXRlZCBhcyBlcXVhbDogbW9iaWxlIHNlcnZlcixcbiAqIG1vYmlsZSBjb250cm9sbGVyLCBwaG9uZSwgbW9iaWxlIGFwcCAtIGFuZCBhbGwgb2YgdGhlc2UgbWVhbiB0aGUgc2VydmVyIHJ1bm5pbmdcbiAqIG9uIHRoZSBtb2JpbGUgcGhvbmUgdGhhdCBpcyBhIGNvbnRyb2xsZXIgZm9yIHRoaXMgcGFnZS5cbiAqXG4gKiBUaGUgc2VydmVyIGluIHRoaXMgZG9jdW1lbnQgaXMgYSBzZXJ2ZXIgdGhhdCBzZXJ2ZXMgYXMgYSBtZWRpYXRvciBiZXR3ZWVuXG4gKiB0aGlzIHBhZ2UgYW5kIHRoZSBhcHAgc2VydmluZyBhcyBjb250cm9sbGVyIGZvciBpdC5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgICogQXNrIHNlcnZlciBpZiB0aGlzIHBhZ2Ugd2FzIHJlcXVlc3RlZCBieSBjb2RlLlxuICAgICAqXG4gICAgICogQXJnczpcbiAgICAgKiAgICAgeGhyIChYTUxIdHRwUmVxdWVzdClcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXF1ZXN0Q29udHJvbGxlckluZm8oeGhyKSB7XG5cdC8vIFRPRE8hIEVkaXQgdGhlIGZvbGxvd2luZyByZXF1ZXN0IGFjY29yZGluZyB0byB0aGUgcHJvdG9jb2wgb2YgdGhlXG5cdC8vICAgICBzZXJ2ZXIuXG5cdHhoci5vcGVuKCdHRVQnLCAnYXBwL3JlcScsIHRydWUpO1xuXHR4aHIuc2VuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29ubmVjdGlvbiB0byB0aGUgbW9iaWxlIGFwcC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb25uZWN0VG9DbGllbnQocmVzcG9uc2UpIHtcblx0Ly8gU2V0IHRoZSBjb25uZWN0aW9uIHRvIHRoZSBtb2JpbGUgYXBwLlxuXHR2YXIgaG9zdCA9IFwid3M6Ly9cIiArIHJlc3BvbnNlLmlwICsgXCIvXCI7XG5cdHZhciB3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG5cblx0ZnVuY3Rpb24gb25XU29ja2V0T3BlbigpIHtcblx0ICAgIC8vIEFmdGVyIHdlIGNvbm5lY3QgdGhlIG1vYmlsZSBzZXJ2ZXIgc2VuZHMgdXMgZGF0YSB3aGljaCB3aWxsIGJlXG5cdCAgICAvLyBoYW5kbGVkIGluIGBgb25tZXNzYWdlYGAgc28gd2UgZG8gbm90aGluZyBoZXJlLlxuXHR9XG5cblx0ZnVuY3Rpb24gb25XU29ja2V0Q2xvc2UoZSkge1xuXHQgICAgaWYgKCFlLndhc0NsZWFuKSB7XG5cdFx0Ly8gUmV0cnkgdG8gY29ubmVjdC5cblx0XHR3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG5cdFx0d3Mub25vcGVuID0gb25XU29ja2V0T3Blbjtcblx0XHR3cy5vbmNsb3NlID0gb25XU29ja2V0Q2xvc2U7XG5cdFx0d3Mub25tZXNzYWdlID0gb25XU29ja2V0R290TWVzc2FnZTtcblx0XHRyZXR1cm47XG5cdCAgICB9XG5cdCAgICAvLyBXZSBoYW5kbGUgbGVnaXRpbWF0ZSBjbG9zaW5nIGluIGBgb25tZXNzYWdlYGAgc28gd2UgZG8gbm90aGluZ1xuXHQgICAgLy8gaGVyZS5cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgbWVzc2FnZSBmcm9tIG91ciBtb2JpbGUgY29udHJvbGxlciBhbmQgZW1pdCBhbiBldmVudCBub3RpZnlpbmdcblx0ICogdGhlIHZpZXcuXG5cdCAqXG5cdCAqIEFyZ3M6XG5cdCAqICAgICBlOiBBbiBldmVudCBmcm9tIG1vYmlsZSBhcHA7IGNvbnRhaW5zIGBgdGltZWBgIGFuZCBgYG1vdmVtZW50YGAuXG5cdCAqL1xuXHRmdW5jdGlvbiBvbldTb2NrZXRHb3RNZXNzYWdlKGUpIHtcblx0ICAgIC8vIEdlbmVyYXRlIGEgbmV3IGV2ZW50IHRoYXQgd2lsbCBiZSBzZW50IHRvIGV2ZW50IGhhbmRsZXIgaW4gdGhlXG5cdCAgICAvLyB2aWV3LlxuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdCd3c2V2ZW50Jyxcblx0XHR7ZGV0YWlsOiB7bW92ZW1lbnQ6IGUubW92ZW1lbnQsIHRpbWU6IGUudGltZX19XG5cdCAgICApO1xuXHR9XG5cblx0d3Mub25vcGVuID0gb25XU29ja2V0T3Blbjtcblx0d3Mub25jbG9zZSA9IG9uV1NvY2tldENsb3NlO1xuXHR3cy5vbm1lc3NhZ2UgPSBvbldTb2NrZXRHb3RNZXNzYWdlO1xuICAgIH1cblxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdGlmICh4aHIucmVhZHlTdGF0ZSAhPSA0KSByZXR1cm47XG5cdGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuXHQgICAgLy8gVGhlIGZvbGxvd25nIGBgcmVzcG9uc2VUZXh0YGAgaXMgYSBqc29uIG9iamVjdCB0aGF0IG1heSBiZVxuXHQgICAgLy8gcmVwcmVzZW50ZWQgaW4gdGhlIGZvbGxvd2luZyBmb3JtOlxuXHQgICAgLy8gICAgIHJlc3BvbnNlVGV4dCA9IHsnaXAnOiA8c29tZV9pcD59O1xuXHQgICAgLy8gd2hlcmUgPHNvbWVfaXA+IGlzIGEgc3RyaW5nIHRoYXQgY29udGFpbnMgaXAgYWRkcmVzcy5cblx0ICAgIGNvbm5lY3RUb0NsaWVudCh4aHIucmVzcG9uc2VUZXh0KTtcblx0fSBlbHNlIGlmICh4aHIuc3RhdHVzID09IDIwNCkge1xuXHQgICAgLy8gU2VydmVyIHNhaWQgdGhhdCB0aGVyZSB3YXMgbm8gcGhvbmUgdGhhdCBoYWQgcmVxdWVzdGVkIHRoaXMgcGFnZS5cblx0ICAgIHJlcXVlc3RDb250cm9sbGVySW5mbyh4aHIpO1xuXHR9IGVsc2UgeyAvKiBzb21ldGhpbmcgd2VudCB3cm9uZywgYW1hcmFpdD8gKi8gfVxuICAgIH1cbn0pKCk7XG4vLyDQoNC40YHRg9C10LxcblxuKGZ1bmN0aW9uKCl7XG5cblxuZnVuY3Rpb24gcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSB7XG5cdFxuXHRjYW52T3B0cy5jb21wdXRlZFN0eWxlID0ge1xuXG5cdFx0d2lkdGg6ICtvYmplY3Qud2lkdGguc2xpY2UoMCwtMiksXG5cdFx0aGVpZ2h0OiArb2JqZWN0LmhlaWdodC5zbGljZSgwLC0yKVxuXHRcblx0fTtcblxuXHRjYW52YXMuc2V0RGltZW5zaW9ucyh7XG5cdFx0d2lkdGg6IGNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgsXG5cdFx0aGVpZ2h0OiBjYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodFxuXHR9KTtcblxufVxuXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpe1xuXHRyZWZyZXNoQ29tcHV0ZWRTaXplcyhjYW52YXNDb21wdXRlZFN0eWxlT2JqKTtcblx0Y2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyk7XG59XG5cblxuXG5cblxuXG4vLyBJbml0XG5cbnZhciBjYW52YXNDb21wdXRlZFN0eWxlT2JqID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3InKVswXSk7XG5cbnZhciBjYW52T3B0cyA9IHtcblx0YmdVUkw6ICcuLi9pbWcvYmctY3Jvd2QtMS5qcGcnLFxuXHRjb21wdXRlZFN0eWxlOiB7XG5cdFx0d2lkdGg6ICtjYW52YXNDb21wdXRlZFN0eWxlT2JqLndpZHRoLnNsaWNlKDAsLTIpLFxuXHRcdGhlaWdodDogK2NhbnZhc0NvbXB1dGVkU3R5bGVPYmouaGVpZ2h0LnNsaWNlKDAsLTIpXG5cdH1cbn1cblxudmFyIGNhbnZhcyA9IG5ldyBmYWJyaWMuU3RhdGljQ2FudmFzKCdnYW1lJywge1xuXHR3aWR0aDogY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0aGVpZ2h0OiBjYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodCxcbn0pO1xuXG5cbn0pKCk7XG5cblxuLy8gKioqIExpc3Qgb2YgVUkgZWxlbWVudHMgKioqXG4vLyBcbi8vIFNldHRpbmdzXHRcdCtcbi8vIFNjb3JlXG4vLyBMb2dvXHRcdFx0XHQrXG4vLyBWb2x1bWVcbi8vIFBhdXNlXG5cbi8vIFNvY2lhbHMiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
