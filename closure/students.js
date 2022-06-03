function manageStudentGrades(studentRecords)
{
	var grades = studentRecords.map(getGrade);

	return addGrade;
		// ************************
	function getGrade(record)
	{
		return record.grade;
	}

	function sortAndTrimGradesList()
	{ // sort by grades, descending
		grades.sort( function desc(g1,g2)
		{
			return g2 - g1;
		});
			// only keep the top 10 grades
		grades = grades.slice(0,10);
	}
	function addGrade(newGrade)
	{
		grades.push(newGrade);
		sortAndTrimGradesList();
		return grades;
	}
}
var addNextGrade = manageStudentGrades([
	{ id: 14, name: "Kyle", grade: 86 },
	{ id: 73, name: "Suzy", grade: 87 },
	{ id: 112, name: "Frank", grade: 75 }, // ..many more records..
	{ id: 6, name: "Sarah", grade: 91 }
]);


addNextGrade(81);
addNextGrade(68);
