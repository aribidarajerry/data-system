/* the use strict should be used after import else it won't work */
"use strict";


/*
  Creating a program to store student's data:

  1. Name, age, gender and subjects ✔️
  2. There should be an id used to identify each user ✔️
  3. Update data, add/remove subjects some should be not be able to be corrected ✔️
  4. Display each users data together ✔️
  5. Get data separately e.g only name...✔️
  6. Delete student. ✔️
  7. Get the date each student was enrolled
*/

/*
let date = new Date();
let y, m, d, t;
y = date.getFullYear();
m = date.getMonth();
d = date.getDay();
t = date.getTime();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
*/

/*
  Create an object that collects students info, ✔️
  Update students info ✔️
  groups them into various subject from department, ✔️
  calculates how long they were in school
*/

// Class for each student
class Student {
	constructor(firstname, lastname, age, department, gender) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.age = age;
		this.department = department;
		this.gender = gender;
		// Default subjects for all students
		this.subjects = ["mathematics",
			"english",
			"data processing",
			"economics"];
	}

	fullname() {
		return this.lastname + " " + this.firstname;
	}

	setDepartment() {
		if (this.department.toLowerCase() == "arts") {
			const subjects = ["literature",
				"government",
				"agriculture",
				"crs"];
			this.subjects = subjects.concat(this.subjects);
			sortArr(this.subjects);
		} else if (this.department.toLowerCase() == "science") {
			const subjects = ["biology",
				"chemistry",
				"physics",
				"technical drawing"];
			this.subjects = subjects.concat(this.subjects);
			sortArr(this.subjects);
		} else if (this.department.toLowerCase() == "commercial") {
			const subjects = ["commerce",
				"accounting",
				"government"];
			this.subjects = subjects.concat(this.subjects);
			sortArr(this.subjects);
		} else {
			return "Invalid department!";
		}
	}

	addSubject(subject) {
		let exist = itemExist(this.subjects, subject);
		if (exist == true) {
			return subject + " already exist.";
		} else {
			this.subjects.push(subject);
			return subject + " was successfully added!";
		}
	}

	removeSubject(subject) {
		let exist = itemExist(this.subjects, subject);
		if (exist == true && this.subjects.length == 7) {
			return `Minimum no. of courses reached!`
		} else if (exist == true && this.subjects.length > 7) {
			this.subjects.splice(this.subjects.indexOf(subject), 1);
			return subject + " was successfully removed!";
		} else {
			return subject + " does not exist.";
		}
	}

	updateStudent(data, value) {
		let update = this[data] ? this[data] = value: `${data} does not exist!`;
		return update = update == value ? `${this.firstname} ${data} now updated to ${value}`: `${data} does not exist!`;
	}

	listData(data = null) {
		let lst = this[data] ? `${this.firstname} ${data}: ${this[data]}`: `Fullname: ${this.fullname()}<br>Age: ${this.age}<br>Department: ${this.department}<br>Gender: ${this.gender}`
		return lst
	}
}
// End Student Methods



class Students {
	constructor () {
		this.students = []
	}

	registerStudent(firstname, lastname, age, department, gender) {
		let verify = this.students.find(student => student.firstname == firstname)
		if (!verify) {
			const student = new Student(firstname, lastname, age, department, gender)
			student.setDepartment()
			this.students.push(student)
			return "Done"
		} else {
			return `${firstname} already exist!`
		}
	}

	studentData(firstname) {
		let student = this.students.find(student => student.firstname == firstname)
		let info = student ? student: `${firstname} does not exist!`
		return info
	}

	update(firstname, data, value) {
		let student = this.students.find(student => student.firstname == firstname)
		student = student ? student.updateStudent(data, value): `${firstname} does not exist!`
		return student
	}

	displayStudents() {
		this.students.sort(function(a, b) {
			let x = a.firstname.toLowerCase();
			let y = b.firstname.toLowerCase();
			if (x < y) {
				return -1;
			}
			if (x > y) {
				return 1;
			}
			return 0;
		})
		const student = this.students.map(myFunc)
		function myFunc(student) {
			return student.listData()
		}
		return student
	}

	deleteStudent(firstname) {
		let del = this.students.find(student => student.firstname == firstname)
		if (del) {
			this.students.splice(this.students.indexOf(del), 1)
			return `${firstname} deleted successfully!`
		} else {
			return `${firstname} does not exist!`;
		}
	}

	population() {
		return `Students population: ${this.students.length}`
	}
}