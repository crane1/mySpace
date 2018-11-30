var fs = require("fs");
exports.saveOneTalk = function(talkData){
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

		saveData.talkList.push(talkData);

		
		fs.writeFile('data/talk.json', JSON.stringify(saveData), (err) => {
		  if (err) throw err;
		  console.log('The file has been saved!');
		});
	})

	

}
