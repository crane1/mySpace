
var http = require('http');
var fs = require('fs');
var url = require('url');
var talk = require('./talk');


// 创建服务器
http.createServer( function (request, response) {
	

   repWeb(request, response);
   
}).listen(8080);
 
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');


function repWeb(request, response){
	var pathname = url.parse(request.url).pathname;
	var content = {'Content-Type': 'text/html'};
	var readType = '';

	console.log("Request for " + pathname + " received.");

	if(pathname === "/"){
		pathname = "/index.html";
	}else if(pathname.match(/.*\.css/)){
		content = {'Content-Type': 'text/css'};
	}else if(pathname.match(/.*\.jpg/)){
		content = {'Content-Type': 'image/jpeg'};
		readType = 'binary'
	}else if(pathname.match(/cgi/)){
		handleCgiReq(request, response, pathname);
		return;
	}
	getFile(pathname, response, content, readType);
}

function getFile(pathname, response, content, readType){
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

function handleCgiReq(request, response, pathname){

	var  post  =  '';  //定义了一个post变量，用于暂存请求体的信息      
	request.on('data',  function(chunk){//通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中      
 		post  +=  chunk;      
	});      
	//-------注意异步-------------      
	request.on('end',  function(){   //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。      
		post = JSON.parse(post)
		console.log(post.action);
		
		resRouter(response, post)
		
	}); 
}

function resRouter(response, post){
	switch(post.action){
		case "webGetTalkList":
			talk.getTalkList(response);
			break;
		case "webAddTalk":
			talk.saveOneTalk(response, post.data);
			break;
	}

}


