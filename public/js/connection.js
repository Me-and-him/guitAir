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
 * The server in this document is a server that serves as a mediator between this
 * page and the app serving as controller for it.
 */

(function () {
	new Promise(function (resolve, reject) {
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
			} else {} /* something went wrong, amarait? */
			// TODO! Sleep few seconds...
		}
		// The followng ``responseText`` is a json object that may be
		// representet in the following form:
		//     responseText = {'ip': <some_ip>};
		// where <some_ip> is a string that contains ip address.
		resolve(xhr.responseText);
	}).then(function (response) {
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
	});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxDQUFDLFlBQVc7QUFDUCxLQUFJLE9BQUosQ0FBWSxVQUFTLE9BQVQsRUFBa0IsTUFBbEIsRUFBMEI7O0FBRTFDLE1BQUksTUFBTSxJQUFJLGNBQUosRUFBVjs7QUFFQSxTQUFPLElBQVAsRUFBYTtBQUNULE9BQUksSUFBSixDQUFTLEtBQVQsRUFBZ0IsU0FBaEIsRUFBMkIsS0FBM0I7QUFDQSxPQUFJLElBQUo7QUFDQSxPQUFJLElBQUksTUFBSixJQUFjLEdBQWxCLEVBQXVCOztBQUUxQjtBQUNJLElBSEQsTUFHTyxJQUFJLElBQUksTUFBSixJQUFjLEdBQWxCLEVBQXVCOztBQUVqQztBQUNJLElBSE0sTUFHQSxDQUF3QyxDOztBQUVsRDs7Ozs7QUFLRCxVQUFRLElBQUksWUFBWjtBQUNJLEVBckJBLENBQUQsQ0FxQkksSUFyQkosQ0FxQlMsVUFBUyxRQUFULEVBQW1COztBQUUvQixNQUFJLE9BQU8sVUFBVSxTQUFTLEVBQW5CLEdBQXdCLEdBQW5DO0FBQ0EsTUFBSSxLQUFLLElBQUksU0FBSixDQUFjLElBQWQsQ0FBVDs7QUFFQSxXQUFTLGFBQVQsR0FBeUI7OztBQUd4Qjs7QUFFRCxXQUFTLGNBQVQsQ0FBd0IsQ0FBeEIsRUFBMkI7QUFDdkIsT0FBSSxDQUFDLEVBQUUsUUFBUCxFQUFpQjs7QUFFcEIsU0FBSyxJQUFJLFNBQUosQ0FBYyxJQUFkLENBQUw7QUFDQSxPQUFHLE1BQUgsR0FBWSxhQUFaO0FBQ0EsT0FBRyxPQUFILEdBQWEsY0FBYjtBQUNBLE9BQUcsU0FBSCxHQUFlLG1CQUFmO0FBQ0E7QUFDSTs7O0FBR0o7Ozs7Ozs7OztBQVNELFdBQVMsbUJBQVQsQ0FBNkIsQ0FBN0IsRUFBZ0M7OztBQUc1QixPQUFJLFdBQVcsSUFBSSxXQUFKLENBQ2xCLFNBRGtCLEVBRWxCLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBRSxRQUFiLEVBQXVCLE1BQU0sRUFBRSxJQUEvQixFQUFULEVBRmtCLENBQWY7QUFJSDs7QUFFRCxLQUFHLE1BQUgsR0FBWSxhQUFaO0FBQ0EsS0FBRyxPQUFILEdBQWEsY0FBYjtBQUNBLEtBQUcsU0FBSCxHQUFlLG1CQUFmO0FBQ0ksRUEvREQ7QUFnRUgsQ0FqRUQiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIEdyYWJzIHRoZSBJUCBhZGRyZXNzIG9mIGFuIG1vYmlsZS1hcHAgYW5kIG1hbmFnZXMgY29ubmVjdGlvbiB0byB0aGUgcGhvbmUuXG4gKlxuICogRW1pdHMgJ3dzZXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluIHRoZSB2aWV3LlxuICpcbiAqIEluIHRoaXMgZG9jdW1lbnQgZm9sbG93aW5nIHRlcm1zIHNob3VsZCBiZSB0cmVhdGVkIGFzIGVxdWFsOiBtb2JpbGUgc2VydmVyLFxuICogbW9iaWxlIGNvbnRyb2xsZXIsIHBob25lLCBtb2JpbGUgYXBwIC0gYW5kIGFsbCBvZiB0aGVzZSBtZWFuIHRoZSBzZXJ2ZXIgcnVubmluZ1xuICogb24gdGhlIG1vYmlsZSBwaG9uZSB0aGF0IGlzIGEgY29udHJvbGxlciBmb3IgdGhpcyBwYWdlLlxuICpcbiAqIFRoZSBzZXJ2ZXIgaW4gdGhpcyBkb2N1bWVudCBpcyBhIHNlcnZlciB0aGF0IHNlcnZlcyBhcyBhIG1lZGlhdG9yIGJldHdlZW4gdGhpc1xuICogcGFnZSBhbmQgdGhlIGFwcCBzZXJ2aW5nIGFzIGNvbnRyb2xsZXIgZm9yIGl0LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICAobmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdC8vIEFzayBzZXJ2ZXIgaWYgdGhpcyBwYWdlIHdhcyByZXF1ZXN0ZWQgYnkgY29kZS5cblx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHQvLyBUT0RPISBFZGl0IHRoZSBmb2xsb3dpbmcgcmVxdWVzIGFjY29yZGluZyB0byBwcm90b2NvbCBvZiB0aGUgc2VydmVyLlxuXHR3aGlsZSAodHJ1ZSkge1xuXHQgICAgeGhyLm9wZW4oJ0dFVCcsICdhcHAvcmVxJywgZmFsc2UpO1xuXHQgICAgeGhyLnNlbmQoKTtcblx0ICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuXHRcdC8vIFRoaXMgcGFnZSB3YXMgcmVxdWVzdGVkIGJ5IHNvbWUgbW9iaWxlIGFwcC5cblx0XHRicmVhaztcblx0ICAgIH0gZWxzZSBpZiAoeGhyLnN0YXR1cyA9PSAyMDQpIHtcblx0XHQvLyBHbyBpbnRvIGFuIGluZmluaXRlIGxvb3AgdW50aWxsIGNvbm5lY3Rpb24gaXMgc3VjY2Vzc2Z1bC5cblx0XHRjb250aW51ZTtcblx0ICAgIH0gZWxzZSB7IC8qIHNvbWV0aGluZyB3ZW50IHdyb25nLCBhbWFyYWl0PyAqLyB9XG5cdCAgICAvLyBUT0RPISBTbGVlcCBmZXcgc2Vjb25kcy4uLlxuXHR9XG5cdC8vIFRoZSBmb2xsb3duZyBgYHJlc3BvbnNlVGV4dGBgIGlzIGEganNvbiBvYmplY3QgdGhhdCBtYXkgYmVcblx0Ly8gcmVwcmVzZW50ZXQgaW4gdGhlIGZvbGxvd2luZyBmb3JtOlxuXHQvLyAgICAgcmVzcG9uc2VUZXh0ID0geydpcCc6IDxzb21lX2lwPn07XG5cdC8vIHdoZXJlIDxzb21lX2lwPiBpcyBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIGlwIGFkZHJlc3MuXG5cdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgfSkpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0Ly8gU2V0IHRoZSBjb25uZWN0aW9uIHRvIHRoZSBtb2JpbGUgYXBwLlxuXHR2YXIgaG9zdCA9IFwid3M6Ly9cIiArIHJlc3BvbnNlLmlwICsgXCIvXCI7XG5cdHZhciB3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG5cblx0ZnVuY3Rpb24gb25XU29ja2V0T3BlbigpIHtcblx0ICAgIC8vIEFmdGVyIHdlIGNvbm5lY3QgdGhlIG1vYmlsZSBzZXJ2ZXIgc2VuZHMgdXMgZGF0YSB3aGljaCB3aWxsIGJlXG5cdCAgICAvLyBoYW5kbGVkIGluIGBgb25tZXNzYWdlYGAgc28gd2UgZG8gbm90aGluZyBoZXJlLlxuXHR9XG5cblx0ZnVuY3Rpb24gb25XU29ja2V0Q2xvc2UoZSkge1xuXHQgICAgaWYgKCFlLndhc0NsZWFuKSB7XG5cdFx0Ly8gUmV0cnkgdG8gY29ubmVjdC5cblx0XHR3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG5cdFx0d3Mub25vcGVuID0gb25XU29ja2V0T3Blbjtcblx0XHR3cy5vbmNsb3NlID0gb25XU29ja2V0Q2xvc2U7XG5cdFx0d3Mub25tZXNzYWdlID0gb25XU29ja2V0R290TWVzc2FnZTtcblx0XHRyZXR1cm47XG5cdCAgICB9XG5cdCAgICAvLyBXZSBoYW5kbGUgbGVnaXRpbWF0ZSBjbG9zaW5nIGluIGBgb25tZXNzYWdlYGAgc28gd2UgZG8gbm90aGluZ1xuXHQgICAgLy8gaGVyZS5cblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgbWVzc2FnZSBmcm9tIG91ciBtb2JpbGUgY29udHJvbGxlciBhbmQgZW1pdCBhbiBldmVudCBub3RpZnlpbmdcblx0ICogdGhlIHZpZXcuXG5cdCAqXG5cdCAqIEFyZ3M6XG5cdCAqICAgICBlOiBBbiBldmVudCBmcm9tIG1vYmlsZSBhcHA7IGNvbnRhaW5zIGBgdGltZWBgIGFuZCBgYG1vdmVtZW50YGAuXG5cdCAqL1xuXHRmdW5jdGlvbiBvbldTb2NrZXRHb3RNZXNzYWdlKGUpIHtcblx0ICAgIC8vIEdlbmVyYXRlIGEgbmV3IGV2ZW50IHRoYXQgd2lsbCBiZSBzZW50IHRvIGV2ZW50IGhhbmRsZXIgaW4gdGhlXG5cdCAgICAvLyB2aWV3LlxuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdCd3c2V2ZW50Jyxcblx0XHR7ZGV0YWlsOiB7bW92ZW1lbnQ6IGUubW92ZW1lbnQsIHRpbWU6IGUudGltZX19XG5cdCAgICApO1xuXHR9XG5cblx0d3Mub25vcGVuID0gb25XU29ja2V0T3Blbjtcblx0d3Mub25jbG9zZSA9IG9uV1NvY2tldENsb3NlO1xuXHR3cy5vbm1lc3NhZ2UgPSBvbldTb2NrZXRHb3RNZXNzYWdlO1xuICAgIH0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
