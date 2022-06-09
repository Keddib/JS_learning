// Partterns to use Scopes
// the Principle of Least Exposure

// exposing all variables and functions used on a program has alot of downs
// Naming Collisions, Unexpected Behavior, UnintendedDependency
// POLE, as applied to variable/function scoping, essentially says, default
// to exposing the bare minimum necessary, keep- ing everything else as private
// as possible.

// example one :

function deff( x, y ) {

	if ( x < y ) {

		// tmp can be up the scope .but following the POLE principle
		// tmp sould be hidden in scope as possible .

		let tmp = x;
		x = y;
		y = tmp;
	}
	return ( x - y );
}


// example two :

var cache = {};

function factorialCache(x) {

	if (x < 2)
		return 1;
	if (!(x in cache)) {
		cache[x] = x * factorialCache(x - 1);
	}
	return cache[x];
}

// factorial(6);
// // 720
// cache;
// factorial(7);


// how we can make cache hidden from outer scope ?
// we can't simply declare it inside fact! function
// (it will be initialized each time we call our function)
// we can do this:

function hiddenCacheFactorial() {

	var cache = {};

	return factorial;

	function factorial(x) {

		if (x < 2)
			return 1;
		if (!(x in cache)) {
			cache[x] = x * factorial(x - 1);
		}
		return cache[x];
	}
}


var factorial = hiddenCacheFactorial();

factorial(7);
factorial(8);


// in this example the hiddenCacheFactorial function serves no other perpose
// than to give cache a scope to presist across multiple calls to factorial function
// but factorial to have access to cach we have to define it inside the same scope
// then we return a referece, as a value from hiddenCacheFactorial, and store it
// in an outer scope variable.

// Rather than defining a new and uniquely named function each time one
// of those scope-only-for-the-purpose-of-hiding-a-variable situations occurs,
// a perhaps better solution is to use a function expression:

var factorial = (function hiddenCacheFactorial() {

	var cache = {};

	return factorial;

	function factorial(x) {

		if (x < 2)
		return 1;
		if (!(x in cache)) {
			cache[x] = x * factorial(x - 1);
		}
		return cache[x];
	}

})();

// factorial(2);




function getNextMonthStart(dateStr) {
	var nextMonth, year;
	{
		let curMonth;
		[ , year, curMonth ] = dateStr.match( /(\d{4})-(\d{2})-\d{2}/ ) || [];
		nextMonth = (Number(curMonth) % 12) + 1;
	}
	if (nextMonth == 1) {
		year++;
	}
	return `${ year }-${ String(nextMonth).padStart(2,"0") }-01`;
}

getNextMonthStart("2019-12-25"); // 2020-01-01



function sortNamesByLenght(names) {

	var buckets = [];

	for (let firstName of names) {

		if (buckets[firstName.length] == null) {
			buckets[firstName.length] = [];
		}
		buckets[firstName.length].push(firstName);
	}

		// a block to narrow the scope
	{
		let sortedNames = [];

		for (let bucket of buckets) {
			if (bucket) {
				//sort each bucket alphanumerically
				bucket.sort();
				// append the sorted names to our running list

				// spread / rest operator(...)
				sortedNames = [
					...sortedNames,
					...bucket
				];
			}
		}
		return sortedNames;
	}


}
var names = sortNamesByLenght(['abc', 'abc', 'abcd', 'adfdfdfdf', 'a', '2', '23232323']);

console.log(names);
