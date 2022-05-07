

var greeting;

function greeting() { console.log("Hello!");

}

greeting();

// basically, a no-op
var greeting;

typeof greeting; // "function"


var greeting = "Hello!";

typeof greeting; // "string"



{
	let studentName = "Frank";
	console.log(studentName);
	//let studentName = "Suzy";
	// for let things change
	// re-declaration is explicitly not allowed

	// not only with let and let
	// see this
	var studentName1 = "Frank";
	// let studentName1 = "Suzy";
	// and:
	let studentName2 = "Frank";
	// var studentName2 = "Suzy";
}
