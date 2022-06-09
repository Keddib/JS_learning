var Users = [];


function addUser(name, pass) {

	let user = {
		name : name,
		pass : pass,
		email: `name ${name}@1337.ma`
	}
	Users.push( user );

	let index = Users.length - 1;
	Users[index].Id = index;

	console.log(`${name} has been added successfuly`);

	return index;
}

function deleteUser(id) {
	if (Users[id]) {
		var name = Users[id].name;
		Users.slice(id, 1);
	}
	console.log(`${name} has been added successfuly`);
}

function getUser(id) {
	return Users[id];
}

function getAllUsers() {
	return Users;
}


global.YOYO = 20;


// exports.addUser = addUser;
// exports.deleteUser = deleteUser;
// exports.getUser = getUser;
// exports.getAllUsers = getAllUsers;

export { addUser, deleteUser, getUser, getAllUsers }
