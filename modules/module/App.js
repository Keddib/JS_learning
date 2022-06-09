import * as db from 'db'


function game() {

	let usersIds = [];

	let userId = db.addUser('khalid', '1234');

	var user  = db.getUser(userId);

	console.log(user);

	db.addUser('xatify', '4321');
	db.addUser('abdou', '4321');
	db.addUser('t', '4321');
	db.addUser('ts', '4321');
	db.addUser('tsr', '4321');
	db.addUser('tsrf', '4321');
	db.addUser('tsrfg', '4321');

	console.log( db.getAllUsers() );
}

game();


console.log(YOYO); // global YOYO from db module
