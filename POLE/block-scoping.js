// Scoping with Blocks


// In general, any { .. } curly-brace pair which is a statement will act as a block,
// but not necessarily as a scope. A block only becomes a scope if necessary,
// to contain its block-scoped declarations (i.e., let or const). Consider:


{
	// not necessatily a scope

	let x = 10;
	// now we know the block needs to be ascope

	for (let i = 0; i < 5; i++) {
		// this is also a scope, activated each iteration
		if (i % 2 == 0) {
			// just a block not a scope;
			console.log(i);
		}
	}


}



// Not all { .. } curly-brace pairs create blocks (and thus are eligible to become scopes):
//• Object literals use { .. } curly-brace pairs to delimit their key-value lists,
//	but such object values are not scopes.
//• class uses { .. } curly-braces around its body defini- tion, but this is not a block or scope.
//• A function uses { .. } around its body, but this is not technically
// 	a block—it’s a single statement for the function body. It is, however, a (function) scope.
//• The { .. } curly-brace pair on a switch statement (around the set of case clauses)
//  does not define a block/scope.


// Explicit standalone { .. } blocks have always been valid JS syntax,
// but since they couldn’t be a scope prior to ES6’s
// let/const, they are quite rare. However, post ES6, they’re starting to catch on a little bit.

// An explicit block scope can be useful even inside of another block
// (whether the outer block is a scope or not).
// For example:

var obj = {}

if (obj) {
	// this is a block but not a scope

	{
		// expilict block and scope
		let msg  = somethingHappened.msg();
		notifyOthers(msg);
	}
	// do somthing
}

