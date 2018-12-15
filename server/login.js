var fs = require("fs");
var util = require("./commonCgi")

exports.login = function(response, loginData){
	if(!loginData) {
		console.log("loginData is " + loginData);
		return;
	}

	var saveData = null;
	fs.readFile('data/login.json', (err, data)=>{
		if(err){
			console.log(err);
		}

		console.log("data:", data.toString());
		var userString = data.toString()

		if(!userString){
			userData = {};
		}else{
			userData = JSON.parse(userString);
		}

        var username = loginData.username;
        var password = loginData.password;

        var loginState = false;
        if(userData[username]){
            if(userData[username] === password){
                console.log("login success");
                loginState = true;
            }
        }

        var rep = {data : 0}
        if(!loginState){
            rep.data = -1;
        }
		util.sendRepToWeb("json", JSON.stringify(rep), response)
	})
}
