function adder() {
	var value = 200;
	function changeVal(num) {
		console.log(value);
		value = num;
		return value;
	}
	return changeVal;
}


var func = adder();

// console.log(func(20));
// console.log(func(30));


var keeps = [];

for (let i = 0; i < 3; i++)
{
	keeps[i] = function keepI()
	{
        // closure over `i`
		return i;
	};
}

console.log(keeps[0]());
console.log(keeps[1]());
console.log(keeps[2]());
// 3 -- WHY!?
// 3
// 3
