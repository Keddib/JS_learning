/*
With awareness of the two-phase processing of a JS program (compile, then execute),
let’s turn our attention to how the JS engine identifies variables and determines
the scopes of a program as it is compiled.
First, let’s examine a simple JS program to use for analysis over the next
several chapters: */

var students = [
	{ id: 14, name: "Kyle" },
	{ id: 73, name: "Suzy" },
	{ id: 112, name: "Frank" },
	{ id: 6, name: "Sarah" }
];

function getStudentName(studentID) {

	for (let student of students) {
		if (student.id == studentID) {
			return student.name;
		}
	}
}


var nextStudent = getStudentName(73);

console.log(nextStudent); // Suzy
