// prototype mechanism

function User(name) {
    this.name = name;
}

User.prototype.myName = function() {
    return this.name;
};

function Employee(name, position) {
    User.call(this, name);
    this.position = position;
}// Make a new Employee.prototype linked to User.prototype
// Employee.prototype.constructor is gone
Employee.prototype = Object.create(User.prototype);

Employee.prototype.myPosition = function() {
    return this.position;
};

const john= new Employee( "John", "Developer" );

console.log(john.myName()); // "John"
console.log(john.myPosition()); // "Developer"




// ES6 classes

class Person {
	constructor(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}
};

class Student extends Person {
	constructor(name, position) {
		super(name);
		this.position = position;
	}
	getPosition() {
		return this.position;
	}
};


const mike = new Student( "Mike" , "CS student");
console.log(mike.getName()); // "Mike"
console.log(mike.getPosition()); // "Developer"


// Behavior Delegation


const Dev = {

	init(name) {
		this.name = name;
	},
	getName() {
		return this.name;
	}
};

const WebDev = Object.create(Dev);

WebDev.build = function(name, position) {
	this.init(name);
	this.position = position;
};

WebDev.outputDetails = function() {
    console.log(this.getName() + " is a " + this.position);
};

const xatify = Object.create(WebDev);
xatify.build("Xatify", "Back-End Developer");

const wolfey = Object.create(WebDev);
wolfey.build("Wolfey", "Front-End Developer");

xatify.outputDetails(); // John is a BE
wolfey.outputDetails(); // Wolfey is FE
