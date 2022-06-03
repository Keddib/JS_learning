const TAX = 0.08;
var lol = 200;

function tester(tmp = 0) {
	console.log(tmp);
}

tester(1000);

var sum = (function TaxCalculator(tmp = lol){
	return tmp + (tmp * TAX);
})();


console.log(sum);
