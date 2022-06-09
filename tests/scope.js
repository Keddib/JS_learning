// 'use strict';


var undefined = true; // setting a land-mine for other code! avoid!


(function IIFE( undef ){
	var a;
	if (a === undef) {
		console.log( "Undefined is safe here!" );
	}
})(undefined);

var x = 20;

(function IIFE( def ){
	def( global );
})(function def( global ){
	var a = x;
	console.log( a ); // 3
	// console.log( global.a ); // 2
});




// for (let i = 0; i < 1; i++) {
// 	console.log(i);
// }



// {
// 	let j;
// 	for (j=0; j<10; j++) {
// 		let i = j; // re-bound for each iteration!
// 		console.log( i );
// 	}
// 	const s = 'hello';
// }




// foo(); // "b"
// var a = true; if(a){
// function foo() { console.log("a"); } }
// else {
// function foo() { console.log("b"); }
// }


// console.log("Howdy");
// saySomething("Hello","Hi");
// // Uncaught SyntaxError: Duplicate parameter name not // allowed in this context
// function saySomething(greeting,greeting) { "use strict";
// console.log(greeting);
// }


{
	a = 10;
	let a = 9;
}
