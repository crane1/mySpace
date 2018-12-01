var fs = require("fs");
var util = require("./commonCgi")

exports.saveOneTalk = function(response, talkData){
	if(!talkData) {
		console.log("talkData is " + talkData);
		return;
	}

	var saveData = null;
	fs.readFile('data/talk.json', (err, data)=>{
		if(err){
			console.log(err);
		}

		console.log("data:", data.toString());
		var saveString = data.toString()

		if(!saveString){
			saveData = {
				talkList:[]
			};
		}else{
			saveData = JSON.parse(saveString);
		}

		saveData.talkList.unshift(talkData);

		
		fs.writeFile('data/talk.json', JSON.stringify(saveData), (err) => {
		  if (err) throw err;
		  console.log('The file has been saved!');
		});

		rep = {data: "succeed"};
		util.sendRepToWeb("json", JSON.stringify(rep), response)
	})
}

exports.getTalkList = function(response){
	var talkList = null
	fs.readFile('data/talk.json', (err, data)=>{
		if(err){
			console.log(err);
		}

		console.log("data:", data.toString());
		var saveString = data.toString()

		if(!saveString){
			saveData = {
				talkList:[]
			};
		}else{
			saveData = JSON.parse(saveString);
		}
		talkList = saveData.talkList

		util.sendRepToWeb("json", JSON.stringify(talkList),response)
	})
}

