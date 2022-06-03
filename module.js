// example of closure

function User() {
	var username, password;
	function Dologin(usr, pass) {
		username = usr;
		password = pass;
		console.log('welcome : ' + username);
	}
	var publicAPI = {
		login: Dologin
	};
	return publicAPI;
}


var jhon = User();

jhon.login('Jhon', '0001');
