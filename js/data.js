$(document).ready(function() {
	//  Still under development
	//  Still under development
	//  Still under development


	let firstname = $("#firstname");
	let lastname = $("#lastname");
	let age = $("#age");
	let gender = null;
	let male = $("#male");
	let female = $("#female")
	male.click(function() {
		gender = "Male";
	})
	female.click(function() {
		gender = "Female";
	})
	
	let submit = $("#form-1");
	submit.submit(function(event) {
		event.preventDefault()
		registerStudent(firstname.val().trim(), lastname.val().trim(), age.val(), gender)
		$("#form-2").show()
		firstname.val("");
		lastname.val("");
		age.val("");
		gender = null;
		male.prop('checked', '')
		female.prop('checked', '')
		alert(verifiedStudents())
	})
	
	let n = $("#student");
	let d = $("#data");
	let view = $("#form-2");
	
	view.submit(function(event) {
		event.preventDefault()
		let first = studentData(n.val().trim())
		let p = first.getData(d.val().trim())
		$("form p").html(p)
		n.val(""); d.val("");
	})
})