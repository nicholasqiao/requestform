$(document).ready(function() {
	$('.serialnumbers').val('');
	$("#comments").val('');
	$('.ui.form .ui.dropdown').dropdown('restore defaults');
	$('.machinetypes').dropdown('restore defaults');
	$('.keytypes').dropdown('restore defaults');
	
	var table = document.getElementById("entries").children;

	$("#submit").click(function() {
		submit();
	});
	
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			submit();
		}
	});
});


function submit() {
	var machinetypes = $('.machinetypes').dropdown('get values');
	var b = $('.serialnumbers');
	var serialnumbers = [];

	for (var x = 0; x < b.length; x++) {
		var val = b[x].value;
		serialnumbers.push(val);
	}

	var serialLength = serialnumbers.length;
	var keytypes = $('.keytypes').dropdown('get values');
	var comments = $("#comments").val();	
	var emails = $("#emails").val();
	var payload = [machinetypes, serialnumbers, keytypes, emails, comments];
	var machineFlag = true;
	var serialFlag = true;
	var commentFlag = true;
	var emailFlag = true;
	var serials = $('.serialnumbers');
	var serialnumbers = [];

	for (var x = 0; x < serials.length; x++) {
		var val = serials[x].value;
		serialnumbers.push(val);
	}

	if (serialnumbers.includes("")) {
		serialFlag = false;
	}

	if ($("#comments").val() == "") {
		commentFlag = false;
	}

	if ($("#emails").val() == "") {
		emailFlag = false;
	}

	if (serials.length == 1) {
		var machinetypes = $('.machinetypes').dropdown('get values');
		
		if (machinetypes == "") {
			machineFlag = false;
		}
	} else {
		var machinetypes = $('.machinetypes').dropdown('get values');

		if (machinetypes.includes("")) {
			machineFlag = false;
		}
	}
	
	if (machineFlag && serialFlag && commentFlag && emailFlag) {
		sendData(payload, serialLength);
		$('.serialnumbers').val('');
		$("#comments").val('');
		$("#emails").val('');
		$('.ui.form .ui.dropdown').dropdown('restore defaults');
		$('.machinetypes').dropdown('restore defaults');
		$('.keytypes').dropdown('restore defaults');
		alert("Form submitted")
	} else {
		alert("Mistake in form");
	}
}

var sendData = function(payload, length) {
	$.ajax({
		type: "POST", 
		url: "php/writefile.php", 
		data: ({payload: payload, length:length}), 
		success: function (data) {
			console.log("here is data");
			console.log(data);
		},
		error: function(xhr, status) {
			alert("unable to save data");
		}
	});
}
