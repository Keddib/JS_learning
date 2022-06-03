var foo={ a: 42
};
    // create `bar` and link it to `foo`
var bar = Object.create( foo );


bar.x = "hello world";

bar.x; // "hello world"

bar.a; // 42 <-- delegated to `foo`

console.log(bar.x);
