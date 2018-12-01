function getCurTime(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function sendCmdStr(action, jsonData, callBack){
	var sendData = {}
	sendData.action = action;
	sendData.data = jsonData;

	$.ajax({
		type: "POST",
		url: "/cgi",
		data: JSON.stringify(sendData),
		processData: false,
		dataType: "json",
		contentType: "application/json",
		success: function(data){
			console.log("response success")
			if(callBack){
				callBack(data);
			}
		}
	});
}