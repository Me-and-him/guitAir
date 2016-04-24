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
   var ws = io();

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

   io.on('message', onGotMessageOnStart);
   // ws.onopen = onOpen;
   // ws.onclose = onClose;
   // ws.onmessage = onGotMessageOnStart;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVdBLENBQUMsWUFBVzs7QUFFUixPQUFJLE9BQU8sVUFBVSxPQUFPLFFBQVAsQ0FBZ0IsUUFBMUIsR0FBcUMsR0FBaEQ7O0FBRUEsT0FBSSxpQkFBaUIsS0FBckI7QUFDQSxPQUFJLEtBQUssSUFBVDs7QUFFQSxZQUFTLE1BQVQsR0FBa0IsQ0FHakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJELFlBQVMsbUJBQVQsQ0FBNkIsS0FBN0IsRUFBb0M7OztBQUd2QyxVQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsY0FEVyxFQUVYLEVBQUMsUUFBUSxFQUFDLE1BQU0sTUFBTSxJQUFiLEVBQW1CLEtBQUssTUFBTSxHQUE5QixFQUFtQyxVQUFVLE1BQU0sUUFBbkQsRUFBVCxFQUZXLENBQWY7QUFJQSxlQUFTLGFBQVQsQ0FBdUIsUUFBdkI7O0FBRUEsU0FBRyxFQUFILENBQU0sU0FBTixFQUFpQixtQ0FBakI7QUFDQSx1QkFBaUIsSUFBakI7QUFDSTs7QUFFRCxZQUFTLG1DQUFULENBQTZDLEtBQTdDLEVBQW9EOzs7QUFHdkQsVUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGVBRFcsRUFFWCxFQUFDLFFBQVEsRUFBQyxVQUFVLE1BQU0sUUFBakIsRUFBMkIsTUFBTSxNQUFNLElBQXZDLEVBQVQsRUFGVyxDQUFmO0FBSUEsZUFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0k7O0FBRUQsTUFBRyxFQUFILENBQU0sU0FBTixFQUFpQixtQkFBakI7Ozs7QUFJSCxDQXRERCIsImZpbGUiOiJjb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjb25uZWN0aW9uLmpzXG4gKlxuICogU2V0cyBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIuXG4gKlxuICogRW1pdHMgJ2FnU2V0dXBFdmVudCcgYW5kICdhZ0NvbW1hbmRFdmVudCcgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGhhbmRsZWQgaW5cbiAqIHRoZSB2aWV3LlxuICogYGBhZ1NldHVwRXZlbnRgYHMgc2V0IHRoZSBzb25nIG5hbWUgYW5kIHRoZSBjb21tYW5kIHNlcXVlbmNlLlxuICogYGBhZ0NvbW1hbmRFdmVudGBgcyBzYXkgd2hpY2ggY29tbWFuZCB1c2VyIHNlbnQuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIFNldCB0aGUgY29ubmVjdGlvbiB0byB0aGUgbW9iaWxlIGFwcC5cbiAgICB2YXIgaG9zdCA9IFwid3M6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArIFwiL1wiO1xuICAgIC8vdmFyIHdzID0gbmV3IFdlYlNvY2tldChob3N0KTtcbiAgICB2YXIgc29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgd3MgPSBpbygpO1xuXG4gICAgZnVuY3Rpb24gb25PcGVuKCkge1xuXHQvLyBBZnRlciB3ZSBjb25uZWN0LCB0aGUgc2VydmVyIHNlbmRzIHVzIGRhdGEgd2hpY2ggd2lsbCBiZSBoYW5kbGVkIGluXG5cdC8vIGBgb25tZXNzYWdlYGAgc28gd2UgZG8gbm90aGluZyBoZXJlLlxuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIG9uQ2xvc2UoZXZlbnQpIHtcbiAgICAvLyBcdGlmICghZS53YXNDbGVhbikge1xuICAgIC8vIFx0ICAgIC8vIFJldHJ5IGlmIGNvbm5lY3Rpb24gZmFpbGVkLlxuICAgIC8vIFx0ICAgIHdzID0gbmV3IFdlYlNvY2tldChob3N0KTtcbiAgICAvLyBcdCAgICB3cy5vbm9wZW4gPSBvbk9wZW47XG4gICAgLy8gXHQgICAgd3Mub25jbG9zZSA9IG9uQ2xvc2U7XG4gICAgLy8gXHQgICAgaWYgKCFzb25nV2FzU3RhcnRlZCkge1xuICAgIC8vIFx0XHR3cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPblN0YXJ0O1xuICAgIC8vIFx0ICAgIH0gZWxzZSB7XG4gICAgLy8gXHRcdHdzLm9ubWVzc2FnZSA9IG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkO1xuICAgIC8vIFx0ICAgIH1cbiAgICAvLyBcdH1cbiAgICAvLyBcdHNvbmdXYXNTdGFydGVkID0gZmFsc2U7XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25TdGFydChldmVudCkge1xuXHQvLyBSZWNlaXZlIHNvbmcgbmFtZSBhbmQgY29tbWFuZCBzZXF1ZW5jZS5cblx0Ly8gVE9ETyEgR2VuZXJhdGUgYSBtb3ZlbWVudCBzdHJpbmcgbGlzdCBmcm9tIHRoZSBzdXBwbGllZCBjb2RlLlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdTZXR1cEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtzb25nOiBldmVudC5zb25nLCBicG06IGV2ZW50LmJwbSwgY29tbWFuZHM6IGV2ZW50LmNvbW1hbmRzfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdC8vd3Mub25tZXNzYWdlID0gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ7XG5cdHdzLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQpO1xuXHRzb25nV2FzU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQoZXZlbnQpIHtcblx0Ly8gUmVjZWl2ZSB1c2VyIGNvbW1hbmQuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGZyb20gdGhlIHN1cHBsaWVkIGNvZGUuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ0NvbWFuZEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHttb3ZlbWVudDogZXZlbnQubW92ZW1lbnQsIHRpbWU6IGV2ZW50LnRpbWV9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcbiAgICB9XG5cbiAgICBpby5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uU3RhcnQpO1xuICAgIC8vIHdzLm9ub3BlbiA9IG9uT3BlbjtcbiAgICAvLyB3cy5vbmNsb3NlID0gb25DbG9zZTtcbiAgICAvLyB3cy5vbm1lc3NhZ2UgPSBvbkdvdE1lc3NhZ2VPblN0YXJ0O1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
