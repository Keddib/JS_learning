
// example one
// function hoisting


funcDeclaration();


function funcDeclaration() {
	console.log('function declaration is taken to the top of fisrt',
	'enclosing scop or gobal scope and initialized to its function value',
	'this concept is called function hoisting');
}


// Hoisting function declaration vs expression


//greeting(); // TypeError

var greeting = function greeting2() {
	console.log('Function hoisting only applies to formal function declarations',
	 ', not to function expression assignments. in this case var greating is hoisted',
	 'and auto initialized to undefined the assinment left to excution time' );
};


// variables Hoisting
// unlike function Hoisting variables are taken to the top of fisrt
// enclosing scop or gobal scope and initialized to undefined



greeting = "Hello!"; // Though greeting isn’t declared until the 6th line, it’s available to
					 //be assigned to as early as line 1. Why?

console.log(greeting); // Hello!

var greeting = "Howdy!";

// • the identifier is hoisted,
// • andit’s automatically initialized to the value undefined from the top of the scope.

{
	// x = 10; // ReferenceError : cannot access 'x' before initialization

	let x = 2;

	// the same concept applied to let variables declaration but taken
	// to the first block scope and left uninitialized so assining them throws error
}



