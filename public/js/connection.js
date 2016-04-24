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
   var host = "ws://" + window.location.hostname + "/";
   //var ws = new WebSocket(host);
   var songWasStarted = false;
   // var ws = io();

   function onOpen() {}
   // After we connect, the server sends us data which will be handled in
   // ``onmessage`` so we do nothing here.


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
      var newEvent = new CustomEvent('agSetupEvent', { detail: { song: event.song, bpm: event.bpm, commands: event.commands } });
      document.dispatchEvent(newEvent);
      //ws.onmessage = onGotMessageOnConnectionEstablished;
      ws.on('message', onGotMessageOnConnectionEstablished);
      songWasStarted = true;
   }

   function onGotMessageOnConnectionEstablished(event) {
      // Receive user command.
      // TODO! Generate a movement string from the supplied code.
      var newEvent = new CustomEvent('agComandEvent', { detail: { movement: event.movement, time: event.time } });
      document.dispatchEvent(newEvent);
   }

   // io.on('message', onGotMessageOnStart);
   // ws.onopen = onOpen;
   // ws.onclose = onClose;
   // ws.onmessage = onGotMessageOnStart;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVdBLENBQUMsWUFBVzs7QUFFUixPQUFJLE9BQU8sVUFBVSxPQUFPLFFBQVAsQ0FBZ0IsUUFBMUIsR0FBcUMsR0FBaEQ7O0FBRUEsT0FBSSxpQkFBaUIsS0FBckI7OztBQUdBLFlBQVMsTUFBVCxHQUFrQixDQUdqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkQsWUFBUyxtQkFBVCxDQUE2QixLQUE3QixFQUFvQzs7O0FBR3ZDLFVBQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxjQURXLEVBRVgsRUFBQyxRQUFRLEVBQUMsTUFBTSxNQUFNLElBQWIsRUFBbUIsS0FBSyxNQUFNLEdBQTlCLEVBQW1DLFVBQVUsTUFBTSxRQUFuRCxFQUFULEVBRlcsQ0FBZjtBQUlBLGVBQVMsYUFBVCxDQUF1QixRQUF2Qjs7QUFFQSxTQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLG1DQUFqQjtBQUNBLHVCQUFpQixJQUFqQjtBQUNJOztBQUVELFlBQVMsbUNBQVQsQ0FBNkMsS0FBN0MsRUFBb0Q7OztBQUd2RCxVQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsZUFEVyxFQUVYLEVBQUMsUUFBUSxFQUFDLFVBQVUsTUFBTSxRQUFqQixFQUEyQixNQUFNLE1BQU0sSUFBdkMsRUFBVCxFQUZXLENBQWY7QUFJQSxlQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDSTs7Ozs7O0FBTUosQ0F0REQiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIFNldHMgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICpcbiAqIEVtaXRzICdhZ1NldHVwRXZlbnQnIGFuZCAnYWdDb21tYW5kRXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluXG4gKiB0aGUgdmlldy5cbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICAvLyBTZXQgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIG1vYmlsZSBhcHAuXG4gICAgdmFyIGhvc3QgPSBcIndzOi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyBcIi9cIjtcbiAgICAvL3ZhciB3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG4gICAgdmFyIHNvbmdXYXNTdGFydGVkID0gZmFsc2U7XG4gICAgLy8gdmFyIHdzID0gaW8oKTtcblxuICAgIGZ1bmN0aW9uIG9uT3BlbigpIHtcblx0Ly8gQWZ0ZXIgd2UgY29ubmVjdCwgdGhlIHNlcnZlciBzZW5kcyB1cyBkYXRhIHdoaWNoIHdpbGwgYmUgaGFuZGxlZCBpblxuXHQvLyBgYG9ubWVzc2FnZWBgIHNvIHdlIGRvIG5vdGhpbmcgaGVyZS5cbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBvbkNsb3NlKGV2ZW50KSB7XG4gICAgLy8gXHRpZiAoIWUud2FzQ2xlYW4pIHtcbiAgICAvLyBcdCAgICAvLyBSZXRyeSBpZiBjb25uZWN0aW9uIGZhaWxlZC5cbiAgICAvLyBcdCAgICB3cyA9IG5ldyBXZWJTb2NrZXQoaG9zdCk7XG4gICAgLy8gXHQgICAgd3Mub25vcGVuID0gb25PcGVuO1xuICAgIC8vIFx0ICAgIHdzLm9uY2xvc2UgPSBvbkNsb3NlO1xuICAgIC8vIFx0ICAgIGlmICghc29uZ1dhc1N0YXJ0ZWQpIHtcbiAgICAvLyBcdFx0d3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25TdGFydDtcbiAgICAvLyBcdCAgICB9IGVsc2Uge1xuICAgIC8vIFx0XHR3cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZDtcbiAgICAvLyBcdCAgICB9XG4gICAgLy8gXHR9XG4gICAgLy8gXHRzb25nV2FzU3RhcnRlZCA9IGZhbHNlO1xuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIG9uR290TWVzc2FnZU9uU3RhcnQoZXZlbnQpIHtcblx0Ly8gUmVjZWl2ZSBzb25nIG5hbWUgYW5kIGNvbW1hbmQgc2VxdWVuY2UuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGxpc3QgZnJvbSB0aGUgc3VwcGxpZWQgY29kZS5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7c29uZzogZXZlbnQuc29uZywgYnBtOiBldmVudC5icG0sIGNvbW1hbmRzOiBldmVudC5jb21tYW5kc319XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQvL3dzLm9ubWVzc2FnZSA9IG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkO1xuXHR3cy5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkKTtcblx0c29uZ1dhc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkKGV2ZW50KSB7XG5cdC8vIFJlY2VpdmUgdXNlciBjb21tYW5kLlxuXHQvLyBUT0RPISBHZW5lcmF0ZSBhIG1vdmVtZW50IHN0cmluZyBmcm9tIHRoZSBzdXBwbGllZCBjb2RlLlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdDb21hbmRFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7bW92ZW1lbnQ6IGV2ZW50Lm1vdmVtZW50LCB0aW1lOiBldmVudC50aW1lfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gICAgfVxuXG4gICAgLy8gaW8ub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPblN0YXJ0KTtcbiAgICAvLyB3cy5vbm9wZW4gPSBvbk9wZW47XG4gICAgLy8gd3Mub25jbG9zZSA9IG9uQ2xvc2U7XG4gICAgLy8gd3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25TdGFydDtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
