(function wrappingOuterScope(){
	var moduleOne = (function one(){
		// ..
		return 'hello';
	})();

	var moduleTwo = (function two(){
		// ..
		function callModuleOne() {
			return moduleOne;
		}
		return callModuleOne();
		// ..
	})();

	console.log(moduleTwo);

})();
