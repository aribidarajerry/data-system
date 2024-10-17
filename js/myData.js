/* the use strict should be used after import else it won't work
	This code has been finished and just need to be linked to my data.html and data.js file*/
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

// Database to host all studrents data
const verified = {};

function Person(firstName, lastName, department, age, gender) {
	firstName = firstName.toLowerCase();
	lastName = lastName.toLowerCase();
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.gender = gender;
	this.department = department;
	// Default subjects for all students
	this.subjects = ["mathematics",
		"english",
		"data processing"];
	this.info = {
		firstname: this.firstName,
		lastname: this.lastName,
		fullname: this.fullName(),
		department: this.department,
		age: this.age,
		gender: this.gender,
		subjects: this.departmentSubjects()
	};
}

// Person methods
Person.prototype.fullName = function() {
	return this.lastName + " " + this.firstName;
}

Person.prototype.departmentSubjects = function() {
	if (this.department.toLowerCase() == "arts") {
		const subjects = ["literature",
			"government",
			"agriculture",
			"crs"];
		return this.subjects.concat(subjects)
	} else if (this.department.toLowerCase() == "science") {
		const subjects = ["biology",
			"chemistry",
			"physics",
			"technical drawing"];
		return this.subjects.concat(subjects)
	} else {
		return "Invalid department!";
	}
}

Person.prototype.addSubject = function(subject) {
	let exist = itemExist(this.info.subjects, subject);
	if (exist == true) {
		return subject + " already exist.";
	} else {
		this.info.subjects.push(subject);
		return subject + " was successfully added!";
	}
}

Person.prototype.removeSubject = function(subject) {
	let exist = itemExist(this.info.subjects, subject);
	if (itemExist(this.subjects, subject) == true) {
		return subject + " is a compulsory subject and cannot be removed!";
	} else if (exist == true) {
		this.info.subjects.splice(this.info.subjects.indexOf(subject), 1);
		return subject + " was successfully removed!";
	} else {
		return subject + " does not exist.";
	}
}

Person.prototype.getData = function(data = false) {
	sortArr(this.info.subjects);
	let student = ""
	if (data) {
		data = data.toLowerCase();
		if (itemExist(this.info, data) == true) {
			if (Array.isArray(this.info[data]) == true) {
				let lst = listArr(this.info[data]);
				return this.firstName + " " +data + ": " + lst;
			} else {
				return this.firstName + " " + data + ": " + this.info[data];
			}
		} else {
			return data.toUpperCase() + " does not exist in user's data!";
		}
	} else {
		for (let i in this.info) {
			if (Array.isArray(this.info[i]) == true) {
				let lst = listArr(this.info[i]);
				student += i + ": " + lst + "<br>";
			} else {
				student += i + ": " + this.info[i] + "<br>";
			}
		}
	}
	return student
}

// End Person Methods







// Try, getting data through a person's firstname ✔️
// Either get the full details or a specific detail about the person e.g subjects ✔️

/*
    First use this function to register new student and link it to the Person object and access all its methods
    If student has the same name, better use another name
*/
// if this line is inside the registerStudent, it will not work because the i++ will not update it inside the loop but start from 0 again
let i = 0;
function registerStudent(firstname, lastname, department, age, gender) {
	const person = {
		firstname: firstname.toLowerCase(),
		lastname: lastname.toLowerCase(),
		department: department.toLowerCase(),
		age: age,
		gender: gender.toLowerCase()
	}
	// Replace the first instance of null value with a new student
	let o = 0;
	for (let x in verified) {
		if (verified[x]["firstname"] == firstname.toLowerCase()) {
			alert(firstname + " is already a student, preferably use other names!");
			o++;
			break;
		} else if (verified[x] == "null") {
			verified[x] = person;
			alert("Successful!")
			o++;
			break;
		}
	}
	if (o == 0) {
		verified[i] = person;
		alert("Successful!")
	}
	const user = new Person(firstname, lastname, department, age, gender);
	i++;
	return user;
}


function updateStudent(firstname, key, value) {
	let length = Object.keys(verified).length;
	let e = false;
	let x = false;
	for (let i = 0; i < length; i++) {
		if (key == "subjects") {
			x = true;
			e = true;
			break;
		} else if (verified[i]["firstname"] == value.toLowerCase()) {
			e = true;
		}
	}
	if (e == false) {
		for (let i = 0; i < length; i++) {
			if (verified[i]["firstname"] == firstname.toLowerCase()) {
				verified[i][key.toLowerCase()] = value;
				return "Successful!"
			}
		}
	} else if (x == true) {
		return "Subjects can only be removed or added to!"
	} else {
		return "Invalid firstname or updated name already exist!";
	}
}


function deleteStudent(firstname) {
	for (let o = 0; o < Object.keys(verified).length; o++) {
		if (verified[o]["firstname"] == firstname.toLowerCase()) {
			verified[o] = "null";
			return firstname + " successfully deleted!";
			break;
		} else {
			if (o == Object.keys(verified).length-1) {
				return firstname + " does not exist!";
				break;
			}
		}
	}
}


function studentData(studentName) {
	for (let o = 0; o < Object.keys(verified).length; o++) {
		/*
        Now lets check since the studentName is verified, we can get the data from the key i.e o, associated with that name
        */
		if (verified[o]["firstname"] == studentName.toLowerCase()) {
			let firstname = verified[o]["firstname"];
			let lastname = verified[o]["lastname"];
			let department = verified[o]["department"];
			let age = verified[o]["age"];
			let gender = verified[o]["gender"];
			const verifiedStudent = new Person(firstname, lastname, department, age, gender);
			return verifiedStudent;
			break;
		} else if (verified[o] == "null") {
			verified[o] == "null";
		} else {
			if (o == Object.keys(verified).length-1) {
				alert(studentName + " does not exist!");
				break;
			}
		}
	}
}


function verifiedStudents() {
	return JSON.stringify(verified);
}


// Caplculate the length of verified students excluding the null values
function studentsPopulation() {
	let length = 0;
	for (let i = 0; i < Object.keys(verified).length; i++) {
		/*
        When a student is deleted, it's position becomes null so we can't count that as a student
        */
		if (verified[i] == "null") {
			length++;
		}
	}
	length = Object.keys(verified).length - length;
	return "The number of verified students is " + length;
}
/*
    This is how to register a student
let student1 = registerStudent("jerry","aribidara",19,"male");

    To get the students data, use the firstname of the student
let student = studentData("jerry");

    The student has been linked to my Person object so you can call any Person method

student.setDepartment("arts");
return student.getData());

*/