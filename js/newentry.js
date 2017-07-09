$(document).ready(function() {
	var template = $('#entries').html();
	$("#newentry").click(function() {

		$("#entries").append(template);		
		
		//To reinitalize dropdowns
		$('.ui.dropdown')
		.dropdown()
		;
	});
});