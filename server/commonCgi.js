

exports.sendRepToWeb= function(type, data, response){
	console.log('enter sendRepToWeb');
	console.log(response.writeHead);

	var contentType = "text/html";
	switch(type){
		case 'json':
			contentType = "application/json";
			break;
		default:
			break;

	}
	response.writeHead(200, {'Content-Type': contentType});
	response.write(data);
	response.end();

	console.log('exit sendRepToWeb');
	
}