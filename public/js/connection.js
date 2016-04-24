'use strict';

/**
 * connection.js
 *
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function () {
   // Emits fake events.

   var newEvent = new CustomEvent('agSetupEvent', { detail: { song: '12 Home.mp3', bpm: 100, commands: ['up', 'down', 'pass', 'up', 'down', 'pass'] } });
   document.dispatchEvent(newEvent);
   function sendMovement() {
      var newEvent = new CustomEvent('agCommandEvent', { detail: { time: Date.now(), movement: 'up' } });
      document.dispatchEvent(newEvent);
      setTimeout(sendMovement, 1000);
   }
   sendMovement();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBT0EsQ0FBQyxZQUFXOzs7QUFHUixPQUFJLFdBQVcsSUFBSSxXQUFKLENBQ2xCLGNBRGtCLEVBRWxCLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBUCxFQUFzQixLQUFLLEdBQTNCLEVBQWdDLFVBQVUsQ0FBQyxJQUFELEVBQU8sTUFBUCxFQUFlLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsTUFBN0IsRUFBcUMsTUFBckMsQ0FBMUMsRUFBVCxFQUZrQixDQUFmO0FBSUEsWUFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsWUFBUyxZQUFULEdBQXdCO0FBQzNCLFVBQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxnQkFEVyxFQUVYLEVBQUMsUUFBUSxFQUFDLE1BQU0sS0FBSyxHQUFMLEVBQVAsRUFBbUIsVUFBVSxJQUE3QixFQUFULEVBRlcsQ0FBZjtBQUlBLGVBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNBLGlCQUFXLFlBQVgsRUFBeUIsSUFBekI7QUFDSTtBQUNEO0FBQ0gsQ0FqQkQiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICAvLyBFbWl0cyBmYWtlIGV2ZW50cy5cblxuICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0J2FnU2V0dXBFdmVudCcsXG5cdHtkZXRhaWw6IHtzb25nOiAnMTIgSG9tZS5tcDMnLCBicG06IDEwMCwgY29tbWFuZHM6IFsndXAnLCAnZG93bicsICdwYXNzJywgJ3VwJywgJ2Rvd24nLCAncGFzcyddfX1cbiAgICApO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuICAgIGZ1bmN0aW9uIHNlbmRNb3ZlbWVudCgpIHtcblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tbWFuZEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHt0aW1lOiBEYXRlLm5vdygpLCBtb3ZlbWVudDogJ3VwJ319XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHRzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgMTAwMCk7XG4gICAgfVxuICAgIHNlbmRNb3ZlbWVudCgpO1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
