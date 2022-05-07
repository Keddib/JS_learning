
function one() {
	console.log('one');
}

one();

var two = function test() {
	// test function is not in the the outer scope
	// is read only;
	'use strict'; // on strict mode assinging other value to test will throw error
	// test = 42; // on normal mode assignment will fail without throwing
	console.log('two');
}

two();

// test(); undefined


var three = function() {
	console.log('three');
}


three();
