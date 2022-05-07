/* As of ES2020, JS has finally defined a standardized reference to the global
scope object, called globalThis. So, subject to the recency of the JS engines
your code runs in, you can use globalThis in place of any of those other approaches.
We could even attempt to define a cross-environment polyfill that’s safer across
pre-globalThis JS environments, such as: */


const theGlobalScopeObject =
	( typeof globalThis != "undefined" ) ? globalThis
	: ( typeof global != "undefined" ) ? global
	: ( typeof window != "undefined" ) ? window
	: ( typeof self != "undefined" ) ? self
	: ( new Function("return this" )

)();
