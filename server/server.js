
var http = require('http');
var fs = require('fs');
var url = require('url');
 
 
// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   var content = {'Content-Type': 'text/html'};
   var readType = '';
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   if(pathname.match(/.*\.css/)){
   		content = {'Content-Type': 'text/css'};
   }else if(pathname.match(/.*\.jpg/)){
   		content = {'Content-Type': 'image/jpeg'};
   		readType = 'binary'
   }

   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), readType, function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, content);
      }else{             
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, content);    
         
         // 响应文件内容
         response.write(data, readType);        
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8080);
 
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');
