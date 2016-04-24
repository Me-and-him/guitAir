'use strict';

/**
 * Test connections.
 */

(function () {
  var _loop = function _loop(i) {
    setTimeout(function () {
      var newEvent = new CustomEvent('glAddMovement', { detail: "pass" });
      document.dispatchEvent(newEvent);
    }, i * 1000);

    setTimeout(function () {
      var newEvent = new CustomEvent('glStatus', {
        detail: { status: "fail", index: i - 1 }
      });
      document.dispatchEvent(newEvent);
    }, i * 1000 + 2500);
  };

  for (var i = 1; i < 10; i++) {
    _loop(i);
  }

  //   setTimeout(function(){
  //  var newEvent = new CustomEvent(
  // 	'glAddMovement',
  // 	{detail: "up"}
  //     );
  //     document.dispatchEvent(newEvent);
  //   }, 1000);

  //   setTimeout(function(){
  //   	var newEvent = new CustomEvent(
  // 	'glAddMovement',
  // 	{detail: "down"}
  //     );
  //     document.dispatchEvent(newEvent);	
  //   }, 1500);

  //   setTimeout(function(){
  //   	var newEvent = new CustomEvent(
  // 	'glStatus',
  // 	{detail: {status: "success", index: 0}}
  //     );
  //     document.dispatchEvent(newEvent);	
  //   }, 3500);

  //   setTimeout(function(){
  //   	var newEvent = new CustomEvent(
  // 	'glStatus',
  // 	{detail: {status: "success", index: 1}}
  //     );
  //     document.dispatchEvent(newEvent);	
  //   }, 4000);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QtY29ubmVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxDQUFDLFlBQVc7QUFBQSw2QkFFSCxDQUZHO0FBR1gsZUFBVyxZQUFVO0FBQ25CLFVBQUksV0FBVyxJQUFJLFdBQUosQ0FBZ0IsZUFBaEIsRUFDZixFQUFDLFFBQVEsTUFBVCxFQURlLENBQWY7QUFFQyxlQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDRCxLQUpGLEVBSUksSUFBRSxJQUpOOztBQU1DLGVBQVcsWUFBVTtBQUNwQixVQUFJLFdBQVcsSUFBSSxXQUFKLENBQWdCLFVBQWhCLEVBQTRCO0FBQzFDLGdCQUFRLEVBQUMsUUFBUSxNQUFULEVBQWlCLE9BQU8sSUFBRSxDQUExQjtBQURrQyxPQUE1QixDQUFmO0FBR0MsZUFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0QsS0FMRCxFQUtHLElBQUUsSUFBRixHQUFPLElBTFY7QUFUVTs7QUFFWixPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUUsRUFBbEIsRUFBc0IsR0FBdEIsRUFBMkI7QUFBQSxVQUFsQixDQUFrQjtBQWExQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLENBakREIiwiZmlsZSI6InRlc3QtY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVzdCBjb25uZWN0aW9ucy5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gIFxuZm9yIChsZXQgaSA9IDE7IGk8MTA7IGkrKykge1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnZ2xBZGRNb3ZlbWVudCcsXG4gXHRcdHtkZXRhaWw6IFwicGFzc1wifSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gIH0sIGkqMTAwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICBcdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnZ2xTdGF0dXMnLCB7XG4gIFx0XHRkZXRhaWw6IHtzdGF0dXM6IFwiZmFpbFwiLCBpbmRleDogaS0xfVxuICBcdH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1x0XG4gIH0sIGkqMTAwMCsyNTAwKTtcbn1cblxuLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4vLyAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuLy8gXHQnZ2xBZGRNb3ZlbWVudCcsXG4vLyBcdHtkZXRhaWw6IFwidXBcIn1cbi8vICAgICApO1xuLy8gICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuLy8gICB9LCAxMDAwKTtcblxuLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4vLyAgIFx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuLy8gXHQnZ2xBZGRNb3ZlbWVudCcsXG4vLyBcdHtkZXRhaWw6IFwiZG93blwifVxuLy8gICAgICk7XG4vLyAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XHRcbi8vICAgfSwgMTUwMCk7XG5cbi8vICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gICBcdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcbi8vIFx0J2dsU3RhdHVzJyxcbi8vIFx0e2RldGFpbDoge3N0YXR1czogXCJzdWNjZXNzXCIsIGluZGV4OiAwfX1cbi8vICAgICApO1xuLy8gICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1x0XG4vLyAgIH0sIDM1MDApO1xuXG4vLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbi8vICAgXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG4vLyBcdCdnbFN0YXR1cycsXG4vLyBcdHtkZXRhaWw6IHtzdGF0dXM6IFwic3VjY2Vzc1wiLCBpbmRleDogMX19XG4vLyAgICAgKTtcbi8vICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcdFxuLy8gICB9LCA0MDAwKTtcbiAgXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
