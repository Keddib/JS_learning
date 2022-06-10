// callbacks are by far the most common way that asynchrony in JS programs
// is expressed and managed. Indeed,  the  callback  is  the  most  fundamental
// async  pattern  in  the language.

// A
var a = 40;
console.log( a, '1half' );

// C
setTimeout( function() {
	a += 1;
	console.log(a, '2half');
}, 10);

// B
a += 1;
console.log(a, '1half');


// A and // B represent the first half of the program
// (aka fist task on the event loop),
// C marks the second half of the program (aka 2 task passed to the EL).
// The first half get passt fist to the event loop, and then there’s a pause
// of indeterminate length. At some future moment, if the STO call completes,
// then 2 task will push to the event loop



// Callbacks are the fundamental unit of asynchrony in JS. But they’re
// not  enough  for  the  evolving  landscape  of  async  programming  as  JS
// matures.

// First,  our  brains  plan  things  out  in  sequential,  blocking,  single-
// threaded semantic ways, but callbacks express asynchronous flow in
// a rather nonlinear, nonsequential way, which makes reasoning
// properly about such code much harder. Hard-to-reason-about code
// is bad code that leads to bad bugs.

// We  need  a  way  to  express  asynchrony  in  a  more  synchronous,
// sequential, blocking manner, just like our brains do.

// Second,  and  more  importantly,  callbacks  suffer  from  inversion  of
// control  in  that  they  implicitly  give  control  over  to  another  party
// (often  a  third-party  utility  not  in  your  control!)  to  invoke  the  con‐
// tinuation of your program. This control transfer leads us to a trou‐
// bling list of trust issues, such as whether the callback is called more
// times than we expect.

// Inventing ad hoc logic to solve these trust issues is possible, but it’s
// more difficult than it should be, and it produces code that is clunk‐
// ier,  harder  to  maintain,  and  likely  insufficiently  protected  from
// these hazards until you get visibly bitten by the bugs.

// We need a generalized solution to all of the trust issues, one that can
// be  reused  for  as  many  callbacks  as  we  create  without  all  the  extra
// boilerplate overhead.



function asyncify(fn) {
    var orig_fn = fn,
        intv = setTimeout( function(){
            intv = null;
            if (fn) fn();
        }, 0 )
    ;
    fn = null;
    return function() {
        // firing too quickly, before `intv` timer has fired to
        // indicate async turn has passed?
        if (intv) {
            fn = orig_fn.bind.apply(
                orig_fn,
                // add the wrapper's `this` to the `bind(..)`
                // call parameters, as well as currying any
                // passed in parameters
                [this].concat( [].slice.call( arguments ) )
            );
        }
        // already async
        else {
            // invoke original function
            orig_fn.apply( this, arguments );
        }
    };
}

function fakeSetTimeOut(fn, delay) {
	fn();
}

function result(data) {
    console.log( a );
}
var a = 0;

fakeSetTimeOut(asyncify(result), 20);

a++;
