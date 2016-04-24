/**
 * Test connections.
 */

(function() {
  
for (let i = 1; i<10; i++) {
	setTimeout(function(){
 		var newEvent = new CustomEvent('glAddMovement',
 		{detail: "pass"});
    document.dispatchEvent(newEvent);
  }, i*1000);

  setTimeout(function(){
  	var newEvent = new CustomEvent('glStatus', {
  		detail: {status: "fail", index: i-1}
  	});
    document.dispatchEvent(newEvent);	
  }, i*1000+2500);
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
