const TAX = 0.08;

function PriceCounter(amount) {
	function TaxCalculator() {
		console.log(amount + (amount * TAX));
	}
	return TaxCalculator;
}


var price = PriceCounter(200);

price();
