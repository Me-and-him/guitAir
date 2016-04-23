"use strict";

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

(function () {
			// Set the connection to the mobile app.
			var host = "ws://" + response.ip + "/";
			var ws = new WebSocket(host);
			var songWasStarted = false;

			function onOpen() {
						// After we connect, the server sends us data which will be handled in
						// ``onmessage`` so we do nothing here.
			}

			function onClose(event) {
						if (!e.wasClean) {
									// Retry if connection failed.
									ws = new WebSocket(host);
									ws.onopen = onOpen;
									ws.onclose = onClose;
									if (!songWasStarted) {
												ws.onmessage = onGotMessageOnStart;
									} else {
												ws.onmessage = onGotMessageOnConnectionEstablished;
									}
						}
						songWasStarted = false;
			}

			function onGotMessageOnStart(event) {
						// Receive song name and command sequence.
						var newEvent = new CustomEvent('agSetupEvent', { detail: { song: event.song, commands: event.commands } });
						document.dispatchEvent(newEvent);
						ws.onmessage = onGotMessageOnConnectionEstablished;
						songWasStarted = true;
			}

			function onGotMessageOnConnectionEstablished(event) {
						// Receive user command.
						var newEvent = new CustomEvent('agComandEvent', { detail: { movement: event.movement, time: event.time } });
						document.dispatchEvent(newEvent);
			}

			ws.onopen = onOpen;
			ws.onclose = onClose;
			ws.onmessage = onGotMessageOnStart;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVdBLENBQUMsWUFBVzs7QUFFUixPQUFJLE9BQU8sVUFBVSxTQUFTLEVBQW5CLEdBQXdCLEdBQW5DO0FBQ0EsT0FBSSxLQUFLLElBQUksU0FBSixDQUFjLElBQWQsQ0FBVDtBQUNBLE9BQUksaUJBQWlCLEtBQXJCOztBQUVBLFlBQVMsTUFBVCxHQUFrQjs7O0FBR2pCOztBQUVELFlBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QjtBQUMzQixVQUFJLENBQUMsRUFBRSxRQUFQLEVBQWlCOztBQUViLGNBQUssSUFBSSxTQUFKLENBQWMsSUFBZCxDQUFMO0FBQ0EsWUFBRyxNQUFILEdBQVksTUFBWjtBQUNBLFlBQUcsT0FBSCxHQUFhLE9BQWI7QUFDQSxhQUFJLENBQUMsY0FBTCxFQUFxQjtBQUN4QixlQUFHLFNBQUgsR0FBZSxtQkFBZjtBQUNJLFVBRkQsTUFFTztBQUNWLGVBQUcsU0FBSCxHQUFlLG1DQUFmO0FBQ0k7QUFDSjtBQUNELHVCQUFpQixLQUFqQjtBQUNJOztBQUVELFlBQVMsbUJBQVQsQ0FBNkIsS0FBN0IsRUFBb0M7O0FBRXZDLFVBQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxjQURXLEVBRVgsRUFBQyxRQUFRLEVBQUMsTUFBTSxNQUFNLElBQWIsRUFBbUIsVUFBVSxNQUFNLFFBQW5DLEVBQVQsRUFGVyxDQUFmO0FBSUEsZUFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsU0FBRyxTQUFILEdBQWUsbUNBQWY7QUFDQSx1QkFBaUIsSUFBakI7QUFDSTs7QUFFRCxZQUFTLG1DQUFULENBQTZDLEtBQTdDLEVBQW9EOztBQUV2RCxVQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsZUFEVyxFQUVYLEVBQUMsUUFBUSxFQUFDLFVBQVUsTUFBTSxRQUFqQixFQUEyQixNQUFNLE1BQU0sSUFBdkMsRUFBVCxFQUZXLENBQWY7QUFJQSxlQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDSTs7QUFFRCxNQUFHLE1BQUgsR0FBWSxNQUFaO0FBQ0EsTUFBRyxPQUFILEdBQWEsT0FBYjtBQUNBLE1BQUcsU0FBSCxHQUFlLG1CQUFmO0FBQ0gsQ0FqREQiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIFNldHMgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICpcbiAqIEVtaXRzICdhZ1NldHVwRXZlbnQnIGFuZCAnYWdDb21tYW5kRXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluXG4gKiB0aGUgdmlldy5cbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICAvLyBTZXQgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIG1vYmlsZSBhcHAuXG4gICAgdmFyIGhvc3QgPSBcIndzOi8vXCIgKyByZXNwb25zZS5pcCArIFwiL1wiO1xuICAgIHZhciB3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG4gICAgdmFyIHNvbmdXYXNTdGFydGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBvbk9wZW4oKSB7XG5cdC8vIEFmdGVyIHdlIGNvbm5lY3QsIHRoZSBzZXJ2ZXIgc2VuZHMgdXMgZGF0YSB3aGljaCB3aWxsIGJlIGhhbmRsZWQgaW5cblx0Ly8gYGBvbm1lc3NhZ2VgYCBzbyB3ZSBkbyBub3RoaW5nIGhlcmUuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZShldmVudCkge1xuXHRpZiAoIWUud2FzQ2xlYW4pIHtcblx0ICAgIC8vIFJldHJ5IGlmIGNvbm5lY3Rpb24gZmFpbGVkLlxuXHQgICAgd3MgPSBuZXcgV2ViU29ja2V0KGhvc3QpO1xuXHQgICAgd3Mub25vcGVuID0gb25PcGVuO1xuXHQgICAgd3Mub25jbG9zZSA9IG9uQ2xvc2U7XG5cdCAgICBpZiAoIXNvbmdXYXNTdGFydGVkKSB7XG5cdFx0d3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25TdGFydDtcblx0ICAgIH0gZWxzZSB7XG5cdFx0d3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ7XG5cdCAgICB9XG5cdH1cblx0c29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPblN0YXJ0KGV2ZW50KSB7XG5cdC8vIFJlY2VpdmUgc29uZyBuYW1lIGFuZCBjb21tYW5kIHNlcXVlbmNlLlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdTZXR1cEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtzb25nOiBldmVudC5zb25nLCBjb21tYW5kczogZXZlbnQuY29tbWFuZHN9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0d3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ7XG5cdHNvbmdXYXNTdGFydGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZChldmVudCkge1xuXHQvLyBSZWNlaXZlIHVzZXIgY29tbWFuZC5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge21vdmVtZW50OiBldmVudC5tb3ZlbWVudCwgdGltZTogZXZlbnQudGltZX19XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuICAgIH1cblxuICAgIHdzLm9ub3BlbiA9IG9uT3BlbjtcbiAgICB3cy5vbmNsb3NlID0gb25DbG9zZTtcbiAgICB3cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPblN0YXJ0O1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
