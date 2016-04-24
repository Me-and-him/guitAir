'use strict';

/**
 * connection.js
 *
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function () {
   // Emits fake events.

   var newEvent = new CustomEvent('agSetupEvent', { detail: { song: '12 Home.mp3', bpm: 128, offset: 1000, commands: ['up', 'down', 'pass', 'pass', 'up', 'down', 'pass', 'pass', 'stop'] } });
   document.dispatchEvent(newEvent);
   function sendMovement() {
      var newEvent = new CustomEvent('agCommandEvent', { detail: { time: Date.now(), movement: 'up' } });
      document.dispatchEvent(newEvent);
      setTimeout(sendMovement, 1000);
   }
   sendMovement();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBT0EsQ0FBQyxZQUFXOzs7QUFHUixPQUFJLFdBQVcsSUFBSSxXQUFKLENBQ2xCLGNBRGtCLEVBRWxCLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBUCxFQUFzQixLQUFLLEdBQTNCLEVBQWdDLFFBQVEsSUFBeEMsRUFBOEMsVUFBVSxDQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsTUFBZixFQUF1QixNQUF2QixFQUErQixJQUEvQixFQUFxQyxNQUFyQyxFQUE2QyxNQUE3QyxFQUFxRCxNQUFyRCxFQUE2RCxNQUE3RCxDQUF4RCxFQUFULEVBRmtCLENBQWY7QUFJQSxZQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxZQUFTLFlBQVQsR0FBd0I7QUFDM0IsVUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGdCQURXLEVBRVgsRUFBQyxRQUFRLEVBQUMsTUFBTSxLQUFLLEdBQUwsRUFBUCxFQUFtQixVQUFVLElBQTdCLEVBQVQsRUFGVyxDQUFmO0FBSUEsZUFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsaUJBQVcsWUFBWCxFQUF5QixJQUF6QjtBQUNJO0FBQ0Q7QUFDSCxDQWpCRCIsImZpbGUiOiJjb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjb25uZWN0aW9uLmpzXG4gKlxuICogYGBhZ1NldHVwRXZlbnRgYHMgc2V0IHRoZSBzb25nIG5hbWUgYW5kIHRoZSBjb21tYW5kIHNlcXVlbmNlLlxuICogYGBhZ0NvbW1hbmRFdmVudGBgcyBzYXkgd2hpY2ggY29tbWFuZCB1c2VyIHNlbnQuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIEVtaXRzIGZha2UgZXZlbnRzLlxuXG4gICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQnYWdTZXR1cEV2ZW50Jyxcblx0e2RldGFpbDoge3Nvbmc6ICcxMiBIb21lLm1wMycsIGJwbTogMTI4LCBvZmZzZXQ6IDEwMDAsIGNvbW1hbmRzOiBbJ3VwJywgJ2Rvd24nLCAncGFzcycsICdwYXNzJywgJ3VwJywgJ2Rvd24nLCAncGFzcycsICdwYXNzJywgJ3N0b3AnXX19XG4gICAgKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcbiAgICBmdW5jdGlvbiBzZW5kTW92ZW1lbnQoKSB7XG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ0NvbW1hbmRFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7dGltZTogRGF0ZS5ub3coKSwgbW92ZW1lbnQ6ICd1cCd9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0c2V0VGltZW91dChzZW5kTW92ZW1lbnQsIDEwMDApO1xuICAgIH1cbiAgICBzZW5kTW92ZW1lbnQoKTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
