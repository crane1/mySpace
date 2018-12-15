var fs = require("fs")

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

//获取并发送文件
exports.getFile = function(pathname, response, content, readType){
	console.log("getFile for " + pathname + " received.");
	// 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), readType, function (err, data) {
      if (err) {
         console.log(err);
         response.writeHead(404, content);
      }else{    
         response.writeHead(200, content);    
         
         // 响应文件内容
         response.write(data, readType);
      }
      //  发送响应数据
      response.end();
   });   
}

