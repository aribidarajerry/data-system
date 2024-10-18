$(document).ready(function() {
	//  Still under development
	//  Still under development
	//  Still under development


	let firstname = $("#firstname");
	let lastname = $("#lastname");
	let department = $("#department");
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
	$("input").focus(function() {
		$("form p").fadeOut("slow")
	})
	let form1 = $("#form-1");
	let r;
	form1.submit(function(event) {
		event.preventDefault()
		r = registerStudent(firstname.val().trim(), lastname.val().trim(), department.val().trim(), age.val(), gender)
		$(".form").show()
		firstname.val("");
		lastname.val("");
		department.val("");
		age.val("");
		gender = null;
		male.prop('checked', '')
		female.prop('checked', '')
	})

	let form2 = $("#form-2");
	let form2Name = $("#form-2 #firstname");
	let form2Data = $("#form-2 #data");
	form2.submit(function(event) {
		event.preventDefault()
		let student = studentData(form2Name.val().trim())
		let data = student.getData(form2Data.val().trim())
		$("#form-2 p").show().html(data)
		form2Name.val(""); form2Data.val("");
	})

	let form3 = $("#form-3");
	let form3Name = $("#form-3 #firstname");
	let form3Data = $("#form-3 #data");
	let form3Update = $("#form-3 #update")
	form3.submit(function(event) {
		event.preventDefault()
		let student = studentData(form3Name.val().trim())
		let update = updateStudent(form3Name.val().trim(), form3Data.val().trim(), form3Update.val().trim())
		$("#form-3 p").show().html(update)
		form3Name.val(""); form3Data.val(""); form3Update.val("");
	})

	let form4 = $("#form-4");
	let form4Name = $("#form-4 #firstname")
	form4.submit(function() {
		event.preventDefault()
		let remove = deleteStudent(form4Name.val().trim())
		$("#form-4 p").show().html(remove)
		form4Name.val("")
	})
})
