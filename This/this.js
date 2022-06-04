// this is not reference to the function it's self, nor is it a reference to
// the function lexical scope

// THIS is a binding made for each function invocation, baes entirely on it's
// call-site (how the function is called)


// what is a Call-Site

// call-site is where in the code the function is called (not where it's
// defined)
// finding the call site is generally "locate the function call". but it's not
// always that easy, as certain coding patterns can ob‐ scure the true
// call-site.

// Instead , it's important to think about the call stack. the call-site
// that we care about is in the invocation before the currently ecxuting
// function. Example :

function baz() {
	// call stack is : 'baz';
	// so our call-site is in the global scope
	console.log( "baz" );
	bar(); // <-- call-site for `bar`
}

function bar() {
	// call stack is : baz -> bar
	// so our call-site is in : baz;
	console.log("bar");
	foo.call(bar); // <-- call site for 'foo'
}

function foo() {
	// call stack is : 'baz' -> 'bar' -> 'foo'
	// so our call-site is in 'bar'
	console.log('foo');
	this.xxx = 'this';
}

// baz(); // call site for baz;

// console.log(bar.xxx);

// Take care when analyzing code to find the actual call-site (from the
// call-stack), because it’s the only thing that matters for this binding.

// we should inspect the call-site ans determine which of the four rules
// applies. Then illustrate their order of precedence, if multiple rules could
// apply to the call-site.

// 1 - default binding
// standalone function invocation . Think of this rule as the defaault
// catch-all rule when non other rules apply.

// example:

function foo1() {
	console.log(this.a);
}

var a  = 2;

// node
// globalThis.a = 2;
// foo1();

// if no context was supplied the this resolves the global object.
// on strict mode the global object is not eligible for the default binding
// so this is set to undifiend

// A subtle but important detail is that though the overall this binding rules
// are entirely based on the call-site, the global object is only eligible for
// the default binding if the contents of foo() are not running in
// strict mode; the strict mode state of the call-site of foo() is irrelevant:

function foo3() {
	console.log( this.a );
}

var a = 2;

// (function(){
// 	"use strict";
// 	foo3(); // 2
// })();


// 2 - implicit binding

// Another rule to consider is whether the call-site has a context object,
// also referred to as an owning or containing object, though these alternate
// terms could be slightly misleading.

function foo4() {
	console.log( this.a );
}

var obj={
	a: 2,
	foo4: foo4
};

obj.foo4(); // 2

// First, notice the manner in which foo() is declared and then later added as
// a reference property onto obj. Regardless of whether foo() is initially
// declared on foo, or is added as a reference later (as this snippet shows),
//in neither case is the function really “owned” or “contained” by the obj object.

//Only the top/last level of an object property reference chain matters to the call-site. For instance:

function fooo() {
	console.log( this.a );
}

var obj2={
	a: 42,
	fooo: fooo
};

var obj1={
	a: 2,
	obj2: obj2
};

obj1.obj2.fooo(); // 42



// 2.1 - implicit lost

// One of the most common frustrations that this binding creates is when an
// implicitly bound function loses that binding, which usually means it falls
// back to the default binding of either the global object or undefined,
// depending on strict mode.

function fooo1() {
	console.log( this.a );
}
var obj={
	a: 2,
	fooo1: fooo1
};

var bar2 = obj.fooo1; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar2(); // "oops, global"

// another one

function fooo2() {
	console.log( this.a );
}

function doFoo(fn) {
// `fn` is just another reference to `foo` fn(); // <-- call-site!
}
var obj={
	a: 2,
	fooo2: fooo2
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.fooo2 ); // "oops, global"


// 3- Explicit Binding


// With implicit binding, as we just saw, we had to mutate the object in
// question to include a reference on itself to the function, and use this
// property function reference to indirectly (implicitly) bind this to the object.

// all functions in the language have some utilities available to them via
// [protorype] . .call(..) and .apply(..) methods are some of them.
// They both take, as their first parameter, an object to use for the this,
// and then invoke the function with that this specified. Since you are directly
// stating what you want the this to be, we call it explicit binding.

	function explicit() {
		console.log( this.a );
	}

	var obj = {
		a:2
	};

	explicit.call( obj ); // 2

// Invoking foo with explicit binding by foo.call(..) allows us to force its
// this to be obj. If you pass a simple primitive value
// (of type string, boolean, or number) as the this binding, the primitive
// value is wrapped in its object- form (new String(..), new Boolean(..),
// or new Number(..), respectively). This is often referred to as “boxing.”


// Unfortunately, explicit binding alone still doesn’t offer any solution to
// the issue mentioned previously, of a function “losing” its intended this
// binding, or just having it paved over by a framework, etc.

// 3.1- hard banding

// example :

	function toto() {
		console.log(this.a);
	}

	var obj = {
		a: 'awsome'
	}

	var bind = function () {
		toto.call(obj);
	}

	bind();
	// setTimeout( bind, 100 ); // 2
	// hard-bound `bar` can no longer have its `this` overridden
	// bind.call( window ); // 2

// Let’s examine how this variation works. We create a function bar() which,
// internally, manually calls foo.call(obj), thereby forcibly invoking foo
// with obj binding for this. No matter how you later invoke the function bar,
// it will always manually invoke foo with obj. This binding is both explicit
// and strong, so we call it hard binding.

// another example
// The most typical way to wrap a function with a hard binding creates a
// pass-through of any arguments passed and any return value received:


function bow(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj={
	a:2
};

var bind = function() {
	return bow.apply( obj, arguments );
};

var b = bind( 3 ); // 2 3
console.log( b ); // 5

// Another way to express this pattern is to create a reusable helper:

function foco(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {

	return function() {
		return fn.apply( obj, arguments );
	};
}

var objx = {
	a:2
};

var bow3 = bind(foco, objx);

// bow3 ( 3 );


// Since hard binding is such a common pattern, it’s provided with a built-
// in utility as of ES5, Function.prototype.bind, and it’s used like this:

function foo32(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj3= {
	a:2
};

console.log('-------');
var bar32 = foo32.bind( obj );

var b = bar32( 3 ); // 2 3
console.log( b ); // 5


// 3.2 API call “contexts”

// Many libraries’ functions, and indeed many new built-in functions in the
// JavaScript language and host environment, provide an optional parameter,
// usually called “context,” which is designed as a work-around
// for you not having to use bind(..) to ensure your
// callback function uses a particular this.
// For instance:

function foxes(el) {
	console.log( el, this.id );
}

var awsomeObj = {
	id: "awesome"
};

console.log('---------');
// use `awsomeObj` as `this` for `foxes(..)` calls

[1, 2, 3].forEach( foxes, awsomeObj );
// 1 awesome 2 awesome 3 awesome

// Internally, these various functions almost certainly use explicit binding
// via call(..) or apply(..), saving you the trouble.


// 4 new binding

// constructors in JS is just functions that happen to be called with the new
// operator in front of them. they are not attached to classes nor they are
// instantiating a class. they are not even special types of functions. just
// regular functions that are hijacked by the use of new in thier invocation.

// So, pretty much any ol’ function, including the built-in object functions
// like Number(..) can be called with new in front of it, and that makes that
// function call a constructor call. This is an important but subtle
// distinction: there’s really no such thing as “constructor functions,”
// but rather construction calls of functions.
// as a constructor call, the following things are done automatically:
// 1. A brand new object is created (aka constructed) out of thin air.
// 2. The newly constructed object is [[Prototype]]-linked.
// 3. The newly constructed object is set as the this binding for that function call.
// 4. Unless the function returns its own alternate object, the new-invoked
// function call will automatically return the newly con‐ structed object.

// example :

function constr(x) {
	this.a  = x;
}

var teto = new constr('test');

console.log(teto);

// By calling foo(..) with new in front of it, we’ve constructed a new object
// and set that new object as the this for the call of foo(..). So new is the
// final way that a function call’s this can be bound. We’ll call this
// new binding.


// 4 RULES ORDER

// So, now we’ve uncovered the four rules for binding this in function calls.
// All you need to do is find the call-site and inspect it to see which rule
// applies. But, what if the call-site has multiple eligible rules? There must
// be an order of precedence to these rules, and so we will next demonstrate
// what order to apply the rules.

// default binding is the lowest priority rule

// implicit vs explicit binding ?


function fowow() {
	console.log( this.a );
}
var objwow = {
	a: 'im',
	foo: fowow
};

var objwow2 = {
	a: 'ix',
};

objwow.foo(); // im

objwow.foo.call( objwow2 ); // ix

// So, explicit binding takes precedence over implicit binding, which means you
// should ask first if explicit binding applies before checking for implicit binding.


// Now, we just need to figure out where new binding fits in the precedence:

// constr

var objj1={
	foo: constr
};
var objj2 = {};

console.log('----')

objj1.foo( 'implicit binding' );
console.log( objj1.a ); // 2

objj1.foo.call( objj2, 'explicit binding' );
console.log( objj2.a ); // 2

var newbind = new objj1.foo('new binding');

console.log(objj1.a);
console.log(newbind.a);

// new binding is more precendent than implicit binding.
// let see new binding against explicit binding

// new and call/apply cannot be used together, so new foo.call(obj1) is not
// allowed to test new binding directly against explicit binding.
// But we can still use a hard binding to test the precedence of the two rules.

function propaga(x) {
	this.x = x;
}

var obobo = {
	a: 'obj'
}

var propaga2 = propaga.bind(obobo);



var polo = new propaga2('new over ixplicit');

console.log(polo);


// the new bind override the built in bind(..)


// determining this

// Now, we can summarize the rules for determining this from a function call’s
// call-site, in their order of precedence. Ask these questions in this order,
// and stop when the first rule applies.
// 1. Is the function called with new (new binding)? If so, this is the newly
// constructed object.
//         var bar = new foo()
// 2. Is the function called with call or apply (explicit binding), even hidden
// inside a bind hard binding? If so, this is the explicitly specified object.
//         var bar = foo.call( obj2 )
// 3. Is the function called with a context (implicit binding), otherwise known
// as an owning or containing object? If so, this is that con‐ text object.
//         var bar = obj1.foo()
// 4. Otherwise, default the this (default binding). If in strict mode, pick
// undefined, otherwise pick the global object.
// var bar = foo()
// That’s it. That’s all it takes to understand the rules of this binding for
// normal function calls. Well...almost.


// soft bind to check

// lexical this


// arrow function in JS don't use the THIS four rules instead they inherit
// the this from the scope the are declared and can't be override later.
// even with new keyword example:


function arrowthis() {
	return (x) => {
		this.a = x;
		console.log(this.a);
		console.log(this);
	}
}

var arr = {
	a: 2,
	b: 1
};
var arr2 = {
	a: 'zzz',
	b: 'zzzz'
};

var useArrow = arrowthis.call(arr);

useArrow.bind(arr2);

useArrow(4); // 4
